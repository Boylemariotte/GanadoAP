import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  role: 'user' | 'owner';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: 'user' | 'owner', name?: string) => void;
  logout: () => void;
  isOwner: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('ganado-ap-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role: 'user' | 'owner', name: string = '') => {
    const userData: User = { role, name: name || (role === 'owner' ? 'Administrador' : 'Usuario') };
    setUser(userData);
    localStorage.setItem('ganado-ap-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ganado-ap-user');
  };

  const isOwner = () => user?.role === 'owner';

  return (
    <AuthContext.Provider value={{ user, login, logout, isOwner }}>
      {children}
    </AuthContext.Provider>
  );
};
