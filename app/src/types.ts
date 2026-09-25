export type PlanDuration = '3m' | '6m' | '1a'
export type PlanMode = 'sequencial' | 'intercalado'

export interface PlanConfig {
  duracao: PlanDuration
  modo: PlanMode
  dataInicio: string // ISO date (yyyy-mm-dd)
}

export interface ScheduleSegment {
  bookKey: string
  chapterStart: number
  chapterEnd: number
}

export interface ScheduleDay {
  dia: number // 1-indexed
  data: string // ISO date (yyyy-mm-dd)
  segmentos: ScheduleSegment[]
  concluido: boolean
  concluidoEm: string | null
}

export interface Comment {
  id: string
  bookKey: string
  chapter: number
  verse: number
  texto: string
  criadoEm: string
  atualizadoEm: string
}

export interface Settings {
  theme: 'light' | 'dark' | 'system'
}

export interface AppState {
  version: 1
  plan: PlanConfig | null
  schedule: ScheduleDay[]
  readVerses: string[] // chaves "bookKey-chapter-verse"
  comments: Comment[]
  settings: Settings
}

export const EMPTY_STATE: AppState = {
  version: 1,
  plan: null,
  schedule: [],
  readVerses: [],
  comments: [],
  settings: { theme: 'system' },
}
