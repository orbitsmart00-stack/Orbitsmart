import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { ProgressBar } from '../components/ProgressBar'
import { BOOKS_BY_KEY } from '../data/books'
import { getProgressSummary, markDayCompleted, useAppState } from '../lib/store'
import { ScheduleDay } from '../types'

type Filtro = 'todos' | 'pendentes' | 'concluidos' | 'atrasados'

function isAtrasado(dia: ScheduleDay) {
  return !dia.concluido && dia.data < new Date().toISOString().slice(0, 10)
}

function segmentosLabel(dia: ScheduleDay) {
  return dia.segmentos
    .map((s) => {
      const nome = BOOKS_BY_KEY[s.bookKey]?.name ?? s.bookKey
      return s.chapterStart === s.chapterEnd
        ? `${nome} ${s.chapterStart}`
        : `${nome} ${s.chapterStart}-${s.chapterEnd}`
    })
    .join(' · ')
}

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

export function Home() {
  const appState = useAppState()
  const [filtro, setFiltro] = useState<Filtro>('todos')

  const progresso = getProgressSummary(appState)

  const diasFiltrados = useMemo(() => {
    switch (filtro) {
      case 'pendentes':
        return appState.schedule.filter((d) => !d.concluido && !isAtrasado(d))
      case 'concluidos':
        return appState.schedule.filter((d) => d.concluido)
      case 'atrasados':
        return appState.schedule.filter(isAtrasado)
      default:
        return appState.schedule
    }
  }, [appState.schedule, filtro])

  if (!appState.plan) {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <Layout title="Cronograma Bíblico">
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <ProgressBar percentual={progresso.percentual} label="Progresso geral" />
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-slate-600 dark:text-slate-400">
          <div>
            <div className="text-base font-bold text-brand-600 dark:text-brand-300">
              {progresso.diasConcluidos}/{progresso.totalDias}
            </div>
            dias lidos
          </div>
          <div>
            <div className="text-base font-bold text-brand-600 dark:text-brand-300">
              {progresso.streak}
            </div>
            dias seguidos
          </div>
          <div>
            <div className="text-base font-bold text-brand-600 dark:text-brand-300">
              {appState.readVerses.length}
            </div>
            versículos lidos
          </div>
        </div>
      </div>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {(['todos', 'pendentes', 'concluidos', 'atrasados'] as Filtro[]).map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize ${
              filtro === f
                ? 'bg-brand-500 text-white'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {diasFiltrados.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">Nenhum dia nesta categoria.</p>
        )}
        {diasFiltrados.map((dia) => (
          <div
            key={dia.dia}
            className={`flex items-center gap-3 rounded-xl border p-3 ${
              dia.concluido
                ? 'border-brand-200 bg-brand-50/60 dark:border-brand-800 dark:bg-brand-950/20'
                : isAtrasado(dia)
                  ? 'border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/20'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <button
              type="button"
              onClick={() => markDayCompleted(dia.dia, !dia.concluido)}
              aria-label={dia.concluido ? 'Desmarcar dia' : 'Marcar dia como lido'}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm ${
                dia.concluido
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-slate-300 text-transparent dark:border-slate-600'
              }`}
            >
              ✓
            </button>
            <Link to={`/dia/${dia.dia}`} className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Dia {dia.dia}/{progresso.totalDias}
                </span>
                <span className="text-xs text-slate-400">{formatarData(dia.data)}</span>
              </div>
              <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                {segmentosLabel(dia)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}
