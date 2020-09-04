import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { Redirect } from 'react-router-dom';

export default function({ children }) {
  const { token } = useAuth();

  if(token) return <Redirect to="/" />

  return children;
};
