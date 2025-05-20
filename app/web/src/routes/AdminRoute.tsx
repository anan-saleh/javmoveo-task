import { Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout';
import { useAuth } from '../context/useAuth';

export const AdminRoute = () => {
  const { user }  = useAuth();
  const storedUser = localStorage.getItem('user');
  const currentUser = user || JSON.parse(storedUser);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser.isAdmin) {
    // Logged in but not admin, redirect to unauthorized or user dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  return <MainLayout isAdmin />;
};
