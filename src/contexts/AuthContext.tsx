
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "professor";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: "student" | "professor") => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === "professor@example.com" && password === "password") {
        setUser({
          id: "1",
          name: "Professor Demo",
          email: "professor@example.com",
          role: "professor"
        });
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta, Professor Demo!",
        });
      } else if (email === "student@example.com" && password === "password") {
        setUser({
          id: "2",
          name: "Estudante Demo",
          email: "student@example.com",
          role: "student"
        });
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta, Estudante Demo!",
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha inválidos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao tentar fazer login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: "student" | "professor") => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        id: "3",
        name,
        email,
        role,
      });
      
      toast({
        title: "Registro realizado com sucesso",
        description: `Bem-vindo, ${name}!`,
      });
    } catch (error) {
      console.error("Register error:", error);
      toast({
        title: "Erro no registro",
        description: "Ocorreu um erro ao tentar se registrar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
