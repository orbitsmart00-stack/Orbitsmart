import { BOOK_INTROS } from '../data/bookIntros'
import { VERSE_NOTES, verseNoteKey } from '../data/verseNotes'

export function getExplicacao(bookKey: string, chapter: number, verse: number): string {
  const especifica = VERSE_NOTES[verseNoteKey(bookKey, chapter, verse)]
  if (especifica) return especifica

  const intro = BOOK_INTROS[bookKey]
  if (!intro) {
    return 'Estudo detalhado deste versículo em construção. Use este espaço para registrar suas próprias observações.'
  }
  return `Contexto do livro: ${intro.contexto} Autoria: ${intro.autor} Tema central: ${intro.tema}`
}
