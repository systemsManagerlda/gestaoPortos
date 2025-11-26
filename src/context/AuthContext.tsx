// context/AuthContext.tsx
"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";


// Interfaces melhoradas
interface BaseUser {
  codigo: string;
  id: string;
  email: string;
  categoria: string;
  status: string;
  nome: string;
  tipo: "usuario" | "transportadora";
}

export interface User extends BaseUser {
  nome: string;
  contatoPrincipal?: string;
  categoria: "Gestor" | "Cliente" | "Motorista";
  tipo: "usuario";
}

export interface TransportadoraUser extends BaseUser {
  nomeEmpresa: string;
  transportadoraId: number;
  empresaMotorista: string;
  nif: string;
  categoria: "Transportadora";
  status: "ativa" | "inativa" | "suspensa" | "pendente";
  telefonePrincipal?: string;
  tipo: "transportadora";
  totalCamioes?: number;
  totalMotoristas?: number;
  tipoServicos?: string[];
  provincia?: string;
}

// Tipo unificado para usuário
type AuthUser = User | TransportadoraUser;

// Type guard para verificar o tipo de usuário
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUser = (data: any): data is User => {
  return data && typeof data.nome === 'string' && data.categoria !== "Transportadora";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTransportadoraUser = (data: any): data is TransportadoraUser => {
  return data && typeof data.nomeEmpresa === 'string' && data.categoria === "Transportadora";
};

// Função para normalizar dados do usuário do localStorage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeStoredUser = (data: any): AuthUser | null => {
  if (!data) return null;

  try {
    // Se já tem tipo definido, retorna como está
    if (data.tipo === "usuario" || data.tipo === "transportadora") {
      return data as AuthUser;
    }

    // Backward compatibility: determinar tipo baseado nos campos
    if (isUser(data)) {
      return {
        ...data,
        tipo: "usuario" as const
      };
    }

    if (isTransportadoraUser(data)) {
      return {
        ...data,
        tipo: "transportadora" as const
      };
    }

    // Tentativa de inferência baseada em campos existentes
    if (data.nome) {
      return {
        ...data,
        tipo: "usuario" as const
      };
    }

    if (data.nomeEmpresa) {
      return {
        ...data,
        tipo: "transportadora" as const
      };
    }

    console.warn("Dados de usuário inválidos no localStorage:", data);
    return null;
  } catch (error) {
    console.error("Erro ao normalizar dados do usuário:", error);
    return null;
  }
};

// Tipos para estado e respostas da API
type AuthStatus = "idle" | "loading" | "success" | "error";

interface AuthResponse {
  returnCode: number;
  returnMsg: string;
  data?: {
    valido?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    usuario?: any;
    token?: string;
    // Para transportadoras
    _id?: string;
    nomeEmpresa?: string;
    transportadoraId?: number;
    nif?: string;
    status?: string;
    contactos?: { telefonePrincipal?: string };
    capacidadeTotal?: { totalCamioes?: number; totalMotoristas?: number };
    tipoServicos?: string[];
    endereco?: { provincia?: string };
    empresaMotorista?: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, userData?: AuthUser) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  status: AuthStatus;
  loginTransportadora: (email: string, password: string) => Promise<boolean>;
  clearError: () => void;
}

// Constantes para storage
const STORAGE_KEYS = {
  USER: "user",
  TOKEN: "authToken",
  USER_TYPE: "userType",
} as const;

// Usuário específico para login direto
const SPECIFIC_USERS = {
  GESTOR: {
    email: "gestor@megacentrodelogistica.co.mz",
    password: "mega12@3",
    userData: {
      codigo: "gestor_mega",
      id: "001",
      nome: "Gestor Mega Centro",
      email: "gestor@megacentrodelogistica.co.mz",
      categoria: "Gestor" as const,
      status: "ativo",
      tipo: "usuario" as const,
    } as User,
  },
} as const;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado com verificação de contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("idle");
  const router = useRouter();

  // Funções auxiliares para localStorage
  const getStoredAuth = useCallback((): { user: AuthUser | null; token: string | null } => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      
      if (storedUser && token) {
        const parsedData = JSON.parse(storedUser);
        const normalizedUser = normalizeStoredUser(parsedData);
        
        if (normalizedUser) {
          return { user: normalizedUser, token };
        }
      }
    } catch (err) {
      console.error("Error reading stored auth:", err);
      clearStoredAuth();
    }
    
    return { user: null, token: null };
  }, []);

  const setStoredAuth = useCallback((userData: AuthUser, token: string) => {
    try {
      // Garantir que o tipo está definido
      const userWithType = {
        ...userData,
        tipo: userData.tipo || ("usuario" as const)
      };

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userWithType));
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, userWithType.tipo);
    } catch (err) {
      console.error("Error storing auth:", err);
      throw new Error("Falha ao salvar dados de autenticação");
    }
  }, []);

  const clearStoredAuth = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_TYPE);
    } catch (err) {
      console.error("Error clearing stored auth:", err);
    }
  }, []);

  // Verificar autenticação armazenada ao inicializar
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user: storedUser } = getStoredAuth();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        clearStoredAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [getStoredAuth, clearStoredAuth]);

  // Função para limpar erros
  const clearError = useCallback(() => setError(null), []);

  // Função para tratamento consistente de erros
  const handleAuthError = useCallback((err: unknown, defaultMessage: string) => {
    let errorMessage = defaultMessage;
    
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }

    // Ajustar mensagens para usar "gestora" em vez de "transportadora"
    errorMessage = errorMessage
      .replace(/Transportadora/gi, "Gestora")
      .replace(/transportadora/gi, "gestora");

    setError(errorMessage);
    setStatus("error");

    // Toast notifications específicas
    if (errorMessage.includes("Network") || errorMessage.includes("Failed to fetch")) {
      toast.error("🌐 Erro de conexão. Verifique sua internet e tente novamente.");
    } else if (errorMessage.includes("Credenciais") || errorMessage.includes("Email") || errorMessage.includes("Senha")) {
      toast.error("❌ Email ou senha incorretos. Verifique suas credenciais.");
    } else if (errorMessage.includes("não encontrada") || errorMessage.includes("não existe") || errorMessage.includes("not found")) {
      toast.error("📋 Gestora não encontrada. Verifique o email.");
    } else {
      toast.error(`❌ ${errorMessage}`);
    }

    return errorMessage;
  }, []);

  // Função para login de usuário específico (Gestor Mega)
  const handleSpecificUserLogin = useCallback((email: string, password: string): boolean => {
    if (email === SPECIFIC_USERS.GESTOR.email && password === SPECIFIC_USERS.GESTOR.password) {
      const userData = SPECIFIC_USERS.GESTOR.userData;
      
      setUser(userData);
      setStoredAuth(userData, "authenticated");
      setStatus("success");
      
      toast.success(`Bem-vindo, ${userData.nome}!`);
      
      // Redireciona para o dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
      
      return true;
    }
    return false;
  }, [setStoredAuth, router]);

  // Função principal de login
  const login = useCallback(async (
    email: string,
    password: string,
    userData?: AuthUser
  ): Promise<boolean> => {
    setStatus("loading");
    setError(null);
    setIsLoading(true);

    try {
      // Caso 1: Dados de usuário fornecidos diretamente
      if (userData) {
        setUser(userData);
        setStoredAuth(userData, "authenticated");
        setStatus("success");
        
        const userName = isUser(userData) ? userData.nome : userData.nomeEmpresa;
        toast.success(`Bem-vindo, ${userName}!`);
        return true;
      }

      // Caso 2: Usuário específico (Gestor Mega)
      if (handleSpecificUserLogin(email, password)) {
        return true;
      }

      // Caso 3: Autenticação via API
      const authResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json() as AuthResponse;
        throw new Error(errorData.returnMsg || "Erro na autenticação");
      }

      const authData = await authResponse.json() as AuthResponse;

      if (authData.returnCode === 200 && authData.data?.valido && authData.data.usuario) {
        const userData: User = {
          codigo: authData.data.usuario.codigo || authData.data.usuario._id,
          id: authData.data.usuario._id,
          nome: authData.data.usuario.nome,
          email,
          categoria: authData.data.usuario.categoria,
          status: authData.data.usuario.status,
          contatoPrincipal: authData.data.usuario.contatoPrincipal,
          tipo: "usuario",
        };

        setUser(userData);
        setStoredAuth(userData, authData.data.token || "authenticated");
        setStatus("success");
        
        toast.success(`Bem-vindo, ${userData.nome}!`);
        return true;
      } else {
        throw new Error(authData.returnMsg || "Credenciais inválidas");
      }

    } catch (err) {
      handleAuthError(err, "Erro durante o login");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [handleSpecificUserLogin, handleAuthError, setStoredAuth]);

  // Função específica para login de transportadoras/gestoras
  const loginTransportadora = useCallback(async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setStatus("loading");
    setError(null);
    setIsLoading(true);

    try {
      // Verificar primeiro se é usuário específico
      if (handleSpecificUserLogin(email, password)) {
        return true;
      }

      console.log("Tentando login da gestora:", email);

      const response = await fetch(`${API_BASE_URL}/loginTransportadora`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password }),
      });

      const result = await response.json() as AuthResponse;
      console.log("Resposta do login da gestora:", result);

      if (result.returnCode === 200 && result.data) {
        const transportadoraData: TransportadoraUser = {
          nome: result.data.nomeEmpresa || "Gestora",
          codigo: result.data._id || `gestora_${Date.now()}`,
          id: result.data._id || `gestora_${Date.now()}`,
          nomeEmpresa: result.data.nomeEmpresa || "Gestora",
          transportadoraId: result.data.transportadoraId || 0,
          empresaMotorista: result.data.empresaMotorista || result.data.nomeEmpresa || "Gestora",
          email,
          nif: result.data.nif || "",
          categoria: "Transportadora",
          status: (result.data.status as "ativa" | "inativa" | "suspensa" | "pendente") || "ativa",
          telefonePrincipal: result.data.contactos?.telefonePrincipal,
          tipo: "transportadora",
          totalCamioes: result.data.capacidadeTotal?.totalCamioes,
          totalMotoristas: result.data.capacidadeTotal?.totalMotoristas,
          tipoServicos: result.data.tipoServicos,
          provincia: result.data.endereco?.provincia,
        };

        setUser(transportadoraData);
        setStoredAuth(transportadoraData, "authenticated");
        setStatus("success");
        
        toast.success(`Bem-vinda, ${transportadoraData.nomeEmpresa}!`);
        return true;
      } else {
        throw new Error(result.returnMsg || "Credenciais inválidas para gestora");
      }

    } catch (err) {
      handleAuthError(err, "Erro durante o login da gestora");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [handleSpecificUserLogin, handleAuthError, setStoredAuth]);

  // Função de logout
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    setStatus("idle");
    clearStoredAuth();
    toast.info("Logout realizado com sucesso");
  }, [clearStoredAuth]);

  // Valor do contexto memoizado
  const contextValue = useMemo((): AuthContextType => ({
    user,
    login,
    logout,
    isLoading,
    error,
    status,
    loginTransportadora,
    clearError,
  }), [user, login, logout, isLoading, error, status, loginTransportadora, clearError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper hooks para uso nos componentes
export const useUserType = () => {
  const { user } = useAuth();

  return useMemo(() => ({
    isTransportadora: user ? user.tipo === "transportadora" : false,
    isUsuario: user ? user.tipo === "usuario" : false,
    userType: user?.tipo || null,
    userCategory: user?.categoria || null,
  }), [user]);
};

// Hook para verificar permissões específicas
export const useUserPermissions = () => {
  const { user } = useAuth();

  return useMemo(() => ({
    isGestor: user?.categoria === "Gestor",
    isCliente: user?.categoria === "Cliente",
    isMotorista: user?.categoria === "Motorista",
    isTransportadora: user?.categoria === "Transportadora",
    canManageCargas: user?.categoria === "Gestor" || user?.categoria === "Cliente",
    canManageTransportes: user?.categoria === "Gestor" || user?.categoria === "Transportadora",
    canViewReports: user?.categoria === "Gestor",
  }), [user]);
};

// Hook para redirecionamento baseado no tipo de usuário
export const useAuthRedirect = () => {
  const { user } = useAuth();
  const router = useRouter();

  const redirectBasedOnUserType = useCallback(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    switch (user.categoria) {
      case "Gestor":
        router.push("/dashboard");
        break;
      case "Cliente":
        router.push("/dashboard/cliente");
        break;
      case "Transportadora":
        router.push("/dashboard/transportadora");
        break;
      case "Motorista":
        router.push("/dashboard/motorista");
        break;
      default:
        router.push("/");
    }
  }, [user, router]);

  return { redirectBasedOnUserType };
};