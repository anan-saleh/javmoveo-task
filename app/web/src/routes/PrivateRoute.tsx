import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { MainLayout } from '../components/layouts/MainLayout';

export const PrivateRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout />;
};
