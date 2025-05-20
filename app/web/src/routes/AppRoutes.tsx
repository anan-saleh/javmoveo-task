import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';
import { Login } from '../components/Login';
import { PlayerDashboard } from '../components/Player/Dashboard';
import { Signup } from '../components/Signup';
import { AdminDashboard } from '../components/Admin/Dashboard';
import { Result } from '../components/Admin/Result';
import { Live } from '../components/Live';

export const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />

    {/* Routes for any logged-in user */}
    <Route element={<PrivateRoute />}>
      <Route path="/live" element={<Live />} />
      <Route path="/player/dashboard" element={<PlayerDashboard />} />
    </Route>

    {/* Routes for admin users only */}
    <Route element={<AdminRoute />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/result" element={<Result />} />
      <Route path="/live" element={<Live />} />
    </Route>

    {/* Unauthorized access page */}
    {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

    {/* Catch all - 404 */}
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);
