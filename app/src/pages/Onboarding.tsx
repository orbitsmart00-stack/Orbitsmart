import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DURATION_DAYS, DURATION_LABELS, generateSchedule } from '../lib/planGenerator'
import { setPlanAndSchedule, useAppState } from '../lib/store'
import { PlanDuration, PlanMode } from '../types'
import { TOTAL_CHAPTERS } from '../data/books'

const DURATIONS: PlanDuration[] = ['3m', '6m', '1a']

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

export function Onboarding() {
  const appState = useAppState()
  const navigate = useNavigate()
  const isChangingPlan = appState.plan !== null

  const [duracao, setDuracao] = useState<PlanDuration>(appState.plan?.duracao ?? '1a')
  const [modo, setModo] = useState<PlanMode>(appState.plan?.modo ?? 'intercalado')
  const [dataInicio, setDataInicio] = useState(appState.plan?.dataInicio ?? todayIso())

  function handleStart() {
    const schedule = generateSchedule({ duracao, modo, dataInicio })
    setPlanAndSchedule({ duracao, modo, dataInicio }, schedule)
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-5 py-10">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-2xl font-bold text-brand-700 dark:text-brand-300">
          {isChangingPlan ? 'Trocar plano de leitura' : 'Cronograma Bíblico'}
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          A Bíblia tem 66 livros e {TOTAL_CHAPTERS} capítulos. Escolha em quanto tempo você quer
          lê-la e como organizar a leitura.
        </p>

        {isChangingPlan && (
          <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Trocar de plano gera um novo cronograma e reinicia as marcações de leitura dos dias.
            Seus comentários pessoais não serão apagados.
          </p>
        )}

        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Duração</p>
          <div className="grid grid-cols-3 gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuracao(d)}
                className={`rounded-xl border px-3 py-3 text-center text-sm font-semibold transition-colors ${
                  duracao === d
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-slate-300 text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                {DURATION_LABELS[d]}
                <div className="mt-0.5 text-[11px] font-normal opacity-80">
                  ~{(TOTAL_CHAPTERS / DURATION_DAYS[d]).toFixed(1)} cap./dia
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Ordem de leitura
          </p>
          <div className="space-y-2">
            <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-slate-300 p-3 text-sm dark:border-slate-700">
              <input
                type="radio"
                name="modo"
                checked={modo === 'intercalado'}
                onChange={() => setModo('intercalado')}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Intercalado (recomendado)
                </span>
                <br />
                <span className="text-slate-500 dark:text-slate-400">
                  Antigo e Novo Testamento avançam juntos, proporcionalmente.
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-slate-300 p-3 text-sm dark:border-slate-700">
              <input
                type="radio"
                name="modo"
                checked={modo === 'sequencial'}
                onChange={() => setModo('sequencial')}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Sequencial clássico
                </span>
                <br />
                <span className="text-slate-500 dark:text-slate-400">
                  Do Gênesis ao Apocalipse, na ordem tradicional.
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Data de início
          </label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="mt-7 w-full rounded-xl bg-brand-500 py-3 text-center font-semibold text-white shadow hover:bg-brand-600"
        >
          {isChangingPlan ? 'Gerar novo cronograma' : 'Começar a leitura'}
        </button>
      </div>
    </div>
  )
}
