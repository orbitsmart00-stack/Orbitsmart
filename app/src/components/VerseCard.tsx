import { useState } from 'react'
import { Comment } from '../types'

interface VerseCardProps {
  bookName: string
  chapter: number
  verse: number
  text: string
  explicacao: string
  isRead: boolean
  onToggleRead: () => void
  comment: Comment | undefined
  onSaveComment: (texto: string) => void
  onDeleteComment: () => void
}

export function VerseCard({
  bookName,
  chapter,
  verse,
  text,
  explicacao,
  isRead,
  onToggleRead,
  comment,
  onSaveComment,
  onDeleteComment,
}: VerseCardProps) {
  const [showStudy, setShowStudy] = useState(false)
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [draft, setDraft] = useState(comment?.texto ?? '')

  function handleSave() {
    const trimmed = draft.trim()
    if (!trimmed) return
    onSaveComment(trimmed)
    setShowCommentBox(false)
  }

  return (
    <div
      className={`rounded-xl border p-3 transition-colors ${
        isRead
          ? 'border-brand-200 bg-brand-50/60 dark:border-brand-800 dark:bg-brand-950/30'
          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggleRead}
          aria-label={isRead ? 'Marcar versículo como não lido' : 'Marcar versículo como lido'}
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
            isRead
              ? 'border-brand-500 bg-brand-500 text-white'
              : 'border-slate-300 text-transparent dark:border-slate-600'
          }`}
        >
          ✓
        </button>
        <p className="verse-text text-[15px] text-slate-800 dark:text-slate-200">
          <span className="mr-1 align-super text-xs font-semibold text-brand-500">{verse}</span>
          {text}
        </p>
      </div>

      <div className="mt-2 flex flex-wrap gap-3 pl-8 text-xs font-medium">
        <button
          type="button"
          onClick={() => setShowStudy((v) => !v)}
          className="text-brand-600 hover:underline dark:text-brand-300"
        >
          {showStudy ? 'Ocultar explicação' : '📖 Explicação / estudo'}
        </button>
        <button
          type="button"
          onClick={() => setShowCommentBox((v) => !v)}
          className="text-slate-500 hover:underline dark:text-slate-400"
        >
          {comment ? '✏️ Editar comentário' : '➕ Adicionar comentário'}
        </button>
      </div>

      {showStudy && (
        <div className="ml-8 mt-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            {bookName} {chapter}:{verse}
          </p>
          <p className="mt-1">{explicacao}</p>
        </div>
      )}

      {comment && !showCommentBox && (
        <div className="ml-8 mt-2 rounded-lg border border-dashed border-slate-300 p-3 text-sm dark:border-slate-700">
          <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{comment.texto}</p>
          <div className="mt-2 flex gap-3 text-xs">
            <button
              type="button"
              onClick={() => {
                setDraft(comment.texto)
                setShowCommentBox(true)
              }}
              className="text-brand-600 hover:underline dark:text-brand-300"
            >
              Editar
            </button>
            <button type="button" onClick={onDeleteComment} className="text-red-600 hover:underline">
              Excluir
            </button>
          </div>
        </div>
      )}

      {showCommentBox && (
        <div className="ml-8 mt-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Escreva sua reflexão ou experiência com este versículo..."
            rows={3}
            className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-800 focus:border-brand-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={!draft.trim()}
              className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setShowCommentBox(false)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
