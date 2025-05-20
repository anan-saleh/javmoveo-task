import React, { createContext, useContext } from 'react';
import type { AuthResponse, LoginCredentials, RegisterUserData } from '../api/authApi';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../api/authApi';
import { useUser } from '../components/hooks/useUser';

interface User {
  sub: string;
  isAdmin: boolean;
  instrument?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterUserData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useUser();
  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await apiLogin(credentials);
    localStorage.setItem('user', JSON.stringify(res));
    return res;
  };

  const register = async (userData: RegisterUserData) => {
    await apiRegister(userData);
  };

  const logout = async () => {
    await apiLogout()
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, loading, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
