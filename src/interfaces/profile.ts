import { Skill } from "./skill";

export interface Profile {
  id: string
  name: string
  skills: Array<string>
  idea: string
  lookingFor: string[]
  started: boolean
  completed: boolean
  visible: boolean
  discord: string
  completedTours?: string[]
  email?: string;
}

export interface ProfileWithEmail extends Profile {
  email: string;
}

export interface ScoredProfile extends Profile {
  score?: number
}

export interface HydratedProfile extends Omit<ScoredProfile, 'skills' | 'lookingFor'> {
  skills: Array<Skill>
  lookingFor: Array<Skill>
}
