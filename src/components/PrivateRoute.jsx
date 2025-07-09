import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children, allowedRoles }) {
  const location = useLocation();
  const jwt = localStorage.getItem('jwt');
  const role = localStorage.getItem('role');
  if (!jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to correct dashboard if role is not allowed
    if (role === 'admin') return <Navigate to="/" replace />;
    if (role === 'business') return <Navigate to="/business-dashboard" replace />;
    return <Navigate to="/login" replace />;
  }
  return children;
} 