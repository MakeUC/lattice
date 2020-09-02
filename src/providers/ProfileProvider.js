import React, { createContext, useContext, useState, useEffect } from 'react';
import ProfileService from '../services/ProfileService';
import { useAuth } from './AuthProvider';

const context = createContext({
  profile: {}
});

export function ProfileProvider({ children }) {
  const { token } = useAuth();
  const [ profile, setProfile ] = useState(``);
  const [ failedToLoad, setFailedToLoad ] = useState(null);

  useEffect(() => {
    if(token) {
      (async function() {
        try {
          const profile = await ProfileService.getProfile({ token });
          setProfile(profile);
        } catch (err) {
          console.error(err);
          setFailedToLoad(err);
        }
      })()
    }
  }, [ token ]);



  const contextValue = {
    profile
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useProfile = () => useContext(context);
