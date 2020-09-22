import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import PushService from '../services/PushService';

const tokenStorageKey = `lattice-token`;
const subscriptionStorageKey = `push-subscription-id`;

const context = createContext({ 
  token: ``, 
  email: ``, 
  getRegistrantEmail() {}, 
  register() {},
  login() {},
  logout() {},
  changePassword() {},
  sendResetLink() {},
  getResetInfo() {},
  resetPassword() {}
});

export function AuthProvider({ children }) {
  const [ token, setToken ] = useState(``);

  useEffect(() => {
    const token = localStorage.getItem(tokenStorageKey);
    setToken(token);
  }, []);

  useEffect(() => {
    (async function() {
      try {
        if(!token) return;

        const id = localStorage.getItem(subscriptionStorageKey);
        if(id) return;

        const subscription = await PushService.subscribe({ token });
        localStorage.setItem(subscriptionStorageKey, subscription.id);
      } catch(err) {
        console.error(err);
      }
    })();
  }, [ token ]);

  const getRegistrantEmail = registrantId => AuthService.getRegistrantEmail(registrantId);

  const register = async (registrantId, password) => {
    const token = await AuthService.register(registrantId, password);
    localStorage.setItem(tokenStorageKey, token);
    setToken(token);
  };

  const login = async (email, password) => {
    const token = await AuthService.login(email, password);
    localStorage.setItem(tokenStorageKey, token);
    setToken(token);
  };

  const logout = async () => {
    try {
      localStorage.removeItem(tokenStorageKey);
      setToken(null);

      const id = localStorage.getItem(subscriptionStorageKey);
      await PushService.unsubscribe({ token, id });
      localStorage.removeItem(subscriptionStorageKey);
    } catch(err) {
      console.error(err);
    }
  };

  const changePassword = ({ oldPassword, newPassword }) => AuthService.changePassword({ token, oldPassword, newPassword });

  const sendResetLink = email => AuthService.sendResetLink(email);

  const getResetInfo = resetToken => AuthService.getResetInfo(resetToken);

  const resetPassword = (resetToken, password) => AuthService.resetPassword(resetToken, password);

  const contextValue = {
    token, getRegistrantEmail, register, login,
    logout, changePassword, sendResetLink, getResetInfo, resetPassword
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useAuth = () => useContext(context);
