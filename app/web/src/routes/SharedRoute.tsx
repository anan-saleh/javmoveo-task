import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { MainLayout } from '../components/layouts/MainLayout';

export const SharedRoute = () => {
  const { user } = useAuth();
  const storedUser = localStorage.getItem('user');
  const currentUser = user || JSON.parse(storedUser);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <MainLayout />;
};
