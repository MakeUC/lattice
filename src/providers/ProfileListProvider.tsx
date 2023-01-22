import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ScoredProfile } from "../interfaces/profile";
import { Skill } from "../interfaces/skill";
import { WrapperComponent } from "../interfaces/wrapper";
import ProfileService from "../services/ProfileService";
import SkillService from "../services/SkillService";
import { useAuth } from "./AuthProvider";
import { useProfile } from "./ProfileProvider";

interface contextType {
  isLoading: boolean;
  failedToLoad: any;
  skills: Array<Skill>;
  profiles: Array<ScoredProfile>;
  getSkills: () => Promise<void>;
  getProfiles: () => Promise<void>;
}

const context = createContext<contextType | null>(null);

export const ProfileListProvider: WrapperComponent = ({ children }) => {
  const { token } = useAuth();
  const { profile } = useProfile();

  const [isLoading, setLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState<Error | null>(null);
  const [skills, setSkills] = useState<Array<Skill>>([]);

  const [profiles, setProfiles] = useState<Array<ScoredProfile>>([]);

  const getSkills = useCallback(async () => {
    try {
      const skills = await SkillService.getSkills(token!);
      setSkills(skills);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const getProfiles = useCallback(async () => {
    if (!profile?.visible) return;
    try {
      setLoading(true);
      setFailedToLoad(null);

      const profiles = await ProfileService.getProfiles(token!);

      setProfiles(profiles);
    } catch (err) {
      if (err instanceof Error) {
        setFailedToLoad(err);
      }
    } finally {
      setLoading(false);
    }
  }, [profile, token]);

  useEffect(() => {
    token && getSkills();
  }, [token, getSkills]);

  useEffect(() => {
    token && getProfiles();
  }, [token, getProfiles]);

  const contextValue: contextType = {
    isLoading,
    failedToLoad,
    skills,
    profiles,
    getSkills,
    getProfiles,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useProfileList = () => useContext(context)!;
