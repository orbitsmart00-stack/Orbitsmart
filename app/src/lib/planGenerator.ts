import {
  NEW_TESTAMENT_BOOKS,
  OLD_TESTAMENT_BOOKS,
  TOTAL_CHAPTERS,
  TOTAL_NT_CHAPTERS,
  TOTAL_OT_CHAPTERS,
} from '../data/books'
import { BookDef } from '../data/books'
import { PlanConfig, PlanDuration, ScheduleDay, ScheduleSegment } from '../types'

export const DURATION_DAYS: Record<PlanDuration, number> = {
  '3m': 90,
  '6m': 183,
  '1a': 365,
}

export const DURATION_LABELS: Record<PlanDuration, string> = {
  '3m': '3 meses',
  '6m': '6 meses',
  '1a': '1 ano',
}

interface ChapterRef {
  bookKey: string
  chapter: number
}

function flatten(books: BookDef[]): ChapterRef[] {
  const out: ChapterRef[] = []
  for (const b of books) {
    for (let c = 1; c <= b.chapters; c++) out.push({ bookKey: b.key, chapter: c })
  }
  return out
}

function groupSegments(chapters: ChapterRef[]): ScheduleSegment[] {
  const segments: ScheduleSegment[] = []
  for (const ch of chapters) {
    const last = segments[segments.length - 1]
    if (last && last.bookKey === ch.bookKey && last.chapterEnd + 1 === ch.chapter) {
      last.chapterEnd = ch.chapter
    } else {
      segments.push({ bookKey: ch.bookKey, chapterStart: ch.chapter, chapterEnd: ch.chapter })
    }
  }
  return segments
}

/** Divide `total` em `days` fatias inteiras cuja soma bate exatamente com `total` (arredondamento cumulativo). */
function cumulativeSlice(dayIndex: number, total: number, days: number): number {
  const upTo = (n: number) => Math.round((n * total) / days)
  return upTo(dayIndex + 1) - upTo(dayIndex)
}

function buildDay(dia: number, startDate: Date, chapters: ChapterRef[]): ScheduleDay {
  const date = new Date(startDate)
  date.setDate(date.getDate() + (dia - 1))
  return {
    dia,
    data: date.toISOString().slice(0, 10),
    segmentos: groupSegments(chapters),
    concluido: false,
    concluidoEm: null,
  }
}

/**
 * Gera o cronograma completo distribuindo os 1189 capítulos da Bíblia pelos
 * dias do plano escolhido, sempre em capítulos inteiros.
 *
 * - Modo "sequencial": Antigo Testamento seguido do Novo Testamento, na ordem canônica.
 * - Modo "intercalado": Antigo e Novo Testamento avançam em paralelo, proporcionalmente,
 *   para que ambos terminem juntos ao final do plano.
 */
export function generateSchedule(config: PlanConfig): ScheduleDay[] {
  const totalDays = DURATION_DAYS[config.duracao]
  const startDate = new Date(`${config.dataInicio}T00:00:00`)
  const days: ScheduleDay[] = []

  if (config.modo === 'sequencial') {
    const combined = flatten([...OLD_TESTAMENT_BOOKS, ...NEW_TESTAMENT_BOOKS])
    let idx = 0
    for (let i = 0; i < totalDays; i++) {
      const target = cumulativeSlice(i, TOTAL_CHAPTERS, totalDays)
      const dayChapters = combined.slice(idx, idx + target)
      idx += target
      days.push(buildDay(i + 1, startDate, dayChapters))
    }
  } else {
    const otChapters = flatten(OLD_TESTAMENT_BOOKS)
    const ntChapters = flatten(NEW_TESTAMENT_BOOKS)
    let otIdx = 0
    let ntIdx = 0
    for (let i = 0; i < totalDays; i++) {
      const otTarget = cumulativeSlice(i, TOTAL_OT_CHAPTERS, totalDays)
      const ntTarget = cumulativeSlice(i, TOTAL_NT_CHAPTERS, totalDays)
      const otSlice = otChapters.slice(otIdx, otIdx + otTarget)
      const ntSlice = ntChapters.slice(ntIdx, ntIdx + ntTarget)
      otIdx += otTarget
      ntIdx += ntTarget
      days.push(buildDay(i + 1, startDate, [...otSlice, ...ntSlice]))
    }
  }

  return days
}
