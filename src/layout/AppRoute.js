import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Navigation from './Navigation';

export default function({ children }) {
  const { token } = useAuth();

  if(!token) return <Redirect to="/auth/login" />;

  return <>{children}<Navigation /></>;
};
