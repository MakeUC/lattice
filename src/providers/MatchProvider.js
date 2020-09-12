import React, { createContext, useContext, useState } from 'react';
import MatchService from '../services/MatchService';
import { useAuth } from './AuthProvider';
import { useProfileList } from './ProfileListProvider';

const context = createContext({
  swipeProfile() {}, reset() {}
});

export function MatchProvider({ children }) {
  const { token } = useAuth();
  const { getProfiles } = useProfileList()

  const [ swipedProfiles, setSwipedProfiles ] = useState([]);

  const swipeProfile = async (to, match) => {
    if(swipedProfiles.includes(to.id)) return;

    await MatchService.swipe({ token, match: { to: to.id, match } });
    setSwipedProfiles(swiped => [ ...swiped, to.id ]);
  };

  const reset = async () => {
    await MatchService.reset({ token });
    setSwipedProfiles([]);
    await getProfiles();
  };

  const contextValue = {
    swipeProfile, reset
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useMatch = () => useContext(context);
