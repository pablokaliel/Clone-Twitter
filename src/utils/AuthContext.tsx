import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Lógica para realizar o login do usuário, por exemplo, através de uma API.
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Salvar no localStorage
  };

  const logout = () => {
    // Lógica para realizar o logout do usuário.
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remover do localStorage
  };

  // Verificar o localStorage ao inicializar
  useEffect(() => {
    const savedIsAuthenticated = localStorage.getItem('isAuthenticated');
    if (savedIsAuthenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
