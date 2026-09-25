import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConfirmModal } from '../components/ConfirmModal'
import { Layout } from '../components/Layout'
import { BOOKS_BY_KEY } from '../data/books'
import { deleteComment, upsertComment, useAppState } from '../lib/store'
import { ScheduleDay } from '../types'

function findDia(schedule: ScheduleDay[], bookKey: string, chapter: number): number | undefined {
  return schedule.find((d) =>
    d.segmentos.some(
      (s) => s.bookKey === bookKey && chapter >= s.chapterStart && chapter <= s.chapterEnd,
    ),
  )?.dia
}

function formatarDataHora(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function MyComments() {
  const appState = useAppState()
  const [busca, setBusca] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [paraExcluir, setParaExcluir] = useState<string | null>(null)

  const comentariosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return appState.comments.filter((c) => {
      if (!termo) return true
      const nomeLivro = BOOKS_BY_KEY[c.bookKey]?.name.toLowerCase() ?? ''
      return nomeLivro.includes(termo) || c.texto.toLowerCase().includes(termo)
    })
  }, [appState.comments, busca])

  return (
    <Layout title="Meus comentários">
      <input
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por livro ou palavra-chave..."
        className="mb-4 w-full rounded-xl border border-slate-300 p-3 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      {comentariosFiltrados.length === 0 && (
        <p className="py-10 text-center text-sm text-slate-500">
          {appState.comments.length === 0
            ? 'Você ainda não escreveu nenhum comentário. Abra um dia do cronograma e registre suas reflexões em qualquer versículo.'
            : 'Nenhum comentário encontrado para essa busca.'}
        </p>
      )}

      <div className="space-y-3">
        {comentariosFiltrados.map((c) => {
          const bookName = BOOKS_BY_KEY[c.bookKey]?.name ?? c.bookKey
          const dia = findDia(appState.schedule, c.bookKey, c.chapter)
          const emEdicao = editandoId === c.id
          return (
            <div
              key={c.id}
              className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                {dia ? (
                  <Link
                    to={`/dia/${dia}`}
                    className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-300"
                  >
                    {bookName} {c.chapter}:{c.verse}
                  </Link>
                ) : (
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {bookName} {c.chapter}:{c.verse}
                  </span>
                )}
                <span className="text-xs text-slate-400">{formatarDataHora(c.atualizadoEm)}</span>
              </div>

              {emEdicao ? (
                <div className="mt-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (draft.trim()) upsertComment(c.bookKey, c.chapter, c.verse, draft.trim(), c.id)
                        setEditandoId(null)
                      }}
                      className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditandoId(null)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs dark:border-slate-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                    {c.texto}
                  </p>
                  <div className="mt-2 flex gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setEditandoId(c.id)
                        setDraft(c.texto)
                      }}
                      className="text-brand-600 hover:underline dark:text-brand-300"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => setParaExcluir(c.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      <ConfirmModal
        open={paraExcluir !== null}
        title="Excluir comentário?"
        description="Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        danger
        onCancel={() => setParaExcluir(null)}
        onConfirm={() => {
          if (paraExcluir) deleteComment(paraExcluir)
          setParaExcluir(null)
        }}
      />
    </Layout>
  )
}
