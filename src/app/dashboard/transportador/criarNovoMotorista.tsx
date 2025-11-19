import { useState } from "react";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Interfaces (reutilizando as que já existem no seu código)
interface CreateMotoristaData {
  nomeCompleto: string;
  dataNascimento: string;
  nacionalidade?: string;
  empresaMotorista: string;
  empresaMotoristaId: number;
  cargo?: string;
  dataAdmissao?: string;
  statusContratual: "ativo" | "inativo" | "ferias" | "licenca" | "suspenso";
  numeroBI: string;
  validadeBI: string;
  nuit?: string;
  numeroSegurancaSocial?: string;
  cartaConducao: {
    numero: string;
    categoria: "CE" | "C" | "D" | "E";
    dataEmissao?: string;
    validade: string;
    localEmissao?: string;
  };
  licencaProfissional?: {
    numero: string;
    validade?: string;
    categoria?: string;
  };
  contactos: {
    telefonePrincipal: string;
    telefoneAlternativo?: string;
    email?: string;
    emergencia?: {
      nome?: string;
      parentesco?: string;
      telefone?: string;
    };
  };
  endereco?: {
    provincia?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numeroCasa?: string;
  };
  status: "disponivel" | "em_viagem" | "ferias" | "licenca" | "indisponivel";
  criadoPor?: string;
  observacoes?: string;
}

interface CreateMotoristaResponse {
  returnCode: number;
  returnMsg: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface ErrorResponse {
  returnCode: number;
  returnMsg: string;
}

// Função para validar idade mínima (18 anos)
const validarIdadeMinima = (dataNascimento: string): boolean => {
  const dataNasc = new Date(dataNascimento);
  const hoje = new Date();
  const idade = hoje.getFullYear() - dataNasc.getFullYear();
  const mesDiff = hoje.getMonth() - dataNasc.getMonth();

  if (mesDiff < 0 || (mesDiff === 0 && hoje.getDate() < dataNasc.getDate())) {
    return idade - 1 >= 18;
  }

  return idade >= 18;
};

// Função para validar validade de documentos
const validarValidadeDocumento = (validade: string): boolean => {
  return new Date(validade) > new Date();
};

// Função para validar os dados antes do envio
const validarDadosMotorista = (
  dados: CreateMotoristaData
): { valido: boolean; erros: string[] } => {
  const erros: string[] = [];

  // Validações básicas
  if (!dados.nomeCompleto || dados.nomeCompleto.trim() === "") {
    erros.push("Nome completo é obrigatório");
  }

  if (!dados.numeroBI || dados.numeroBI.trim() === "") {
    erros.push("Número do BI é obrigatório");
  }

  if (!dados.validadeBI) {
    erros.push("Validade do BI é obrigatória");
  } else if (!validarValidadeDocumento(dados.validadeBI)) {
    erros.push("Validade do BI está expirada");
  }

  if (
    !dados.contactos.telefonePrincipal ||
    dados.contactos.telefonePrincipal.trim() === ""
  ) {
    erros.push("Telefone principal é obrigatório");
  }

  if (!dados.empresaMotorista || dados.empresaMotorista.trim() === "") {
    erros.push("Empresa motorista é obrigatória");
  }

  if (!dados.empresaMotoristaId || dados.empresaMotoristaId <= 0) {
    erros.push("ID da empresa é obrigatório");
  }

  // Validações da carta de condução
  if (!dados.cartaConducao.numero || dados.cartaConducao.numero.trim() === "") {
    erros.push("Número da carta de condução é obrigatório");
  }

  if (!dados.cartaConducao.validade) {
    erros.push("Validade da carta de condução é obrigatória");
  } else if (!validarValidadeDocumento(dados.cartaConducao.validade)) {
    erros.push("Validade da carta de condução está expirada");
  }

  if (!dados.cartaConducao.categoria) {
    erros.push("Categoria da carta de condução é obrigatória");
  }

  // Validação de idade
  if (dados.dataNascimento) {
    if (!validarIdadeMinima(dados.dataNascimento)) {
      erros.push("Motorista deve ter pelo menos 18 anos de idade");
    }
  } else {
    erros.push("Data de nascimento é obrigatória");
  }

  // Validação de formato do telefone (básica)
  if (
    dados.contactos.telefonePrincipal &&
    !/^\+?[\d\s-()]+$/.test(dados.contactos.telefonePrincipal)
  ) {
    erros.push("Formato do telefone principal é inválido");
  }

  // Validação de email se fornecido
  if (
    dados.contactos.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.contactos.email)
  ) {
    erros.push("Formato de email inválido");
  }

  return {
    valido: erros.length === 0,
    erros,
  };
};

// Função para processar e limpar dados antes do envio
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processarDadosMotorista = (dados: CreateMotoristaData): any => {
  // Criar cópia dos dados
  const dadosProcessados = { ...dados };

  // 🔥 CORREÇÃO: Adicionar campos obrigatórios do schema que não estão no frontend
  const dadosComSchema = {
    // Campos obrigatórios do schema MongoDB
    nomeEmpresa: "Mega Centro e Logistica",

    // Dados do frontend
    ...dadosProcessados,

    // Campos calculados automáticos
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString(),

    // Campos com valores padrão do schema
    totalViagensRealizadas: 0,
    totalKmPercorridos: 0,
    indiceAcidentes: 0,
    indiceMultas: 0,

    // 🔥 CORREÇÃO: Estrutura correta para arrays vazios
    veiculosHabilitados: [],
    certificados: [],
    especializacoes: [],
    examesMedicos: [],
    treinamentos: [],
    incidentes: [],
    multas: [],
    equipamentos: [],

    // 🔥 CORREÇÃO: Estrutura do transportador conforme schema
    infoTransportador: {
      totalCamioes: 0,
      qualificadoTransito: false,
      restricoes: {
        podeFazerNacional: true,
        podeFazerTransito: false,
        motivo: "Novo motorista - sem veículos habilitados",
        dataVerificacao: new Date().toISOString(),
      },
    },

    // 🔥 CORREÇÃO: Limpar licença profissional se estiver vazia
    ...(dadosProcessados.licencaProfissional &&
    (!dadosProcessados.licencaProfissional.numero ||
      dadosProcessados.licencaProfissional.numero.trim() === "")
      ? { licencaProfissional: undefined }
      : {}),
  };

  return dadosComSchema;
};

// Função principal para criar um novo motorista
export async function criarNovoMotorista(
  dados: CreateMotoristaData
): Promise<CreateMotoristaResponse> {
  try {
    // Validar dados antes do envio
    const validacao = validarDadosMotorista(dados);
    if (!validacao.valido) {
      return {
        returnCode: 400,
        returnMsg: `Dados inválidos: ${validacao.erros.join(", ")}`,
      };
    }

    // Processar dados para incluir campos obrigatórios do schema
    const dadosCompletos = processarDadosMotorista(dados);

    // Fazer a requisição para a API
    const response = await fetch(`${API_BASE_URL}/createMotorista`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosCompletos),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.returnMsg || `Erro HTTP: ${response.status}`);
    }

    const result: CreateMotoristaResponse = await response.json();

    return result;
  } catch (error) {
    console.error("Erro ao criar motorista:", error);

    return {
      returnCode: 500,
      returnMsg:
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao criar motorista",
    };
  }
}

// Função auxiliar para criar dados padrão de um novo motorista
export function criarDadosPadraoMotorista(
  empresaMotorista: string,
  empresaMotoristaId: number
): Partial<CreateMotoristaData> {
  const hoje = new Date();
  const cincoAnos = new Date(hoje);
  cincoAnos.setFullYear(cincoAnos.getFullYear() + 5);

  return {
    nomeCompleto: "",
    dataNascimento: "",
    nacionalidade: "Moçambicana",
    empresaMotorista,
    empresaMotoristaId,
    cargo: "Motorista Profissional",
    dataAdmissao: hoje.toISOString().split("T")[0],
    statusContratual: "ativo",
    numeroBI: "",
    validadeBI: cincoAnos.toISOString().split("T")[0],
    nuit: "",
    numeroSegurancaSocial: "",
    cartaConducao: {
      numero: "",
      categoria: "C",
      dataEmissao: hoje.toISOString().split("T")[0],
      validade: cincoAnos.toISOString().split("T")[0],
      localEmissao: "",
    },
    contactos: {
      telefonePrincipal: "",
      telefoneAlternativo: "",
      email: "",
      emergencia: {
        nome: "",
        parentesco: "",
        telefone: "",
      },
    },
    endereco: {
      provincia: "",
      cidade: "",
      bairro: "",
      rua: "",
      numeroCasa: "",
    },
    status: "disponivel",
    observacoes: "",
  };
}

// Hook React para gerenciar o estado do formulário de motorista
export function useNovoMotorista(
  empresaMotorista: string,
  empresaMotoristaId: number
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const criarMotorista = async (dados: CreateMotoristaData) => {
    setLoading(true);
    setError(null);

    try {
      const resultado = await criarNovoMotorista(dados);

      if (resultado.returnCode === 201) {
        return resultado;
      } else {
        throw new Error(resultado.returnMsg);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    criarMotorista,
    loading,
    error,
    dadosPadrao: criarDadosPadraoMotorista(
      empresaMotorista,
      empresaMotoristaId
    ),
  };
}
