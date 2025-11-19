// context/AuthContext.tsx
"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Interface para usuários regulares
interface User {
  codigo: string;
  nome: string;
  email: string;
  categoria: "Gestor" | "Cliente" | "Motorista";
  status: string;
  contatoPrincipal?: string;
  tipo?: "usuario"; // Adicionar tipo para diferenciar
}

// Interface para transportadoras
export interface TransportadoraUser {
  codigo: string;
  nomeEmpresa: string;
  transportadoraId: number;
  email: string;
  nif: string;
  categoria: "Transportadora";
  status: "ativa" | "inativa" | "suspensa" | "pendente";
  telefonePrincipal?: string;
  tipo: "transportadora"; // Tipo específico para transportadoras
  // Campos específicos de transportadora
  totalCamioes?: number;
  totalMotoristas?: number;
  tipoServicos?: string[];
  provincia?: string;
  empresaMotorista: string;
}

// Tipo unificado para usuário
type AuthUser = User | TransportadoraUser;

interface AuthContextType {
  user: AuthUser | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (email: string, password: string, userData?: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
  // Nova função para login específico de transportadora
  loginTransportadora: (email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const router = useRouter();

  useEffect(() => {
    const checkStoredAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("authToken");
        const userType = localStorage.getItem("userType"); // Novo: tipo de usuário

        if (storedUser && token) {
          const userData = JSON.parse(storedUser);

          // Adicionar tipo baseado no que estava armazenado
          if (!userData.tipo) {
            userData.tipo = userType || "usuario";
          }

          setUser(userData);
        }
      } catch (err) {
        console.error("Error checking stored auth:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
      } finally {
        setIsLoading(false);
      }
    };

    checkStoredAuth();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = async (
    email: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData?: any
  ): Promise<boolean> => {
    setStatus("loading");
    setError(null);
    setIsLoading(true);

    try {
      // Se userData for fornecido (como no caso do login de transportadora), usar diretamente
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", "authenticated");
        localStorage.setItem("userType", userData.tipo || "usuario");

        setStatus("success");
        const userName = userData.nome || userData.nomeEmpresa || "Usuário";
        toast.success(`Bem-vindo, ${userName}!`);
        return true;
      }

      // SOLUÇÃO: Usar uma rota específica de autenticação no backend
      const authResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (authResponse.ok) {
        const authData = await authResponse.json();

        if (authData.returnCode === 200 && authData.data.valido) {
          // Login bem-sucedido
          const userData: User = {
            codigo: authData.data.usuario.codigo,
            nome: authData.data.usuario.nome,
            email: email,
            categoria: authData.data.usuario.categoria,
            status: authData.data.usuario.status,
            contatoPrincipal: authData.data.usuario.contatoPrincipal,
            tipo: "usuario",
          };

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem(
            "authToken",
            authData.data.token || "authenticated"
          );
          localStorage.setItem("userType", "usuario");

          setStatus("success");
          toast.success(`Bem-vindo, ${authData.data.usuario.nome}!`);
          return true;
        } else {
          throw new Error(authData.returnMsg || "Credenciais inválidas");
        }
      } else {
        const errorData = await authResponse.json();
        throw new Error(errorData.returnMsg || "Erro na autenticação");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.message || "Erro durante o login";
      setError(errorMessage);
      setStatus("error");
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Nova função específica para login de transportadoras
  // Nova função específica para login de gestoras
  const loginTransportadora = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setStatus("loading");
    setError(null);
    setIsLoading(true);

    try {
      console.log("Tentando login da gestora:", email);

      // VERIFICAÇÃO DO USUÁRIO ESPECÍFICO
      const specificEmail = "gestor@megacentrodelogistica.co.mz";
      const specificPassword = "mega12@3";

      // Login direto para o usuário específico
      if (email === specificEmail && password === specificPassword) {
        console.log("Usuário específico detectado, criando sessão...");

        const userData: User = {
          codigo: "gestor_mega",
          nome: "Gestor Mega Centro",
          email: specificEmail,
          categoria: "Gestor",
          status: "ativo",
          tipo: "usuario",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", "authenticated");
        localStorage.setItem("userType", "usuario");

        setStatus("success");
        toast.success(`Bem-vindo, Gestor Mega Centro!`);

        // Redireciona para o dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);

        return true;
      }

      // CORREÇÃO: Usar 'senha' em vez de 'password'
      const response = await fetch(`${API_BASE_URL}/loginTransportadora`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: password, // ← CORREÇÃO AQUI
        }),
      });

      const result = await response.json();
      console.log("Resposta do login da gestora:", result);

      if (result.returnCode === 200 && result.data) {
        // Login bem-sucedido da gestora
        const transportadoraData: TransportadoraUser = {
          codigo:
            result.data.codigo || result.data._id || `gestora_${Date.now()}`,
          nomeEmpresa: result.data.nomeEmpresa,
          transportadoraId: result.data.transportadoraId,
          empresaMotorista: result.data.empresaMotorista,
          email: email,
          nif: result.data.nif,
          categoria: "Transportadora",
          status: result.data.status || "ativa",
          telefonePrincipal: result.data.contactos?.telefonePrincipal,
          tipo: "transportadora",
          totalCamioes: result.data.capacidadeTotal?.totalCamioes,
          totalMotoristas: result.data.capacidadeTotal?.totalMotoristas,
          tipoServicos: result.data.tipoServicos,
          provincia: result.data.endereco?.provincia,
        };

        setUser(transportadoraData);
        localStorage.setItem("user", JSON.stringify(transportadoraData));
        localStorage.setItem("authToken", "authenticated");
        localStorage.setItem("userType", "transportadora");

        setStatus("success");
        toast.success(`Bem-vinda, ${transportadoraData.nomeEmpresa}!`);

        return true;
      } else {
        // CORREÇÃO: Mensagens de erro mais específicas
        let errorMessage =
          result.returnMsg || "Credenciais inválidas para gestora";

        // Ajusta a mensagem para usar "gestora" em vez de "transportadora"
        if (
          errorMessage.includes("Transportadora") ||
          errorMessage.includes("transportadora")
        ) {
          errorMessage = errorMessage
            .replace(/Transportadora/gi, "Gestora")
            .replace(/transportadora/gi, "gestora");
        }

        throw new Error(errorMessage);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage = err.message || "Erro durante o login da gestora";

      // Ajusta mensagens de erro do servidor
      if (
        errorMessage.includes("Transportadora") ||
        errorMessage.includes("transportadora")
      ) {
        errorMessage = errorMessage
          .replace(/Transportadora/gi, "Gestora")
          .replace(/transportadora/gi, "gestora");
      }

      setError(errorMessage);
      setStatus("error");

      if (
        errorMessage.includes("Network") ||
        errorMessage.includes("Failed to fetch")
      ) {
        toast.error(
          "🌐 Erro de conexão. Verifique sua internet e tente novamente."
        );
      } else if (
        errorMessage.includes("Credenciais") ||
        errorMessage.includes("Email") ||
        errorMessage.includes("Senha")
      ) {
        toast.error(
          "❌ Email ou senha incorretos. Verifique suas credenciais."
        );
      } else if (
        errorMessage.includes("não encontrada") ||
        errorMessage.includes("não existe") ||
        errorMessage.includes("not found")
      ) {
        toast.error("📋 Gestora não encontrada. Verifique o email.");
      } else {
        toast.error(`❌ ${errorMessage}`);
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    setUser(null);
    setError(null);
    setStatus("idle");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    toast.info("Logout realizado com sucesso");
  };

  // Helper functions para verificar tipo de usuário
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isTransportadora = (user: AuthUser): user is TransportadoraUser => {
    return user.tipo === "transportadora";
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isUsuario = (user: AuthUser): user is User => {
    return user.tipo === "usuario" || !user.tipo; // Backward compatibility
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    error,
    status,
    loginTransportadora,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Helper hooks para uso nos componentes
export const useUserType = () => {
  const { user } = useAuth();

  return {
    isTransportadora: user ? user.tipo === "transportadora" : false,
    isUsuario: user ? user.tipo === "usuario" || !user.tipo : false,
    userType: user?.tipo || "usuario",
  };
};
