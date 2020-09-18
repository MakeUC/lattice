import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import NotificationService from '../services/NotificationService';
import PushService from '../services/PushService';
import { useAuth } from './AuthProvider';

const context = createContext({
  isLoading: false, failedToLoad: null, notifications: [], pushPermission: `default`,
  getNotifications() {}, readNotifications() {}, requestNotificationPermission() {}
});

export function NotificationProvider({ children }) {
  const { token } = useAuth();

  const [ pushPermission, setPushPermission ] = useState(`default`);
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

    const unreadCount = notifications.filter(({ notification: { read } }) => !read).length;
    if(!unreadCount) return;
    
    try {
      await NotificationService.readNotifications({ token });
      setNotifications(
        notifications => notifications.map(
          notification => ({ ...notification, read: true })
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const requestNotificationPermission = async () => {
    if(!token) return;

    const permission = await PushService.requestPermission();
    setPushPermission(permission);
  }

  useEffect(() => {
    requestNotificationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ token ]);

  const contextValue = {
    isLoading, failedToLoad, notifications, pushPermission,
    getNotifications, readNotifications, requestNotificationPermission
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useNotification = () => useContext(context);
