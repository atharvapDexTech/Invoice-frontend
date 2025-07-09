import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RoleBasedRedirect() {
  const jwt = localStorage.getItem('jwt');
  const role = localStorage.getItem('role');
  if (!jwt) return <Navigate to="/login" replace />;
  if (role === 'admin') return <Navigate to="/" replace />;
  if (role === 'business') return <Navigate to="/business-dashboard" replace />;
  return <Navigate to="/login" replace />;
} 