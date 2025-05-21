import axiosInstance from '@/api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

interface User {
  sub: string;
  username: string;
  isAdmin: boolean;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        } else {
        const response = await axiosInstance.get<User>('/auth/me');
        setUser(response.data);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        }
        setError(null);
      } catch (err: any) { // todo: handle any type later
        setUser(null);
        await AsyncStorage.removeItem('user');
        setError(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error, setUser };
};