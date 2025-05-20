import React, { createContext, useContext } from 'react';
import type { LoginCredentials, RegisterUserData } from '@/api/authApi';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '@/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterUserData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const login = async (credentials: LoginCredentials) => {
    const res = await apiLogin(credentials);
    await AsyncStorage.setItem('user', JSON.stringify(res));
  };

  const register = async (userData: RegisterUserData) => {
    await apiRegister(userData);
  };

  const logout = async () => {
    await apiLogout()
    await AsyncStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};