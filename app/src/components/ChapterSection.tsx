import { BOOK_INTROS } from '../data/bookIntros'
import { BOOKS_BY_KEY } from '../data/books'
import { useChapterText } from '../lib/bibleApi'
import { getExplicacao } from '../lib/explicacao'
import {
  deleteComment,
  isVerseRead,
  toggleVerseRead,
  upsertComment,
  useAppState,
} from '../lib/store'
import { VerseCard } from './VerseCard'

interface ChapterSectionProps {
  bookKey: string
  bookName: string
  chapter: number
}

export function ChapterSection({ bookKey, bookName, chapter }: ChapterSectionProps) {
  const appState = useAppState()
  const chapterState = useChapterText(BOOKS_BY_KEY[bookKey].apiSlug, chapter)
  const intro = BOOK_INTROS[bookKey]

  return (
    <section className="mb-5">
      <h2 className="mb-2 text-base font-bold text-brand-700 dark:text-brand-300">
        {bookName} {chapter}
      </h2>

      {chapterState.status === 'loading' && (
        <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          Carregando texto do capítulo...
        </p>
      )}

      {chapterState.status === 'error' && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/30">
          <p className="text-amber-800 dark:text-amber-300">
            Não foi possível carregar o texto agora ({chapterState.message}). Verifique sua
            conexão com a internet.
          </p>
          <button
            type="button"
            onClick={chapterState.retry}
            className="mt-2 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Tentar novamente
          </button>
          {intro && (
            <div className="mt-3 border-t border-amber-200 pt-2 text-amber-900 dark:border-amber-900 dark:text-amber-200">
              <p className="font-semibold">Contexto de {bookName} (enquanto isso):</p>
              <p className="mt-1">{intro.contexto}</p>
            </div>
          )}
        </div>
      )}

      {chapterState.status === 'ready' && (
        <div className="space-y-2">
          {chapterState.verses.map((v) => {
            const comentario = appState.comments.find(
              (c) => c.bookKey === bookKey && c.chapter === chapter && c.verse === v.verse,
            )
            return (
              <VerseCard
                key={v.verse}
                bookName={bookName}
                chapter={chapter}
                verse={v.verse}
                text={v.text}
                explicacao={getExplicacao(bookKey, chapter, v.verse)}
                isRead={isVerseRead(appState, bookKey, chapter, v.verse)}
                onToggleRead={() => toggleVerseRead(bookKey, chapter, v.verse)}
                comment={comentario}
                onSaveComment={(texto) =>
                  upsertComment(bookKey, chapter, v.verse, texto, comentario?.id)
                }
                onDeleteComment={() => comentario && deleteComment(comentario.id)}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
