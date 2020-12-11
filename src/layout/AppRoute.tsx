import React from 'react';
import { Redirect } from 'react-router-dom';
import { WrapperComponent } from '../interfaces/wrapper';
import { useAuth } from '../providers/AuthProvider';
import Navigation from './Navigation';

const AppRoute: WrapperComponent = ({ children }) => {
  const { token } = useAuth();

  if(token === null) return <Redirect to="/auth/login" />;

  return <>{children}<Navigation /></>;
};

export default AppRoute;