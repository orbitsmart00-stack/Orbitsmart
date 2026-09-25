import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmModal } from '../components/ConfirmModal'
import { Layout } from '../components/Layout'
import { DURATION_LABELS } from '../lib/planGenerator'
import { downloadExport, resetAll, resetProgressOnly, setTheme, useAppState } from '../lib/store'
import { Settings as SettingsType } from '../types'

const THEME_OPTIONS: { value: SettingsType['theme']; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'system', label: 'Automático' },
]

export function Settings() {
  const appState = useAppState()
  const navigate = useNavigate()
  const [confirmProgresso, setConfirmProgresso] = useState(false)
  const [confirmTudo, setConfirmTudo] = useState(false)

  return (
    <Layout title="Ajustes">
      <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Plano de leitura
        </h2>
        {appState.plan ? (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {DURATION_LABELS[appState.plan.duracao]} ·{' '}
            {appState.plan.modo === 'intercalado' ? 'Intercalado AT/NT' : 'Sequencial'} · início em{' '}
            {appState.plan.dataInicio.split('-').reverse().join('/')}
          </p>
        ) : (
          <p className="mt-1 text-sm text-slate-500">Nenhum plano ativo.</p>
        )}
        <button
          type="button"
          onClick={() => navigate('/onboarding')}
          className="mt-3 w-full rounded-lg border border-brand-300 py-2 text-sm font-semibold text-brand-700 dark:border-brand-700 dark:text-brand-300"
        >
          Trocar plano
        </button>
      </section>

      <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Aparência</h2>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTheme(opt.value)}
              className={`rounded-lg border px-2 py-2 text-xs font-medium ${
                appState.settings.theme === opt.value
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Backup dos dados
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Baixe um arquivo com seu progresso e comentários, para guardar ou transferir de
          dispositivo.
        </p>
        <button
          type="button"
          onClick={downloadExport}
          className="mt-3 w-full rounded-lg border border-slate-300 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300"
        >
          Exportar meus dados (.json)
        </button>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900 dark:bg-red-950/20">
        <h2 className="text-sm font-semibold text-red-700 dark:text-red-400">Zona de risco</h2>

        <button
          type="button"
          onClick={() => setConfirmProgresso(true)}
          className="mt-3 w-full rounded-lg border border-red-300 py-2 text-sm font-semibold text-red-700 dark:border-red-800 dark:text-red-400"
        >
          Zerar apenas o progresso
        </button>
        <p className="mt-1 text-xs text-red-600/80 dark:text-red-400/70">
          Desmarca todos os dias e versículos lidos. Seus comentários são mantidos.
        </p>

        <button
          type="button"
          onClick={() => setConfirmTudo(true)}
          className="mt-4 w-full rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Zerar tudo (progresso, comentários e plano)
        </button>
        <p className="mt-1 text-xs text-red-600/80 dark:text-red-400/70">
          Apaga todos os dados do app e volta para a escolha do plano. Esta ação não pode ser
          desfeita.
        </p>
      </section>

      <ConfirmModal
        open={confirmProgresso}
        title="Zerar progresso de leitura?"
        description="Todos os dias e versículos marcados como lidos voltarão a ficar pendentes. Seus comentários pessoais não serão apagados."
        confirmLabel="Zerar progresso"
        danger
        onCancel={() => setConfirmProgresso(false)}
        onConfirm={() => {
          resetProgressOnly()
          setConfirmProgresso(false)
        }}
      />

      <ConfirmModal
        open={confirmTudo}
        title="Apagar todos os dados?"
        description="Isso apagará permanentemente seu plano, progresso e todos os comentários. Esta ação não pode ser desfeita."
        confirmLabel="Apagar tudo"
        danger
        extraAction={{ label: '⬇️ Exportar backup antes de apagar', onClick: downloadExport }}
        onCancel={() => setConfirmTudo(false)}
        onConfirm={() => {
          resetAll()
          setConfirmTudo(false)
          navigate('/onboarding', { replace: true })
        }}
      />
    </Layout>
  )
}
