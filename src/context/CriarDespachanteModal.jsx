import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Alert,
  Snackbar,
  Divider,
  FormHelperText,
  InputAdornment,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  ContactMail,
  LocationOn,
  School,
  Work,
  Security,
  Description,
  AttachMoney,
  Add,
  Delete,
  Save,
  ArrowBack,
  ArrowForward,
  Close,
  Upload,
  CalendarToday,
  Phone,
  Email,
  Business,
  PersonAdd,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pt } from "date-fns/locale";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

function CriarDespachanteModal({ open, onClose, onSuccess }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Identificação Básica",
    "Dados Pessoais",
    "Contatos e Endereços",
    "Qualificação",
    "Carreira",
    "Permissões",
    "Documentação",
    "Remuneração",
    "Revisão",
  ];

  const [formData, setFormData] = useState({
    empresaId: 1,
    empresaCodigo: "MCL001",
    nomeEmpresa: "Mega Centro e Logistica",
    codigoDespachante: "",
    matriculaAlfandega: "",
    tipoUsuario: "despachante",

    dadosPessoais: {
      nomeCompleto: "",
      nomeApresentacao: "",
      genero: "",
      dataNascimento: null,
      estadoCivil: "",
      numeroIdentificacao: "",
      tipoIdentificacao: "bilhete_identidade",
      nacionalidade: "Moçambicana",
      naturalidade: {
        cidade: "",
        provincia: "",
      },
    },

    contatos: {
      emailPrincipal: "",
      emailAlternativo: "",
      telefonePrincipal: "",
      telefoneAlternativo: "",
      whatsapp: {
        numero: "",
        disponivel: false,
      },
      emergencia: {
        nome: "",
        parentesco: "",
        telefone: "",
      },
    },

    enderecos: {
      residencial: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        provincia: "",
        codigoPostal: "",
        pais: "Moçambique",
      },
      comercial: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        provincia: "",
        codigoPostal: "",
        pais: "Moçambique",
      },
    },

    qualificacao: {
      nivelAcademico: "",
      cursoFormacao: "",
      instituicaoFormacao: "",
      anoConclusao: "",
      certificacoes: [],
      especializacoes: [],
      idiomas: [],
    },

    carreira: {
      dataAdmissao: new Date(),
      dataDesligamento: null,
      cargoAtual: "",
      departamento: "",
      supervisor: {
        nome: "",
        codigo: "",
        email: "",
      },
      historicoCargos: [],
      anosExperiencia: 0,
      tipoContrato: "efetivo",
      regimeTrabalho: "presencial",
      horarioTrabalho: {
        entrada: "08:00",
        saida: "17:00",
        intervalo: "12:00-13:00",
      },
    },

    credenciais: {
      username: "",
      password: "",
      senhaTemporaria: true,
    },

    permissoes: {
      modulos: [
        {
          nome: "processos",
          acesso: true,
          leitura: true,
          escrita: false,
          exclusao: false,
          aprovacao: false,
        },
        {
          nome: "clientes",
          acesso: true,
          leitura: true,
          escrita: false,
          exclusao: false,
        },
        { nome: "relatorios", acesso: false, leitura: false, escrita: false },
        {
          nome: "configuracoes",
          acesso: false,
          leitura: false,
          escrita: false,
        },
      ],
      processos: {
        criar: false,
        editar: false,
        excluir: false,
        visualizarTodos: true,
        aprovar: false,
        rejeitar: false,
      },
      clientes: {
        criar: false,
        editar: false,
        excluir: false,
        visualizarTodos: true,
      },
      relatorios: {
        acessar: false,
        exportar: false,
      },
      configuracoes: {
        acessar: false,
        modificar: false,
      },
      nivelAcesso: 1,
    },

    documentacao: {
      registroProfissional: {
        numero: "",
        orgaoEmissor: "",
        dataEmissao: null,
        dataValidade: null,
        arquivoUrl: "",
      },
      autorizacaoAlfandega: {
        numero: "",
        dataEmissao: null,
        dataValidade: null,
        arquivoUrl: "",
      },
      outrosDocumentos: [],
    },

    remuneracao: {
      salarioBase: 0,
      moedaSalario: "MZN",
      tipoRemuneracao: "fixa",
      comissaoPercentual: 0,
      beneficios: [],
      contaBancaria: {
        banco: "",
        nib: "",
        iban: "",
        conta: "",
      },
    },

    observacoes: "",
    observacoesInternas: "",
    tags: [],
  });

  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (!formData.codigoDespachante && open) {
      const prefixo = "DA";
      const random = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
      setFormData((prev) => ({
        ...prev,
        codigoDespachante: `${prefixo}-${random}`,
      }));
    }
  }, [formData.codigoDespachante, open]);

  const handleChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });

    if (erros[path]) {
      setErros((prev) => {
        const newErros = { ...prev };
        delete newErros[path];
        return newErros;
      });
    }
  };

  const handleArrayChange = (path, index, field, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }

      const newArray = [...current];
      newArray[index] = { ...newArray[index], [field]: value };

      current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = newArray;

      return newData;
    });
  };

  const handleAddArrayItem = (path, item) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length; i++) {
        if (!current[keys[i]]) current[keys[i]] = [];
        current = current[keys[i]];
      }

      current.push(item);
      return newData;
    });
  };

  const handleRemoveArrayItem = (path, index) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }

      current.splice(index, 1);
      return newData;
    });
  };

  const validarPasso = (passo) => {
    const novosErros = {};

    switch (passo) {
      case 0:
        if (!formData.matriculaAlfandega.trim()) {
          novosErros.matriculaAlfandega =
            "Matrícula da Alfândega é obrigatória";
        }
        break;

      case 1:
        if (!formData.dadosPessoais.nomeCompleto.trim()) {
          novosErros["dadosPessoais.nomeCompleto"] =
            "Nome completo é obrigatório";
        }
        if (!formData.dadosPessoais.numeroIdentificacao.trim()) {
          novosErros["dadosPessoais.numeroIdentificacao"] =
            "Número de identificação é obrigatório";
        }
        break;

      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.contatos.emailPrincipal.trim()) {
          novosErros["contatos.emailPrincipal"] =
            "Email principal é obrigatório";
        } else if (!emailRegex.test(formData.contatos.emailPrincipal)) {
          novosErros["contatos.emailPrincipal"] = "Email inválido";
        }
        if (!formData.contatos.telefonePrincipal.trim()) {
          novosErros["contatos.telefonePrincipal"] =
            "Telefone principal é obrigatório";
        }
        break;

      case 4:
        if (!formData.carreira.cargoAtual.trim()) {
          novosErros["carreira.cargoAtual"] = "Cargo atual é obrigatório";
        }
        break;

      case 5:
        if (!formData.credenciais.username.trim()) {
          novosErros["credenciais.username"] = "Username é obrigatório";
        }
        if (!formData.credenciais.password.trim()) {
          novosErros["credenciais.password"] = "Senha é obrigatória";
        } else if (formData.credenciais.password.length < 6) {
          novosErros["credenciais.password"] =
            "Senha deve ter pelo menos 6 caracteres";
        }
        break;

      case 6:
        if (!formData.documentacao.registroProfissional.numero.trim()) {
          novosErros["documentacao.registroProfissional.numero"] =
            "Número do registro profissional é obrigatório";
        }
        if (!formData.documentacao.registroProfissional.dataValidade) {
          novosErros["documentacao.registroProfissional.dataValidade"] =
            "Data de validade do registro é obrigatória";
        }
        if (!formData.documentacao.autorizacaoAlfandega.numero.trim()) {
          novosErros["documentacao.autorizacaoAlfandega.numero"] =
            "Número da autorização da alfândega é obrigatório";
        }
        if (!formData.documentacao.autorizacaoAlfandega.dataValidade) {
          novosErros["documentacao.autorizacaoAlfandega.dataValidade"] =
            "Data de validade da autorização é obrigatória";
        }
        break;
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleNext = () => {
    if (validarPasso(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (!validarPasso(activeStep)) {
      showSnackbar("Por favor, corrija os erros no formulário", "error");
      return;
    }

    setLoading(true);
    try {
      // Verificar se a documentação está completa
      const hoje = new Date();
      const registroValido =
        formData.documentacao.registroProfissional.numero &&
        formData.documentacao.registroProfissional.dataValidade &&
        new Date(formData.documentacao.registroProfissional.dataValidade) >
          hoje;

      const autorizacaoValida =
        formData.documentacao.autorizacaoAlfandega.numero &&
        formData.documentacao.autorizacaoAlfandega.dataValidade &&
        new Date(formData.documentacao.autorizacaoAlfandega.dataValidade) >
          hoje;

      const documentacaoCompleta = registroValido && autorizacaoValida;

      // Preparar dados para envio
      const dadosParaEnvio = {
        ...formData,
        // Garantir que documentacaoCompleta está corretamente definida
        documentacao: {
          ...formData.documentacao,
          documentacaoCompleta: documentacaoCompleta,
        },
        // Status baseado na documentação
        status: {
          statusAtual: documentacaoCompleta ? "ativo" : "inativo",
          disponivel: documentacaoCompleta,
          online: false,
          ultimoCheckin: null,
        },
        metadata: {
          dataCriacao: new Date(),
          dataAtualizacao: new Date(),
          criadoPor: "admin",
          atualizadoPor: "admin",
          origemDados: "manual",
        },
        desempenho: {
          processosAtribuidos: {
            total: 0,
            ativos: 0,
            concluidos: 0,
            pendentes: 0,
          },
          tempoMedioProcesso: 0,
          taxaSucesso: 0,
          avaliacaoMedia: 0,
          pontualidade: 0,
        },
      };

      console.log("Enviando dados:", dadosParaEnvio);

      const response = await fetch(`${API_BASE_URL}/createDespachante`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      const data = await response.json();

      if (data.returnCode === 201 || data.returnCode === 200) {
        const mensagem = documentacaoCompleta
          ? "Despachante criado com sucesso! Status: ATIVO"
          : "Despachante criado com status INATIVO. Ative após completar a documentação.";

        showSnackbar(mensagem, documentacaoCompleta ? "success" : "warning");
        if (onSuccess) onSuccess();
        handleClose();
      } else {
        throw new Error(data.returnMsg || "Erro ao criar despachante");
      }
    } catch (error) {
      console.error("Erro ao criar despachante:", error);

      if (error.message.includes("Documentação profissional incompleta")) {
        showSnackbar(
          "Erro: Para status ATIVO, complete todos os campos de documentação com datas futuras.",
          "error"
        );
      } else {
        showSnackbar(`Erro: ${error.message}`, "error");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setActiveStep(0);
    setFormData({
      empresaId: 1,
      empresaCodigo: "MCL001",
      nomeEmpresa: "Mega Centro e Logistica",
      codigoDespachante: "",
      matriculaAlfandega: "",
      tipoUsuario: "despachante",
      dadosPessoais: {
        nomeCompleto: "",
        nomeApresentacao: "",
        genero: "",
        dataNascimento: null,
        estadoCivil: "",
        numeroIdentificacao: "",
        tipoIdentificacao: "bilhete_identidade",
        nacionalidade: "Moçambicana",
        naturalidade: { cidade: "", provincia: "" },
      },
      contatos: {
        emailPrincipal: "",
        emailAlternativo: "",
        telefonePrincipal: "",
        telefoneAlternativo: "",
        whatsapp: { numero: "", disponivel: false },
        emergencia: { nome: "", parentesco: "", telefone: "" },
      },
    });
    setErros({});
    onClose();
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Código do Despachante"
                value={formData.codigoDespachante}
                InputProps={{ readOnly: true }}
                helperText="Gerado automaticamente"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Matrícula da Alfândega"
                value={formData.matriculaAlfandega}
                onChange={(e) =>
                  handleChange(
                    "matriculaAlfandega",
                    e.target.value.toUpperCase()
                  )
                }
                error={!!erros.matriculaAlfandega}
                helperText={erros.matriculaAlfandega}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Usuário</InputLabel>
                <Select
                  value={formData.tipoUsuario}
                  label="Tipo de Usuário"
                  onChange={(e) => handleChange("tipoUsuario", e.target.value)}
                >
                  <MenuItem value="despachante">Despachante</MenuItem>
                  <MenuItem value="analista">Analista</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                  <MenuItem value="gerente">Gerente</MenuItem>
                  <MenuItem value="admin">Administrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                required
                label="Nome Completo"
                value={formData.dadosPessoais.nomeCompleto}
                onChange={(e) =>
                  handleChange("dadosPessoais.nomeCompleto", e.target.value)
                }
                error={!!erros["dadosPessoais.nomeCompleto"]}
                helperText={erros["dadosPessoais.nomeCompleto"]}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nome de Apresentação"
                value={formData.dadosPessoais.nomeApresentacao}
                onChange={(e) =>
                  handleChange("dadosPessoais.nomeApresentacao", e.target.value)
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={pt}
              >
                <DatePicker
                  label="Data de Nascimento"
                  value={formData.dadosPessoais.dataNascimento}
                  onChange={(date) =>
                    handleChange("dadosPessoais.dataNascimento", date)
                  }
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Gênero</InputLabel>
                <Select
                  value={formData.dadosPessoais.genero}
                  label="Gênero"
                  onChange={(e) =>
                    handleChange("dadosPessoais.genero", e.target.value)
                  }
                >
                  <MenuItem value="masculino">Masculino</MenuItem>
                  <MenuItem value="feminino">Feminino</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Estado Civil</InputLabel>
                <Select
                  value={formData.dadosPessoais.estadoCivil}
                  label="Estado Civil"
                  onChange={(e) =>
                    handleChange("dadosPessoais.estadoCivil", e.target.value)
                  }
                >
                  <MenuItem value="solteiro">Solteiro(a)</MenuItem>
                  <MenuItem value="casado">Casado(a)</MenuItem>
                  <MenuItem value="divorciado">Divorciado(a)</MenuItem>
                  <MenuItem value="viuvo">Viúvo(a)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Tipo de Identificação</InputLabel>
                <Select
                  value={formData.dadosPessoais.tipoIdentificacao}
                  label="Tipo de Identificação"
                  onChange={(e) =>
                    handleChange(
                      "dadosPessoais.tipoIdentificacao",
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="bilhete_identidade">
                    Bilhete de Identidade
                  </MenuItem>
                  <MenuItem value="passaporte">Passaporte</MenuItem>
                  <MenuItem value="carta_conducao">Carta de Condução</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Número de Identificação"
                value={formData.dadosPessoais.numeroIdentificacao}
                onChange={(e) =>
                  handleChange(
                    "dadosPessoais.numeroIdentificacao",
                    e.target.value
                  )
                }
                error={!!erros["dadosPessoais.numeroIdentificacao"]}
                helperText={erros["dadosPessoais.numeroIdentificacao"]}
                size="small"
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Email Principal"
                type="email"
                value={formData.contatos.emailPrincipal}
                onChange={(e) =>
                  handleChange(
                    "contatos.emailPrincipal",
                    e.target.value.toLowerCase()
                  )
                }
                error={!!erros["contatos.emailPrincipal"]}
                helperText={erros["contatos.emailPrincipal"]}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Alternativo"
                type="email"
                value={formData.contatos.emailAlternativo}
                onChange={(e) =>
                  handleChange(
                    "contatos.emailAlternativo",
                    e.target.value.toLowerCase()
                  )
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Telefone Principal"
                value={formData.contatos.telefonePrincipal}
                onChange={(e) =>
                  handleChange("contatos.telefonePrincipal", e.target.value)
                }
                error={!!erros["contatos.telefonePrincipal"]}
                helperText={erros["contatos.telefonePrincipal"]}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone Alternativo"
                value={formData.contatos.telefoneAlternativo}
                onChange={(e) =>
                  handleChange("contatos.telefoneAlternativo", e.target.value)
                }
                size="small"
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Nível Acadêmico</InputLabel>
                <Select
                  value={formData.qualificacao.nivelAcademico}
                  label="Nível Acadêmico"
                  onChange={(e) =>
                    handleChange("qualificacao.nivelAcademico", e.target.value)
                  }
                >
                  <MenuItem value="medio">Médio</MenuItem>
                  <MenuItem value="tecnico">Técnico</MenuItem>
                  <MenuItem value="superior">Superior</MenuItem>
                  <MenuItem value="pos_graduacao">Pós-Graduação</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Curso/Formação"
                value={formData.qualificacao.cursoFormacao}
                onChange={(e) =>
                  handleChange("qualificacao.cursoFormacao", e.target.value)
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Especializações"
                value={formData.qualificacao.especializacoes.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "qualificacao.especializacoes",
                    e.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter((item) => item)
                  )
                }
                size="small"
                helperText="Separe por vírgulas"
              />
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={pt}
              >
                <DatePicker
                  label="Data de Admissão"
                  value={formData.carreira.dataAdmissao}
                  onChange={(date) =>
                    handleChange("carreira.dataAdmissao", date)
                  }
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Cargo Atual"
                value={formData.carreira.cargoAtual}
                onChange={(e) =>
                  handleChange("carreira.cargoAtual", e.target.value)
                }
                error={!!erros["carreira.cargoAtual"]}
                helperText={erros["carreira.cargoAtual"]}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Departamento"
                value={formData.carreira.departamento}
                onChange={(e) =>
                  handleChange("carreira.departamento", e.target.value)
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Contrato</InputLabel>
                <Select
                  value={formData.carreira.tipoContrato}
                  label="Tipo de Contrato"
                  onChange={(e) =>
                    handleChange("carreira.tipoContrato", e.target.value)
                  }
                >
                  <MenuItem value="efetivo">Efetivo</MenuItem>
                  <MenuItem value="temporario">Temporário</MenuItem>
                  <MenuItem value="prestador_servicos">
                    Prestador de Serviços
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 5:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Credenciais de acesso ao sistema
                </Typography>
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Username"
                value={formData.credenciais.username}
                onChange={(e) =>
                  handleChange(
                    "credenciais.username",
                    e.target.value.toLowerCase()
                  )
                }
                error={!!erros["credenciais.username"]}
                helperText={
                  erros["credenciais.username"] || "Nome de usuário para login"
                }
                size="small"
                autoComplete="new-username"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Senha"
                type="password"
                value={formData.credenciais.password}
                onChange={(e) =>
                  handleChange("credenciais.password", e.target.value)
                }
                error={!!erros["credenciais.password"]}
                helperText={
                  erros["credenciais.password"] || "Mínimo 6 caracteres"
                }
                size="small"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.credenciais.senhaTemporaria}
                    onChange={(e) =>
                      handleChange(
                        "credenciais.senhaTemporaria",
                        e.target.checked
                      )
                    }
                    size="small"
                  />
                }
                label="Senha temporária (usuário deve alterar no primeiro login)"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                <Security sx={{ mr: 1, fontSize: 18 }} />
                Nível de Acesso
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Nível de Acesso</InputLabel>
                <Select
                  value={formData.permissoes.nivelAcesso}
                  label="Nível de Acesso"
                  onChange={(e) =>
                    handleChange(
                      "permissoes.nivelAcesso",
                      parseInt(e.target.value)
                    )
                  }
                >
                  <MenuItem value={1}>
                    Nível 1 - Básico (Acesso limitado)
                  </MenuItem>
                  <MenuItem value={2}>Nível 2 - Operacional</MenuItem>
                  <MenuItem value={3}>Nível 3 - Técnico</MenuItem>
                  <MenuItem value={4}>Nível 4 - Especialista</MenuItem>
                  <MenuItem value={5}>Nível 5 - Supervisor</MenuItem>
                  <MenuItem value={6}>Nível 6 - Coordenador</MenuItem>
                  <MenuItem value={7}>Nível 7 - Gerente</MenuItem>
                  <MenuItem value={8}>Nível 8 - Diretor</MenuItem>
                  <MenuItem value={9}>Nível 9 - Administrador</MenuItem>
                  <MenuItem value={10}>Nível 10 - Super Administrador</MenuItem>
                </Select>
                <FormHelperText>
                  Define o nível de acesso do usuário no sistema
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" sx={{ mt: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Permissões de Módulos
                  </Typography>
                  <Grid container spacing={1}>
                    {formData.permissoes.modulos.map((modulo, index) => (
                      <Grid item xs={12} key={modulo.nome}>
                        <Box
                          sx={{
                            p: 1,
                            bgcolor: modulo.acesso
                              ? "action.selected"
                              : "transparent",
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: modulo.acesso
                              ? "primary.light"
                              : "divider",
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={1}
                          >
                            <Typography variant="body2" fontWeight="medium">
                              {modulo.nome === "processos" && "📋 Processos"}
                              {modulo.nome === "clientes" && "👥 Clientes"}
                              {modulo.nome === "relatorios" && "📊 Relatórios"}
                              {modulo.nome === "configuracoes" &&
                                "⚙️ Configurações"}
                            </Typography>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  checked={modulo.acesso}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "permissoes.modulos",
                                      index,
                                      "acesso",
                                      e.target.checked
                                    )
                                  }
                                />
                              }
                              label="Acesso"
                            />
                          </Box>

                          {modulo.acesso && (
                            <Grid container spacing={1}>
                              <Grid item xs={3}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      size="small"
                                      checked={modulo.leitura}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "permissoes.modulos",
                                          index,
                                          "leitura",
                                          e.target.checked
                                        )
                                      }
                                    />
                                  }
                                  label="Leitura"
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      size="small"
                                      checked={modulo.escrita}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "permissoes.modulos",
                                          index,
                                          "escrita",
                                          e.target.checked
                                        )
                                      }
                                    />
                                  }
                                  label="Escrita"
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      size="small"
                                      checked={modulo.exclusao}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "permissoes.modulos",
                                          index,
                                          "exclusao",
                                          e.target.checked
                                        )
                                      }
                                    />
                                  }
                                  label="Exclusão"
                                />
                              </Grid>
                              {modulo.nome === "processos" && (
                                <Grid item xs={3}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        size="small"
                                        checked={modulo.aprovacao}
                                        onChange={(e) =>
                                          handleArrayChange(
                                            "permissoes.modulos",
                                            index,
                                            "aprovacao",
                                            e.target.checked
                                          )
                                        }
                                      />
                                    }
                                    label="Aprovação"
                                  />
                                </Grid>
                              )}
                            </Grid>
                          )}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 6:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert
                severity={
                  formData.documentacao.documentacaoCompleta
                    ? "success"
                    : "warning"
                }
                sx={{ mb: 2 }}
              >
                <Typography variant="body2">
                  {formData.documentacao.documentacaoCompleta
                    ? "✓ Documentação completa - Despachante será ATIVO"
                    : "⚠ Documentação incompleta - Despachante será INATIVO"}
                </Typography>
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Número do Registro Profissional"
                value={formData.documentacao.registroProfissional.numero}
                onChange={(e) =>
                  handleChange(
                    "documentacao.registroProfissional.numero",
                    e.target.value
                  )
                }
                error={!!erros["documentacao.registroProfissional.numero"]}
                helperText={
                  erros["documentacao.registroProfissional.numero"] ||
                  "Obrigatório"
                }
                size="small"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={pt}
              >
                <DatePicker
                  label="Validade do Registro"
                  value={
                    formData.documentacao.registroProfissional.dataValidade
                  }
                  onChange={(date) => {
                    handleChange(
                      "documentacao.registroProfissional.dataValidade",
                      date
                    );
                    // Verificar automaticamente se está completa
                    setTimeout(() => {
                      const registroValido = date && date > new Date();
                      const autorizacaoValida =
                        formData.documentacao.autorizacaoAlfandega
                          .dataValidade &&
                        new Date(
                          formData.documentacao.autorizacaoAlfandega.dataValidade
                        ) > new Date();

                      const docCompleta = registroValido && autorizacaoValida;
                      handleChange(
                        "documentacao.documentacaoCompleta",
                        docCompleta
                      );
                    }, 100);
                  }}
                  minDate={new Date()}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      required: true,
                      error:
                        !!erros[
                          "documentacao.registroProfissional.dataValidade"
                        ],
                      helperText:
                        erros[
                          "documentacao.registroProfissional.dataValidade"
                        ] || "Data futura obrigatória",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Número da Autorização da Alfândega"
                value={formData.documentacao.autorizacaoAlfandega.numero}
                onChange={(e) =>
                  handleChange(
                    "documentacao.autorizacaoAlfandega.numero",
                    e.target.value
                  )
                }
                error={!!erros["documentacao.autorizacaoAlfandega.numero"]}
                helperText={
                  erros["documentacao.autorizacaoAlfandega.numero"] ||
                  "Obrigatório"
                }
                size="small"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={pt}
              >
                <DatePicker
                  label="Validade da Autorização"
                  value={
                    formData.documentacao.autorizacaoAlfandega.dataValidade
                  }
                  onChange={(date) => {
                    handleChange(
                      "documentacao.autorizacaoAlfandega.dataValidade",
                      date
                    );
                    // Verificar automaticamente se está completa
                    setTimeout(() => {
                      const autorizacaoValida = date && date > new Date();
                      const registroValido =
                        formData.documentacao.registroProfissional
                          .dataValidade &&
                        new Date(
                          formData.documentacao.registroProfissional.dataValidade
                        ) > new Date();

                      const docCompleta = registroValido && autorizacaoValida;
                      handleChange(
                        "documentacao.documentacaoCompleta",
                        docCompleta
                      );
                    }, 100);
                  }}
                  minDate={new Date()}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      required: true,
                      error:
                        !!erros[
                          "documentacao.autorizacaoAlfandega.dataValidade"
                        ],
                      helperText:
                        erros[
                          "documentacao.autorizacaoAlfandega.dataValidade"
                        ] || "Data futura obrigatória",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );

      case 7:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salário Base"
                type="number"
                value={formData.remuneracao.salarioBase}
                onChange={(e) =>
                  handleChange(
                    "remuneracao.salarioBase",
                    parseFloat(e.target.value) || 0
                  )
                }
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">MZN</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Remuneração</InputLabel>
                <Select
                  value={formData.remuneracao.tipoRemuneracao}
                  label="Tipo de Remuneração"
                  onChange={(e) =>
                    handleChange("remuneracao.tipoRemuneracao", e.target.value)
                  }
                >
                  <MenuItem value="fixa">Fixa</MenuItem>
                  <MenuItem value="comissao">Comissão</MenuItem>
                  <MenuItem value="mista">Mista</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 8:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Revise todas as informações antes de criar o despachante.
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Código:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formData.codigoDespachante}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Matrícula:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formData.matriculaAlfandega}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Nome:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formData.dadosPessoais.nomeCompleto}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Email:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formData.contatos.emailPrincipal}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Cargo:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formData.carreira.cargoAtual}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Username:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formData.credenciais.username}
              </Typography>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle
          sx={{ m: 0, p: 2, borderBottom: 1, borderColor: "divider" }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <PersonAdd sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">Novo Despachante Aduaneiro</Typography>
            </Box>
            <IconButton aria-label="close" onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 2 }}>{renderStepContent(activeStep)}</Box>

          {Object.keys(erros).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Corrija os erros antes de continuar.
              </Typography>
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>

          <Box flex={1} />

          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Voltar
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Save />}
            >
              {loading ? "Criando..." : "Criar Despachante"}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
            >
              Próximo
            </Button>
          )}
        </DialogActions>
      </Dialog>

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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}

export default CriarDespachanteModal;
