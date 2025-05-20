import axiosInstance from "./axiosInstance";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterUserData {
  username: string;
  password: string;
  instrument?: string;
  isAdmin?: boolean;
}

export interface AuthResponse {
  username: string;
  isAdmin: boolean;
  instrument?: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: RegisterUserData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', userData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.get('/auth/logout');
};
