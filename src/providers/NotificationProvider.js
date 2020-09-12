import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import NotificationService from '../services/NotificationService';
import { useAuth } from './AuthProvider';

const context = createContext({
  isLoading: false, failedToLoad: null, notifications: [],
  getNotifications() {}, readNotifications() {}
});

export function NotificationProvider({ children }) {
  const { token } = useAuth();

  const [ isLoading, setLoading ] = useState(true);
  const [ failedToLoad, setFailedToLoad ] = useState(null);
  const [ notifications, setNotifications ] = useState([]);

  const getNotifications = useCallback(async () => {
    if(!token) return;
    
    try {
      setLoading(true);
      setFailedToLoad(null);

      const notifications = await NotificationService.getNotifications({ token });

      setNotifications(notifications);
    } catch (err) {
      setFailedToLoad(err);
    } finally {
      setLoading(false);
    }
  }, [ token ]);

  useEffect(() => {
    getNotifications();
  }, [ getNotifications ]);

  const readNotifications = async () => {
    if(!token) return;

    await NotificationService.readNotifications({ token });
    setNotifications(
      notifications => notifications.map(
        notification => ({ ...notification, read: true })
      )
    );
  };

  const contextValue = {
    isLoading, failedToLoad, notifications,
    getNotifications, readNotifications
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useNotification = () => useContext(context);
