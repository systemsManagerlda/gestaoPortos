// context/AuthContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "client" | "transportador";
  company?: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  isLoading: boolean; // Novo estado para controlar loading inicial
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading inicial
  const router = useRouter();

  // Verificar se há usuário logado ao carregar a página - APENAS UMA VEZ
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('mega-logistica-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao recuperar usuário:', error);
        localStorage.removeItem('mega-logistica-user');
      } finally {
        setIsLoading(false); // Finaliza loading independente do resultado
      }
    };

    checkAuth();
  }, []); // Array vazio para executar apenas uma vez

  const login = async (email: string, password: string): Promise<boolean> => {
    setStatus('loading');
    setError(null);

    try {
      // Simulação de chamada API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validação de exemplo
      let userData: User;
      
      if (email === 'admin@mega.co.mz' && password === '123456') {
        userData = {
          id: '1',
          email: email,
          name: 'Administrador Sistema',
          role: 'admin',
          company: 'Mega Centro de Logística',
          permissions: ['all']
        };
      } else if (email === 'cliente@empresa.co.mz' && password === '123456') {
        userData = {
          id: '2',
          email: email,
          name: 'João Silva - ETG',
          role: 'client',
          company: 'ETG (Adubo)',
          permissions: ['view_cargos', 'track_cargos', 'reports']
        };
      } else if (email === 'transportador@empresa.co.mz' && password === '123456') {
        userData = {
          id: '3',
          email: email,
          name: 'Carlos Mendes',
          role: 'transportador',
          company: 'Transportes Carlos Lda',
          permissions: ['view_viagens', 'update_status', 'relatorios']
        };
      } else {
        setError('Email ou senha incorretos');
        setStatus('error');
        return false;
      }
      
      setUser(userData);
      localStorage.setItem('mega-logistica-user', JSON.stringify(userData));
      localStorage.setItem('mega-logistica-token', 'fake-jwt-token');
      
      setStatus('success');
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      setStatus('error');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setStatus('idle');
    localStorage.removeItem('mega-logistica-user');
    localStorage.removeItem('mega-logistica-token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      status, 
      error,
      isLoading // Exportar o estado de loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}