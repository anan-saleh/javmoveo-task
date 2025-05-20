import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { MainLayout } from '../components/layouts/MainLayout';

export const PrivateRoute = () => {
  const { user } = useAuth();
  const storedUser = localStorage.getItem('user');
  const currentUser = user || JSON.parse(storedUser);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <MainLayout />;
};
