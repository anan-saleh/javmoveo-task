import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

interface User {
  sub: string;
  username: string;
  isAdmin: boolean;
}

export const useUser = () => {
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user) {
          const response = await axiosInstance.get<User>('/auth/me');
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        setError(null);
      } catch (err: any) { // todo: handle any type later
        setUser(null);
        localStorage.removeItem('user');
        setError(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
