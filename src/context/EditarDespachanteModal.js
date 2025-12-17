/* eslint-disable @typescript-eslint/no-unused-vars */
// EditarDespachanteModal.js - VERSÃO CORRIGIDA
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Chip,
  Divider,
  Switch,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Person,
  Mail,
  Phone,
  Work,
  Business,
  Description,
  Badge,
  Home,
  Delete,
  Add,
  School,
  Language
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pt } from 'date-fns/locale';

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

function EditarDespachanteModal({ open, onClose, despachanteData, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [newEspecializacao, setNewEspecializacao] = useState('');
  const [newIdioma, setNewIdioma] = useState({ idioma: '', nivel: '' });
  const [newBeneficio, setNewBeneficio] = useState('');
  const [formData, setFormData] = useState({
    // Dados básicos que precisam estar no root
    tipoUsuario: 'despachante',
    
    // Dados Pessoais
    dadosPessoais: {
      nomeCompleto: '',
      nomeApresentacao: '',
      genero: '',
      dataNascimento: null,
      estadoCivil: '',
      numeroIdentificacao: '',
      tipoIdentificacao: 'bilhete_identidade',
      nacionalidade: 'Moçambicana',
      naturalidade: {
        cidade: '',
        provincia: ''
      }
    },
    // Contatos
    contatos: {
      emailPrincipal: '',
      emailAlternativo: '',
      telefonePrincipal: '',
      telefoneAlternativo: '',
      whatsapp: {
        numero: '',
        disponivel: false
      },
      emergencia: {
        nome: '',
        parentesco: '',
        telefone: ''
      }
    },
    // Endereços
    enderecos: {
      residencial: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        provincia: '',
        codigoPostal: '',
        pais: 'Moçambique'
      },
      comercial: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        provincia: '',
        codigoPostal: '',
        pais: 'Moçambique'
      }
    },
    // Carreira
    carreira: {
      dataAdmissao: null,
      dataDesligamento: null,
      cargoAtual: '',
      departamento: '',
      supervisor: {
        nome: '',
        codigo: '',
        email: ''
      },
      tipoContrato: 'efetivo',
      regimeTrabalho: 'presencial',
      horarioTrabalho: {
        entrada: '08:00',
        saida: '17:00',
        intervalo: '12:00-13:00'
      }
    },
    // Status
    status: {
      statusAtual: 'ativo',
      disponivel: true,
      online: false
    },
    // Documentação
    documentacao: {
      registroProfissional: {
        numero: '',
        orgaoEmissor: '',
        dataEmissao: null,
        dataValidade: null,
        arquivoUrl: ''
      },
      autorizacaoAlfandega: {
        numero: '',
        dataEmissao: null,
        dataValidade: null,
        arquivoUrl: ''
      }
    },
    // Qualificação
    qualificacao: {
      nivelAcademico: '',
      cursoFormacao: '',
      instituicaoFormacao: '',
      anoConclusao: '',
      certificacoes: [],
      especializacoes: [],
      idiomas: []
    },
    // Permissões (simplificado para evitar problemas)
    permissoes: {
      nivelAcesso: 1
    },
    // Remuneração
    remuneracao: {
      salarioBase: 0,
      moedaSalario: 'MZN',
      tipoRemuneracao: 'fixa',
      comissaoPercentual: 0,
      beneficios: [],
      contaBancaria: {
        banco: '',
        nib: '',
        iban: '',
        conta: ''
      }
    }
  });

  // Carregar dados do despachante quando o modal abre
  useEffect(() => {
    if (open && despachanteData) {
      fetchDespachanteDetails();
    }
  }, [open, despachanteData]);

  const fetchDespachanteDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/getDespachanteDetail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          codigoDespachante: despachanteData.codigoDespachante 
        })
      });
      
      const data = await response.json();
      
      if (data.returnCode === 200) {
        // Transformar os dados para o formato do formulário
        const transformedData = transformDataForForm(data.data);
        setFormData(transformedData);
      } else {
        throw new Error(data.returnMsg || 'Erro ao carregar detalhes');
      }
    } catch (err) {
      console.error('Erro ao carregar detalhes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const transformDataForForm = (data) => {
    // Garantir que especializacoes seja um array de strings
    let especializacoes = [];
    if (Array.isArray(data.qualificacao?.especializacoes)) {
      especializacoes = data.qualificacao.especializacoes.map(item => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          // Tentar extrair string de objeto
          return item.nome || item.titulo || item.descricao || JSON.stringify(item);
        }
        return String(item);
      }).filter(Boolean);
    }

    // Garantir que idiomas seja um array de objetos no formato correto
    let idiomas = [];
    if (Array.isArray(data.qualificacao?.idiomas)) {
      idiomas = data.qualificacao.idiomas.map(item => {
        if (typeof item === 'object' && item !== null) {
          return {
            idioma: item.idioma || '',
            nivel: item.nivel || ''
          };
        }
        // Se for string, tentar parsear
        if (typeof item === 'string') {
          try {
            const parsed = JSON.parse(item);
            if (parsed && typeof parsed === 'object') {
              return {
                idioma: parsed.idioma || '',
                nivel: parsed.nivel || ''
              };
            }
          } catch {
            return {
              idioma: item,
              nivel: 'basico'
            };
          }
        }
        return { idioma: '', nivel: '' };
      }).filter(item => item.idioma);
    }

    // Garantir que beneficios seja um array de strings
    let beneficios = [];
    if (Array.isArray(data.remuneracao?.beneficios)) {
      beneficios = data.remuneracao.beneficios.map(item => {
        if (typeof item === 'string') return item;
        return String(item);
      }).filter(Boolean);
    }

    return {
      tipoUsuario: data.tipoUsuario || 'despachante',
      dadosPessoais: {
        nomeCompleto: data.dadosPessoais?.nomeCompleto || '',
        nomeApresentacao: data.dadosPessoais?.nomeApresentacao || '',
        genero: data.dadosPessoais?.genero || '',
        dataNascimento: data.dadosPessoais?.dataNascimento ? new Date(data.dadosPessoais.dataNascimento) : null,
        estadoCivil: data.dadosPessoais?.estadoCivil || '',
        numeroIdentificacao: data.dadosPessoais?.numeroIdentificacao || '',
        tipoIdentificacao: data.dadosPessoais?.tipoIdentificacao || 'bilhete_identidade',
        nacionalidade: data.dadosPessoais?.nacionalidade || 'Moçambicana',
        naturalidade: {
          cidade: data.dadosPessoais?.naturalidade?.cidade || '',
          provincia: data.dadosPessoais?.naturalidade?.provincia || ''
        }
      },
      contatos: {
        emailPrincipal: data.contatos?.emailPrincipal || '',
        emailAlternativo: data.contatos?.emailAlternativo || '',
        telefonePrincipal: data.contatos?.telefonePrincipal || '',
        telefoneAlternativo: data.contatos?.telefoneAlternativo || '',
        whatsapp: {
          numero: data.contatos?.whatsapp?.numero || '',
          disponivel: data.contatos?.whatsapp?.disponivel || false
        },
        emergencia: {
          nome: data.contatos?.emergencia?.nome || '',
          parentesco: data.contatos?.emergencia?.parentesco || '',
          telefone: data.contatos?.emergencia?.telefone || ''
        }
      },
      enderecos: {
        residencial: {
          rua: data.enderecos?.residencial?.rua || '',
          numero: data.enderecos?.residencial?.numero || '',
          bairro: data.enderecos?.residencial?.bairro || '',
          cidade: data.enderecos?.residencial?.cidade || '',
          provincia: data.enderecos?.residencial?.provincia || '',
          codigoPostal: data.enderecos?.residencial?.codigoPostal || '',
          pais: data.enderecos?.residencial?.pais || 'Moçambique'
        },
        comercial: {
          rua: data.enderecos?.comercial?.rua || '',
          numero: data.enderecos?.comercial?.numero || '',
          bairro: data.enderecos?.comercial?.bairro || '',
          cidade: data.enderecos?.comercial?.cidade || '',
          provincia: data.enderecos?.comercial?.provincia || '',
          codigoPostal: data.enderecos?.comercial?.codigoPostal || '',
          pais: data.enderecos?.comercial?.pais || 'Moçambique'
        }
      },
      carreira: {
        dataAdmissao: data.carreira?.dataAdmissao ? new Date(data.carreira.dataAdmissao) : null,
        dataDesligamento: data.carreira?.dataDesligamento ? new Date(data.carreira.dataDesligamento) : null,
        cargoAtual: data.carreira?.cargoAtual || '',
        departamento: data.carreira?.departamento || '',
        supervisor: {
          nome: data.carreira?.supervisor?.nome || '',
          codigo: data.carreira?.supervisor?.codigo || '',
          email: data.carreira?.supervisor?.email || ''
        },
        tipoContrato: data.carreira?.tipoContrato || 'efetivo',
        regimeTrabalho: data.carreira?.regimeTrabalho || 'presencial',
        horarioTrabalho: {
          entrada: data.carreira?.horarioTrabalho?.entrada || '08:00',
          saida: data.carreira?.horarioTrabalho?.saida || '17:00',
          intervalo: data.carreira?.horarioTrabalho?.intervalo || '12:00-13:00'
        }
      },
      status: {
        statusAtual: data.status?.statusAtual || 'ativo',
        disponivel: data.status?.disponivel !== undefined ? data.status.disponivel : true,
        online: data.status?.online || false
      },
      documentacao: {
        registroProfissional: {
          numero: data.documentacao?.registroProfissional?.numero || '',
          orgaoEmissor: data.documentacao?.registroProfissional?.orgaoEmissor || '',
          dataEmissao: data.documentacao?.registroProfissional?.dataEmissao ? 
            new Date(data.documentacao.registroProfissional.dataEmissao) : null,
          dataValidade: data.documentacao?.registroProfissional?.dataValidade ? 
            new Date(data.documentacao.registroProfissional.dataValidade) : null,
          arquivoUrl: data.documentacao?.registroProfissional?.arquivoUrl || ''
        },
        autorizacaoAlfandega: {
          numero: data.documentacao?.autorizacaoAlfandega?.numero || '',
          dataEmissao: data.documentacao?.autorizacaoAlfandega?.dataEmissao ? 
            new Date(data.documentacao.autorizacaoAlfandega.dataEmissao) : null,
          dataValidade: data.documentacao?.autorizacaoAlfandega?.dataValidade ? 
            new Date(data.documentacao.autorizacaoAlfandega.dataValidade) : null,
          arquivoUrl: data.documentacao?.autorizacaoAlfandega?.arquivoUrl || ''
        }
      },
      qualificacao: {
        nivelAcademico: data.qualificacao?.nivelAcademico || '',
        cursoFormacao: data.qualificacao?.cursoFormacao || '',
        instituicaoFormacao: data.qualificacao?.instituicaoFormacao || '',
        anoConclusao: data.qualificacao?.anoConclusao || '',
        certificacoes: data.qualificacao?.certificacoes || [],
        especializacoes: especializacoes,
        idiomas: idiomas
      },
      permissoes: {
        nivelAcesso: data.permissoes?.nivelAcesso || 1
      },
      remuneracao: {
        salarioBase: data.remuneracao?.salarioBase || 0,
        moedaSalario: data.remuneracao?.moedaSalario || 'MZN',
        tipoRemuneracao: data.remuneracao?.tipoRemuneracao || 'fixa',
        comissaoPercentual: data.remuneracao?.comissaoPercentual || 0,
        beneficios: beneficios,
        contaBancaria: {
          banco: data.remuneracao?.contaBancaria?.banco || '',
          nib: data.remuneracao?.contaBancaria?.nib || '',
          iban: data.remuneracao?.contaBancaria?.iban || '',
          conta: data.remuneracao?.contaBancaria?.conta || ''
        }
      }
    };
  };

  const handleChange = (field, value, nestedPath = '') => {
    setFormData(prev => {
      if (nestedPath) {
        const path = nestedPath.split('.');
        let updated = { ...prev };
        let current = updated;
        
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]] = { ...current[path[i]] };
        }
        
        current[path[path.length - 1]] = value;
        return updated;
      }
      
      return { ...prev, [field]: value };
    });
  };

  const handleNestedChange = (mainField, subField, value, subSubField = null) => {
    setFormData(prev => {
      const updated = { ...prev };
      
      if (subSubField) {
        if (!updated[mainField][subField]) {
          updated[mainField][subField] = {};
        }
        updated[mainField][subField][subSubField] = value;
      } else {
        updated[mainField][subField] = value;
      }
      
      return updated;
    });
  };

  // Funções para gerenciar arrays - DEFINIDAS ANTES DO USO
  const handleAddEspecializacao = () => {
    if (newEspecializacao.trim()) {
      setFormData(prev => ({
        ...prev,
        qualificacao: {
          ...prev.qualificacao,
          especializacoes: [...prev.qualificacao.especializacoes, newEspecializacao.trim()]
        }
      }));
      setNewEspecializacao('');
    }
  };

  const handleRemoveEspecializacao = (index) => {
    setFormData(prev => ({
      ...prev,
      qualificacao: {
        ...prev.qualificacao,
        especializacoes: prev.qualificacao.especializacoes.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddIdioma = () => {
    if (newIdioma.idioma.trim() && newIdioma.nivel) {
      setFormData(prev => ({
        ...prev,
        qualificacao: {
          ...prev.qualificacao,
          idiomas: [...prev.qualificacao.idiomas, { ...newIdioma }]
        }
      }));
      setNewIdioma({ idioma: '', nivel: '' });
    }
  };

  const handleRemoveIdioma = (index) => {
    setFormData(prev => ({
      ...prev,
      qualificacao: {
        ...prev.qualificacao,
        idiomas: prev.qualificacao.idiomas.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddBeneficio = () => {
    if (newBeneficio.trim()) {
      setFormData(prev => ({
        ...prev,
        remuneracao: {
          ...prev.remuneracao,
          beneficios: [...prev.remuneracao.beneficios, newBeneficio.trim()]
        }
      }));
      setNewBeneficio('');
    }
  };

  const handleRemoveBeneficio = (index) => {
    setFormData(prev => ({
      ...prev,
      remuneracao: {
        ...prev.remuneracao,
        beneficios: prev.remuneracao.beneficios.filter((_, i) => i !== index)
      }
    }));
  };

  const formatDateForApi = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString();
  };

  const prepareDataForApi = () => {
    // Criar uma cópia profunda dos dados
    const dataToSend = JSON.parse(JSON.stringify(formData));
    
    // Formatar datas
    const formatNestedDates = (obj) => {
      if (!obj || typeof obj !== 'object') return obj;
      
      Object.keys(obj).forEach(key => {
        if (obj[key] instanceof Date) {
          obj[key] = formatDateForApi(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          obj[key] = formatNestedDates(obj[key]);
        }
      });
      return obj;
    };

    // Formatar todos os campos de data
    const dataWithFormattedDates = formatNestedDates(dataToSend);

    // Garantir que arrays estejam no formato correto
    // Especializações deve ser array de strings
    if (dataWithFormattedDates.qualificacao?.especializacoes) {
      dataWithFormattedDates.qualificacao.especializacoes = 
        dataWithFormattedDates.qualificacao.especializacoes
          .map(item => typeof item === 'string' ? item : String(item))
          .filter(item => item && item.trim() !== '');
    }

    // Idiomas deve ser array de objetos {idioma: string, nivel: string}
    if (dataWithFormattedDates.qualificacao?.idiomas) {
      dataWithFormattedDates.qualificacao.idiomas = 
        dataWithFormattedDates.qualificacao.idiomas
          .filter(item => item && item.idioma && item.nivel)
          .map(item => ({
            idioma: String(item.idioma).trim(),
            nivel: String(item.nivel)
          }));
    }

    // Benefícios deve ser array de strings
    if (dataWithFormattedDates.remuneracao?.beneficios) {
      dataWithFormattedDates.remuneracao.beneficios = 
        dataWithFormattedDates.remuneracao.beneficios
          .map(item => typeof item === 'string' ? item : String(item))
          .filter(item => item && item.trim() !== '');
    }

    // Remover campos vazios para não sobrecarregar a atualização
    const cleanEmptyFields = (obj) => {
      if (Array.isArray(obj)) {
        return obj.filter(item => item !== null && item !== undefined && item !== '');
      }
      
      if (obj !== null && typeof obj === 'object') {
        const cleaned = {};
        Object.keys(obj).forEach(key => {
          const cleanedValue = cleanEmptyFields(obj[key]);
          if (cleanedValue !== null && cleanedValue !== undefined && cleanedValue !== '') {
            if (Array.isArray(cleanedValue) && cleanedValue.length === 0) {
              // Não incluir arrays vazios
            } else if (typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0) {
              // Não incluir objetos vazios
            } else {
              cleaned[key] = cleanedValue;
            }
          }
        });
        return Object.keys(cleaned).length > 0 ? cleaned : undefined;
      }
      
      return obj;
    };

    // Limpar dados antes de enviar
    const cleanedData = cleanEmptyFields(dataWithFormattedDates);

    // Adicionar código do despachante
    cleanedData.codigoDespachante = despachanteData.codigoDespachante;

    return cleanedData;
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    
    try {
      // Preparar dados para envio
      const dataToSend = prepareDataForApi();
      
      console.log('Enviando dados para atualização:', JSON.stringify(dataToSend, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/updateDespachante`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      const data = await response.json();
      
      if (data.returnCode === 200) {
        setSuccess(true);
        if (onSuccess) {
          onSuccess();
        }
        // Fechar modal após 2 segundos
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(data.returnMsg || 'Erro ao atualizar despachante');
      }
    } catch (err) {
      console.error('Erro ao atualizar despachante:', err);
      setError(err.message || 'Erro ao atualizar despachante. Verifique a conexão.');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setFormData({
      tipoUsuario: 'despachante',
      dadosPessoais: {
        nomeCompleto: '',
        nomeApresentacao: '',
        genero: '',
        dataNascimento: null,
        estadoCivil: '',
        numeroIdentificacao: '',
        tipoIdentificacao: 'bilhete_identidade',
        nacionalidade: 'Moçambicana',
        naturalidade: {
          cidade: '',
          provincia: ''
        }
      },
      contatos: {
        emailPrincipal: '',
        emailAlternativo: '',
        telefonePrincipal: '',
        telefoneAlternativo: '',
        whatsapp: {
          numero: '',
          disponivel: false
        },
        emergencia: {
          nome: '',
          parentesco: '',
          telefone: ''
        }
      },
      enderecos: {
        residencial: {
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          provincia: '',
          codigoPostal: '',
          pais: 'Moçambique'
        },
        comercial: {
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          provincia: '',
          codigoPostal: '',
          pais: 'Moçambique'
        }
      },
      carreira: {
        dataAdmissao: null,
        dataDesligamento: null,
        cargoAtual: '',
        departamento: '',
        supervisor: {
          nome: '',
          codigo: '',
          email: ''
        },
        tipoContrato: 'efetivo',
        regimeTrabalho: 'presencial',
        horarioTrabalho: {
          entrada: '08:00',
          saida: '17:00',
          intervalo: '12:00-13:00'
        }
      },
      status: {
        statusAtual: 'ativo',
        disponivel: true,
        online: false
      },
      documentacao: {
        registroProfissional: {
          numero: '',
          orgaoEmissor: '',
          dataEmissao: null,
          dataValidade: null,
          arquivoUrl: ''
        },
        autorizacaoAlfandega: {
          numero: '',
          dataEmissao: null,
          dataValidade: null,
          arquivoUrl: ''
        }
      },
      qualificacao: {
        nivelAcademico: '',
        cursoFormacao: '',
        instituicaoFormacao: '',
        anoConclusao: '',
        certificacoes: [],
        especializacoes: [],
        idiomas: []
      },
      permissoes: {
        nivelAcesso: 1
      },
      remuneracao: {
        salarioBase: 0,
        moedaSalario: 'MZN',
        tipoRemuneracao: 'fixa',
        comissaoPercentual: 0,
        beneficios: [],
        contaBancaria: {
          banco: '',
          nib: '',
          iban: '',
          conta: ''
        }
      }
    });
    setNewEspecializacao('');
    setNewIdioma({ idioma: '', nivel: '' });
    setNewBeneficio('');
    setError(null);
    setSuccess(false);
    setActiveTab(0);
    onClose();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Renderização do conteúdo baseado na tab ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Dados Pessoais
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome Completo *"
                value={formData.dadosPessoais.nomeCompleto}
                onChange={(e) => handleNestedChange('dadosPessoais', 'nomeCompleto', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome de Apresentação"
                value={formData.dadosPessoais.nomeApresentacao}
                onChange={(e) => handleNestedChange('dadosPessoais', 'nomeApresentacao', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Gênero</InputLabel>
                <Select
                  value={formData.dadosPessoais.genero}
                  label="Gênero"
                  onChange={(e) => handleNestedChange('dadosPessoais', 'genero', e.target.value)}
                >
                  <MenuItem value="">Selecione</MenuItem>
                  <MenuItem value="masculino">Masculino</MenuItem>
                  <MenuItem value="feminino">Feminino</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                <DatePicker
                  label="Data de Nascimento"
                  value={formData.dadosPessoais.dataNascimento}
                  onChange={(date) => handleNestedChange('dadosPessoais', 'dataNascimento', date)}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Estado Civil</InputLabel>
                <Select
                  value={formData.dadosPessoais.estadoCivil}
                  label="Estado Civil"
                  onChange={(e) => handleNestedChange('dadosPessoais', 'estadoCivil', e.target.value)}
                >
                  <MenuItem value="">Selecione</MenuItem>
                  <MenuItem value="solteiro">Solteiro</MenuItem>
                  <MenuItem value="casado">Casado</MenuItem>
                  <MenuItem value="divorciado">Divorciado</MenuItem>
                  <MenuItem value="viuvo">Viúvo</MenuItem>
                  <MenuItem value="uniao_estavel">União Estável</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número de Identificação *"
                value={formData.dadosPessoais.numeroIdentificacao}
                onChange={(e) => handleNestedChange('dadosPessoais', 'numeroIdentificacao', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo de Identificação *</InputLabel>
                <Select
                  value={formData.dadosPessoais.tipoIdentificacao}
                  label="Tipo de Identificação *"
                  onChange={(e) => handleNestedChange('dadosPessoais', 'tipoIdentificacao', e.target.value)}
                  required
                >
                  <MenuItem value="bilhete_identidade">Bilhete de Identidade</MenuItem>
                  <MenuItem value="passaporte">Passaporte</MenuItem>
                  <MenuItem value="carta_conducao">Carta de Condução</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nacionalidade"
                value={formData.dadosPessoais.nacionalidade}
                onChange={(e) => handleNestedChange('dadosPessoais', 'nacionalidade', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Cidade de Naturalidade"
                value={formData.dadosPessoais.naturalidade.cidade}
                onChange={(e) => handleNestedChange('dadosPessoais', 'naturalidade', {
                  ...formData.dadosPessoais.naturalidade,
                  cidade: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Província de Naturalidade"
                value={formData.dadosPessoais.naturalidade.provincia}
                onChange={(e) => handleNestedChange('dadosPessoais', 'naturalidade', {
                  ...formData.dadosPessoais.naturalidade,
                  provincia: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        );

      case 1: // Contatos
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email Principal *"
                type="email"
                value={formData.contatos.emailPrincipal}
                onChange={(e) => handleNestedChange('contatos', 'emailPrincipal', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email Alternativo"
                type="email"
                value={formData.contatos.emailAlternativo}
                onChange={(e) => handleNestedChange('contatos', 'emailAlternativo', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Telefone Principal *"
                value={formData.contatos.telefonePrincipal}
                onChange={(e) => handleNestedChange('contatos', 'telefonePrincipal', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Telefone Alternativo"
                value={formData.contatos.telefoneAlternativo}
                onChange={(e) => handleNestedChange('contatos', 'telefoneAlternativo', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                WhatsApp
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número do WhatsApp"
                value={formData.contatos.whatsapp.numero}
                onChange={(e) => handleNestedChange('contatos', 'whatsapp', {
                  ...formData.contatos.whatsapp,
                  numero: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.contatos.whatsapp.disponivel}
                    onChange={(e) => handleNestedChange('contatos', 'whatsapp', {
                      ...formData.contatos.whatsapp,
                      disponivel: e.target.checked
                    })}
                  />
                }
                label="Disponível por WhatsApp"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Contato de Emergência
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Nome"
                value={formData.contatos.emergencia.nome}
                onChange={(e) => handleNestedChange('contatos', 'emergencia', {
                  ...formData.contatos.emergencia,
                  nome: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Parentesco"
                value={formData.contatos.emergencia.parentesco}
                onChange={(e) => handleNestedChange('contatos', 'emergencia', {
                  ...formData.contatos.emergencia,
                  parentesco: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Telefone"
                value={formData.contatos.emergencia.telefone}
                onChange={(e) => handleNestedChange('contatos', 'emergencia', {
                  ...formData.contatos.emergencia,
                  telefone: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        );

      case 2: // Endereços
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <Home sx={{ mr: 1 }} />
                Endereço Residencial
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Rua"
                value={formData.enderecos.residencial.rua}
                onChange={(e) => handleNestedChange('enderecos', 'residencial', {
                  ...formData.enderecos.residencial,
                  rua: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número"
                value={formData.enderecos.residencial.numero}
                onChange={(e) => handleNestedChange('enderecos', 'residencial', {
                  ...formData.enderecos.residencial,
                  numero: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bairro"
                value={formData.enderecos.residencial.bairro}
                onChange={(e) => handleNestedChange('enderecos', 'residencial', {
                  ...formData.enderecos.residencial,
                  bairro: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Cidade"
                value={formData.enderecos.residencial.cidade}
                onChange={(e) => handleNestedChange('enderecos', 'residencial', {
                  ...formData.enderecos.residencial,
                  cidade: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Província"
                value={formData.enderecos.residencial.provincia}
                onChange={(e) => handleNestedChange('enderecos', 'residencial', {
                  ...formData.enderecos.residencial,
                  provincia: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Código Postal"
                value={formData.enderecos.residencial.codigoPostal}
                onChange={(e) => handleNestedChange('enderecos', 'residencial', {
                  ...formData.enderecos.residencial,
                  codigoPostal: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                <Business sx={{ mr: 1 }} />
                Endereço Comercial
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Rua"
                value={formData.enderecos.comercial.rua}
                onChange={(e) => handleNestedChange('enderecos', 'comercial', {
                  ...formData.enderecos.comercial,
                  rua: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número"
                value={formData.enderecos.comercial.numero}
                onChange={(e) => handleNestedChange('enderecos', 'comercial', {
                  ...formData.enderecos.comercial,
                  numero: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bairro"
                value={formData.enderecos.comercial.bairro}
                onChange={(e) => handleNestedChange('enderecos', 'comercial', {
                  ...formData.enderecos.comercial,
                  bairro: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Cidade"
                value={formData.enderecos.comercial.cidade}
                onChange={(e) => handleNestedChange('enderecos', 'comercial', {
                  ...formData.enderecos.comercial,
                  cidade: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Província"
                value={formData.enderecos.comercial.provincia}
                onChange={(e) => handleNestedChange('enderecos', 'comercial', {
                  ...formData.enderecos.comercial,
                  provincia: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Código Postal"
                value={formData.enderecos.comercial.codigoPostal}
                onChange={(e) => handleNestedChange('enderecos', 'comercial', {
                  ...formData.enderecos.comercial,
                  codigoPostal: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        );

      case 3: // Carreira
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                <DatePicker
                  label="Data de Admissão *"
                  value={formData.carreira.dataAdmissao}
                  onChange={(date) => handleNestedChange('carreira', 'dataAdmissao', date)}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                <DatePicker
                  label="Data de Desligamento"
                  value={formData.carreira.dataDesligamento}
                  onChange={(date) => handleNestedChange('carreira', 'dataDesligamento', date)}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Cargo Atual *"
                value={formData.carreira.cargoAtual}
                onChange={(e) => handleNestedChange('carreira', 'cargoAtual', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Departamento"
                value={formData.carreira.departamento}
                onChange={(e) => handleNestedChange('carreira', 'departamento', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo de Contrato</InputLabel>
                <Select
                  value={formData.carreira.tipoContrato}
                  label="Tipo de Contrato"
                  onChange={(e) => handleNestedChange('carreira', 'tipoContrato', e.target.value)}
                >
                  <MenuItem value="efetivo">Efetivo</MenuItem>
                  <MenuItem value="temporario">Temporário</MenuItem>
                  <MenuItem value="estagiario">Estagiário</MenuItem>
                  <MenuItem value="prestador_servicos">Prestador de Serviços</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Regime de Trabalho</InputLabel>
                <Select
                  value={formData.carreira.regimeTrabalho}
                  label="Regime de Trabalho"
                  onChange={(e) => handleNestedChange('carreira', 'regimeTrabalho', e.target.value)}
                >
                  <MenuItem value="presencial">Presencial</MenuItem>
                  <MenuItem value="hibrido">Híbrido</MenuItem>
                  <MenuItem value="remoto">Remoto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Supervisor
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Nome do Supervisor"
                value={formData.carreira.supervisor.nome}
                onChange={(e) => handleNestedChange('carreira', 'supervisor', {
                  ...formData.carreira.supervisor,
                  nome: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Código do Supervisor"
                value={formData.carreira.supervisor.codigo}
                onChange={(e) => handleNestedChange('carreira', 'supervisor', {
                  ...formData.carreira.supervisor,
                  codigo: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email do Supervisor"
                value={formData.carreira.supervisor.email}
                onChange={(e) => handleNestedChange('carreira', 'supervisor', {
                  ...formData.carreira.supervisor,
                  email: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Horário de Entrada"
                value={formData.carreira.horarioTrabalho.entrada}
                onChange={(e) => handleNestedChange('carreira', 'horarioTrabalho', {
                  ...formData.carreira.horarioTrabalho,
                  entrada: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Horário de Saída"
                value={formData.carreira.horarioTrabalho.saida}
                onChange={(e) => handleNestedChange('carreira', 'horarioTrabalho', {
                  ...formData.carreira.horarioTrabalho,
                  saida: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Intervalo"
                value={formData.carreira.horarioTrabalho.intervalo}
                onChange={(e) => handleNestedChange('carreira', 'horarioTrabalho', {
                  ...formData.carreira.horarioTrabalho,
                  intervalo: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        );

      case 4: // Status
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status Atual *</InputLabel>
                <Select
                  value={formData.status.statusAtual}
                  label="Status Atual *"
                  onChange={(e) => handleNestedChange('status', 'statusAtual', e.target.value)}
                >
                  <MenuItem value="ativo">Ativo</MenuItem>
                  <MenuItem value="inativo">Inativo</MenuItem>
                  <MenuItem value="ferias">Férias</MenuItem>
                  <MenuItem value="licenca">Licença</MenuItem>
                  <MenuItem value="afastado">Afastado</MenuItem>
                  <MenuItem value="treinamento">Treinamento</MenuItem>
                  <MenuItem value="suspenso">Suspenso</MenuItem>
                  <MenuItem value="desligado">Desligado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.status.disponivel}
                    onChange={(e) => handleNestedChange('status', 'disponivel', e.target.checked)}
                  />
                }
                label="Disponível para Trabalho"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.status.online}
                    onChange={(e) => handleNestedChange('status', 'online', e.target.checked)}
                  />
                }
                label="Online"
              />
            </Grid>
          </Grid>
        );

      case 5: // Documentação
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Registro Profissional
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número do Registro"
                value={formData.documentacao.registroProfissional.numero}
                onChange={(e) => handleNestedChange('documentacao', 'registroProfissional', {
                  ...formData.documentacao.registroProfissional,
                  numero: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Órgão Emissor"
                value={formData.documentacao.registroProfissional.orgaoEmissor}
                onChange={(e) => handleNestedChange('documentacao', 'registroProfissional', {
                  ...formData.documentacao.registroProfissional,
                  orgaoEmissor: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                <DatePicker
                  label="Data de Emissão"
                  value={formData.documentacao.registroProfissional.dataEmissao}
                  onChange={(date) => handleNestedChange('documentacao', 'registroProfissional', {
                    ...formData.documentacao.registroProfissional,
                    dataEmissao: date
                  })}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                <DatePicker
                  label="Data de Validade"
                  value={formData.documentacao.registroProfissional.dataValidade}
                  onChange={(date) => handleNestedChange('documentacao', 'registroProfissional', {
                    ...formData.documentacao.registroProfissional,
                    dataValidade: date
                  })}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Autorização da Alfândega
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número da Autorização"
                value={formData.documentacao.autorizacaoAlfandega.numero}
                onChange={(e) => handleNestedChange('documentacao', 'autorizacaoAlfandega', {
                  ...formData.documentacao.autorizacaoAlfandega,
                  numero: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                <DatePicker
                  label="Data de Emissão"
                  value={formData.documentacao.autorizacaoAlfandega.dataEmissao}
                  onChange={(date) => handleNestedChange('documentacao', 'autorizacaoAlfandega', {
                    ...formData.documentacao.autorizacaoAlfandega,
                    dataEmissao: date
                  })}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                <DatePicker
                  label="Data de Validade"
                  value={formData.documentacao.autorizacaoAlfandega.dataValidade}
                  onChange={(date) => handleNestedChange('documentacao', 'autorizacaoAlfandega', {
                    ...formData.documentacao.autorizacaoAlfandega,
                    dataValidade: date
                  })}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );

      case 6: // Qualificação
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Nível Acadêmico</InputLabel>
                <Select
                  value={formData.qualificacao.nivelAcademico}
                  label="Nível Acadêmico"
                  onChange={(e) => handleNestedChange('qualificacao', 'nivelAcademico', e.target.value)}
                >
                  <MenuItem value="">Selecione</MenuItem>
                  <MenuItem value="basico">Básico</MenuItem>
                  <MenuItem value="medio">Médio</MenuItem>
                  <MenuItem value="tecnico">Técnico</MenuItem>
                  <MenuItem value="superior">Superior</MenuItem>
                  <MenuItem value="pos_graduacao">Pós-graduação</MenuItem>
                  <MenuItem value="mestrado">Mestrado</MenuItem>
                  <MenuItem value="doutoramento">Doutoramento</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Curso de Formação"
                value={formData.qualificacao.cursoFormacao}
                onChange={(e) => handleNestedChange('qualificacao', 'cursoFormacao', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Instituição de Formação"
                value={formData.qualificacao.instituicaoFormacao}
                onChange={(e) => handleNestedChange('qualificacao', 'instituicaoFormacao', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Ano de Conclusão"
                type="number"
                value={formData.qualificacao.anoConclusao}
                onChange={(e) => handleNestedChange('qualificacao', 'anoConclusao', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                <School sx={{ mr: 1 }} />
                Especializações
              </Typography>
              
              <List dense>
                {formData.qualificacao.especializacoes.map((especializacao, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={especializacao} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="remover"
                        onClick={() => handleRemoveEspecializacao(index)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              
              <Box display="flex" gap={1} mt={1}>
                <TextField
                  label="Nova Especialização"
                  value={newEspecializacao}
                  onChange={(e) => setNewEspecializacao(e.target.value)}
                  size="small"
                  fullWidth
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEspecializacao();
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleAddEspecializacao}
                  disabled={!newEspecializacao.trim()}
                >
                  Adicionar
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                <Language sx={{ mr: 1 }} />
                Idiomas
              </Typography>
              
              <List dense>
                {formData.qualificacao.idiomas.map((idioma, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${idioma.idioma} - ${idioma.nivel}`}
                      secondary={`Nível: ${idioma.nivel}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="remover"
                        onClick={() => handleRemoveIdioma(index)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Idioma"
                    value={newIdioma.idioma}
                    onChange={(e) => setNewIdioma(prev => ({ ...prev, idioma: e.target.value }))}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Nível</InputLabel>
                    <Select
                      value={newIdioma.nivel}
                      label="Nível"
                      onChange={(e) => setNewIdioma(prev => ({ ...prev, nivel: e.target.value }))}
                    >
                      <MenuItem value="">Selecione</MenuItem>
                      <MenuItem value="basico">Básico</MenuItem>
                      <MenuItem value="intermedio">Intermediário</MenuItem>
                      <MenuItem value="avancado">Avançado</MenuItem>
                      <MenuItem value="fluente">Fluente</MenuItem>
                      <MenuItem value="nativo">Nativo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleAddIdioma}
                    disabled={!newIdioma.idioma.trim() || !newIdioma.nivel}
                    fullWidth
                  >
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );

      case 7: // Remuneração
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Salário Base"
                type="number"
                value={formData.remuneracao.salarioBase}
                onChange={(e) => handleNestedChange('remuneracao', 'salarioBase', parseFloat(e.target.value) || 0)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>MZN</Typography>
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo de Remuneração</InputLabel>
                <Select
                  value={formData.remuneracao.tipoRemuneracao}
                  label="Tipo de Remuneração"
                  onChange={(e) => handleNestedChange('remuneracao', 'tipoRemuneracao', e.target.value)}
                >
                  <MenuItem value="fixa">Fixa</MenuItem>
                  <MenuItem value="comissao">Comissão</MenuItem>
                  <MenuItem value="mista">Mista</MenuItem>
                  <MenuItem value="horista">Horista</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Percentual de Comissão (%)"
                type="number"
                value={formData.remuneracao.comissaoPercentual}
                onChange={(e) => handleNestedChange('remuneracao', 'comissaoPercentual', parseFloat(e.target.value) || 0)}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: <Typography>%</Typography>
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Benefícios
              </Typography>
              
              <List dense>
                {formData.remuneracao.beneficios.map((beneficio, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={beneficio} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="remover"
                        onClick={() => handleRemoveBeneficio(index)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              
              <Box display="flex" gap={1} mt={1}>
                <TextField
                  label="Novo Benefício"
                  value={newBeneficio}
                  onChange={(e) => setNewBeneficio(e.target.value)}
                  size="small"
                  fullWidth
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddBeneficio();
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleAddBeneficio}
                  disabled={!newBeneficio.trim()}
                >
                  Adicionar
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Conta Bancária
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Banco"
                value={formData.remuneracao.contaBancaria.banco}
                onChange={(e) => handleNestedChange('remuneracao', 'contaBancaria', {
                  ...formData.remuneracao.contaBancaria,
                  banco: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="NIB"
                value={formData.remuneracao.contaBancaria.nib}
                onChange={(e) => handleNestedChange('remuneracao', 'contaBancaria', {
                  ...formData.remuneracao.contaBancaria,
                  nib: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="IBAN"
                value={formData.remuneracao.contaBancaria.iban}
                onChange={(e) => handleNestedChange('remuneracao', 'contaBancaria', {
                  ...formData.remuneracao.contaBancaria,
                  iban: e.target.value
                })}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Conta"
                value={formData.remuneracao.contaBancaria.conta}
                onChange={(e) => handleNestedChange('remuneracao', 'contaBancaria', {
                  ...formData.remuneracao.contaBancaria,
                  conta: e.target.value
                })}
                fullWidth
                margin="normal"
              />
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
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Person sx={{ mr: 1 }} />
              <Typography variant="h6">
                Editar Despachante: {despachanteData?.codigoDespachante}
              </Typography>
            </Box>
            {despachanteData && (
              <Chip 
                label={despachanteData.codigoDespachante}
                color="primary"
                size="small"
              />
            )}
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>
                Carregando dados do despachante...
              </Typography>
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
              <Button 
                size="small" 
                onClick={fetchDespachanteDetails}
                sx={{ ml: 1 }}
              >
                Tentar novamente
              </Button>
            </Alert>
          ) : success ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Despachante atualizado com sucesso!
            </Alert>
          ) : (
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab icon={<Person />} label="Dados Pessoais" />
                  <Tab icon={<Mail />} label="Contatos" />
                  <Tab icon={<Home />} label="Endereços" />
                  <Tab icon={<Work />} label="Carreira" />
                  <Tab icon={<Badge />} label="Status" />
                  <Tab icon={<Description />} label="Documentação" />
                  <Tab icon={<School />} label="Qualificação" />
                  <Tab icon={<Work />} label="Remuneração" />
                </Tabs>
              </Box>
              
              <Box sx={{ pt: 3, pb: 2 }}>
                {renderTabContent()}
              </Box>
              
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button 
            onClick={handleClose} 
            disabled={saving || loading}
            color="inherit"
          >
            {success ? 'Fechar' : 'Cancelar'}
          </Button>
          {!success && !loading && (
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              disabled={saving || loading}
              startIcon={saving ? <CircularProgress size={20} /> : null}
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default EditarDespachanteModal;