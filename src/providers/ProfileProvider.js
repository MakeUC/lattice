import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ProfileService from '../services/ProfileService';
import { useAuth } from './AuthProvider';

const context = createContext({
  isLoading: true, failedToLoad: null, profile: {},
  getProfile() {}, updateProfile() {}, toggleVisibility() {}, completeTour() {}
});

export function ProfileProvider({ children }) {
  const { token } = useAuth();

  const [ isLoading, setLoading ] = useState(true);
  const [ failedToLoad, setFailedToLoad ] = useState(null);
  const [ profile, setProfile ] = useState({});

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      setFailedToLoad(null);

      const profile = await ProfileService.getProfile({ token });

      setProfile(profile);

      if(!profile.started) {
        ProfileService.startProfile({ token });
      }
    } catch (err) {
      setFailedToLoad(err);
    } finally {
      setLoading(false);
    }
  }, [ token ]);

  useEffect(() => {
    token && getProfile();
  }, [ token, getProfile ]);

  const updateProfile = async profile => {
    const newProfile = await ProfileService.updateProfile({ token, profile });
    setProfile(newProfile);
  };

  const toggleVisibility = async () => {
    const newProfile = await ProfileService.setVisible({ token, visible: !profile.visible });
    setProfile(newProfile);
  };

  const completeTour = async tour => {
    try {
      await ProfileService.completeTour({ token, tour });
      await getProfile();
    } catch(err) {
      console.error(err);
    }
  };

  const contextValue = {
    isLoading, failedToLoad, profile,
    getProfile, updateProfile, toggleVisibility, completeTour
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useProfile = () => useContext(context);
