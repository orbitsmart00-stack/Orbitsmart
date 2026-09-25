import { useSyncExternalStore } from 'react'
import { AppState, Comment, EMPTY_STATE, ScheduleDay } from '../types'

const STORAGE_KEY = 'cronograma-biblico-v1'

function loadFromStorage(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(EMPTY_STATE)
    const parsed = JSON.parse(raw)
    return { ...structuredClone(EMPTY_STATE), ...parsed }
  } catch {
    return structuredClone(EMPTY_STATE)
  }
}

let state: AppState = loadFromStorage()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Armazenamento indisponível (modo privado, cota excedida etc.) — ignora silenciosamente.
  }
}

function emit() {
  persist()
  listeners.forEach((l) => l())
}

function setState(updater: (prev: AppState) => AppState) {
  state = updater(state)
  emit()
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot(): AppState {
  return state
}

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getSnapshot)
}

// ---- Ações ----

export function setPlanAndSchedule(plan: AppState['plan'], schedule: ScheduleDay[]) {
  setState((prev) => ({ ...prev, plan, schedule }))
}

export function markDayCompleted(dia: number, concluido: boolean) {
  setState((prev) => ({
    ...prev,
    schedule: prev.schedule.map((d) =>
      d.dia === dia
        ? { ...d, concluido, concluidoEm: concluido ? new Date().toISOString() : null }
        : d,
    ),
  }))
}

export function verseKey(bookKey: string, chapter: number, verse: number) {
  return `${bookKey}-${chapter}-${verse}`
}

export function toggleVerseRead(bookKey: string, chapter: number, verse: number) {
  const key = verseKey(bookKey, chapter, verse)
  setState((prev) => {
    const has = prev.readVerses.includes(key)
    return {
      ...prev,
      readVerses: has ? prev.readVerses.filter((k) => k !== key) : [...prev.readVerses, key],
    }
  })
}

export function isVerseRead(appState: AppState, bookKey: string, chapter: number, verse: number) {
  return appState.readVerses.includes(verseKey(bookKey, chapter, verse))
}

export function upsertComment(
  bookKey: string,
  chapter: number,
  verse: number,
  texto: string,
  existingId?: string,
) {
  const now = new Date().toISOString()
  setState((prev) => {
    if (existingId) {
      return {
        ...prev,
        comments: prev.comments.map((c) =>
          c.id === existingId ? { ...c, texto, atualizadoEm: now } : c,
        ),
      }
    }
    const novo: Comment = {
      id: crypto.randomUUID(),
      bookKey,
      chapter,
      verse,
      texto,
      criadoEm: now,
      atualizadoEm: now,
    }
    return { ...prev, comments: [novo, ...prev.comments] }
  })
}

export function deleteComment(id: string) {
  setState((prev) => ({ ...prev, comments: prev.comments.filter((c) => c.id !== id) }))
}

export function setTheme(theme: AppState['settings']['theme']) {
  setState((prev) => ({ ...prev, settings: { ...prev.settings, theme } }))
}

export function resetProgressOnly() {
  setState((prev) => ({
    ...prev,
    schedule: prev.schedule.map((d) => ({ ...d, concluido: false, concluidoEm: null })),
    readVerses: [],
  }))
}

export function resetAll() {
  setState(() => structuredClone(EMPTY_STATE))
}

export function exportStateAsJson(): string {
  return JSON.stringify(state, null, 2)
}

export function downloadExport() {
  const json = exportStateAsJson()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const dataAtual = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `cronograma-biblico-backup-${dataAtual}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function importStateFromJson(json: string): { ok: true } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(json)
    if (typeof parsed !== 'object' || parsed === null) {
      return { ok: false, error: 'Arquivo inválido.' }
    }
    setState(() => ({ ...structuredClone(EMPTY_STATE), ...parsed }))
    return { ok: true }
  } catch {
    return { ok: false, error: 'Não foi possível ler o arquivo. Verifique se é um backup válido.' }
  }
}

// Progresso agregado
export function getProgressSummary(appState: AppState) {
  const totalDias = appState.schedule.length
  const diasConcluidos = appState.schedule.filter((d) => d.concluido).length
  const percentual = totalDias > 0 ? Math.round((diasConcluidos / totalDias) * 100) : 0

  let streak = 0
  for (let i = appState.schedule.length - 1; i >= 0; i--) {
    if (appState.schedule[i].concluido) streak++
    else break
  }

  return { totalDias, diasConcluidos, percentual, streak }
}
