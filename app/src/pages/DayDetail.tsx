import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ChapterSection } from '../components/ChapterSection'
import { Layout } from '../components/Layout'
import { BOOKS_BY_KEY } from '../data/books'
import { markDayCompleted, useAppState } from '../lib/store'

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

export function DayDetail() {
  const { dia: diaParam } = useParams()
  const appState = useAppState()
  const navigate = useNavigate()

  if (!appState.plan) return <Navigate to="/onboarding" replace />

  const diaNumero = Number(diaParam)
  const dia = appState.schedule.find((d) => d.dia === diaNumero)

  if (!dia) return <Navigate to="/" replace />

  const chapters: { bookKey: string; chapter: number }[] = []
  for (const seg of dia.segmentos) {
    for (let c = seg.chapterStart; c <= seg.chapterEnd; c++) {
      chapters.push({ bookKey: seg.bookKey, chapter: c })
    }
  }

  return (
    <Layout
      title={`Dia ${dia.dia}`}
      headerExtra={
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-sm text-brand-600 dark:text-brand-300"
        >
          Voltar
        </button>
      }
    >
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {formatarData(dia.data)} · Dia {dia.dia} de {appState.schedule.length}
      </p>

      {chapters.map(({ bookKey, chapter }) => (
        <ChapterSection
          key={`${bookKey}-${chapter}`}
          bookKey={bookKey}
          bookName={BOOKS_BY_KEY[bookKey].name}
          chapter={chapter}
        />
      ))}

      <button
        type="button"
        onClick={() => markDayCompleted(dia.dia, !dia.concluido)}
        className={`mt-2 w-full rounded-xl py-3 text-center font-semibold ${
          dia.concluido
            ? 'border border-brand-300 text-brand-700 dark:border-brand-700 dark:text-brand-300'
            : 'bg-brand-500 text-white hover:bg-brand-600'
        }`}
      >
        {dia.concluido ? '✓ Dia marcado como lido — desfazer' : 'Marcar dia inteiro como lido'}
      </button>
    </Layout>
  )
}
