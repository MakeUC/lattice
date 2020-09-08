import React, { createContext, useContext, useState } from 'react';
import MatchService from '../services/MatchService';
import { useAuth } from './AuthProvider';

const context = createContext({
  swipeProfile() {}
});

export function MatchProvider({ children }) {
  const { token } = useAuth();

  const [ swipedProfiles, setSwipedProfiles ] = useState([]);

  const swipeProfile = async (to, match) => {
    if(swipedProfiles.includes(to)) return;

    // eslint-disable-next-line no-unused-vars
    const newMatch = await MatchService.swipe({ token, match: { to: to.id, match } });
    setSwipedProfiles(swiped => [ ...swiped, to ]);
  };

  const contextValue = {
    swipeProfile
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useMatch = () => useContext(context);
