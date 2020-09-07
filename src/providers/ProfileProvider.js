import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ProfileService from '../services/ProfileService';
import { useAuth } from './AuthProvider';

const context = createContext({
  isLoading: true, failedToLoad: null, profile: {},
  skills: [], profiles: [], swipedProfiles: [],
  getProfile() {}, updateProfile() {}, toggleVisibility() {},
  getSkills() {}, getProfiles() {}, swipeProfile() {}
});

export function ProfileProvider({ children }) {
  const { token } = useAuth();

  const [ isLoading, setLoading ] = useState(true);
  const [ failedToLoad, setFailedToLoad ] = useState(null);
  const [ profile, setProfile ] = useState({});
  const [ skills, setSkills ] = useState([]);

  const [ profiles, setProfiles ] = useState([]);
  const [ swipedProfiles, setSwipedProfiles ] = useState([]);

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

  const getSkills = useCallback(async () => {
    const skills = await ProfileService.getSkills({ token });
    setSkills(skills);
  }, [ token ]);
  
  const getProfiles = useCallback(async () => {
    setProfiles([]);
    const profiles = await ProfileService.getProfiles({ token });
    setProfiles(profiles);
  }, [ token ]);

  useEffect(() => {
    token && getProfile();
  }, [ token, getProfile ]);

  useEffect(() => {
    token && getSkills();
  }, [ token, getSkills ]);

  useEffect(() => {
    token && getProfiles();
  }, [ token, getProfiles ]);

  const updateProfile = async profile => {
    const newProfile = await ProfileService.updateProfile({ token, profile });
    setProfile(newProfile);
  };

  const toggleVisibility = async () => {
    const newProfile = await ProfileService.setVisible({ token, visible: !profile.visible });
    setProfile(newProfile);
  };

  const swipeProfile = async (to, match) => {
    if(swipedProfiles.includes(to)) return;
    console.log(`swiping ${to.name} ${match}`);
    setSwipedProfiles(swiped => [ ...swiped, to ]);
  };

  const contextValue = {
    isLoading, failedToLoad, profile,
    skills, profiles, swipedProfiles,
    getProfile, getSkills, getProfiles,
    updateProfile, toggleVisibility, swipeProfile
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useProfile = () => useContext(context);
