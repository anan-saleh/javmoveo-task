import { Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout';
import { useAuth } from '../context/useAuth';

export const AdminRoute = () => {
  const { user, loading }  = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    // Logged in but not admin, redirect to unauthorized or user dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  if (user && user.isAdmin && !loading) {
    return <MainLayout isAdmin />;
  }
};
