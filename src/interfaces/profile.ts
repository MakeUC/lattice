export interface Profile {
  id: string
  name: string
  skills: string[]
  idea: string
  lookingFor: string[]
  started: boolean
  completed: boolean
  visible: boolean
}

export interface ScoredProfile extends Profile {
  score: number
}