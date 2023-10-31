import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar o aplicativo
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    // Salvar o estado de autenticação no armazenamento local
    localStorage.setItem("isAuthenticated", "true");
    const user = {
      name: "Nome do Usuário",
      avatar: "URL do Avatar",
      login: "login",
    };
  
    // Salve os dados do usuário no armazenamento local
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Remover o estado de autenticação do armazenamento local
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};