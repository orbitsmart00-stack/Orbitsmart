export type Testament = 'AT' | 'NT'

export interface BookDef {
  /** Chave estável usada internamente (slug em português, sem acentos) */
  key: string
  /** Nome exibido na interface */
  name: string
  testament: Testament
  chapters: number
  /** Identificador usado para consultar a API de texto bíblico (bible-api.com) */
  apiSlug: string
}

// 39 livros do Antigo Testamento — 929 capítulos
const OLD_TESTAMENT: BookDef[] = [
  { key: 'genesis', name: 'Gênesis', testament: 'AT', chapters: 50, apiSlug: 'genesis' },
  { key: 'exodo', name: 'Êxodo', testament: 'AT', chapters: 40, apiSlug: 'exodus' },
  { key: 'levitico', name: 'Levítico', testament: 'AT', chapters: 27, apiSlug: 'leviticus' },
  { key: 'numeros', name: 'Números', testament: 'AT', chapters: 36, apiSlug: 'numbers' },
  { key: 'deuteronomio', name: 'Deuteronômio', testament: 'AT', chapters: 34, apiSlug: 'deuteronomy' },
  { key: 'josue', name: 'Josué', testament: 'AT', chapters: 24, apiSlug: 'joshua' },
  { key: 'juizes', name: 'Juízes', testament: 'AT', chapters: 21, apiSlug: 'judges' },
  { key: 'rute', name: 'Rute', testament: 'AT', chapters: 4, apiSlug: 'ruth' },
  { key: '1samuel', name: '1 Samuel', testament: 'AT', chapters: 31, apiSlug: '1 samuel' },
  { key: '2samuel', name: '2 Samuel', testament: 'AT', chapters: 24, apiSlug: '2 samuel' },
  { key: '1reis', name: '1 Reis', testament: 'AT', chapters: 22, apiSlug: '1 kings' },
  { key: '2reis', name: '2 Reis', testament: 'AT', chapters: 25, apiSlug: '2 kings' },
  { key: '1cronicas', name: '1 Crônicas', testament: 'AT', chapters: 29, apiSlug: '1 chronicles' },
  { key: '2cronicas', name: '2 Crônicas', testament: 'AT', chapters: 36, apiSlug: '2 chronicles' },
  { key: 'esdras', name: 'Esdras', testament: 'AT', chapters: 10, apiSlug: 'ezra' },
  { key: 'neemias', name: 'Neemias', testament: 'AT', chapters: 13, apiSlug: 'nehemiah' },
  { key: 'ester', name: 'Ester', testament: 'AT', chapters: 10, apiSlug: 'esther' },
  { key: 'jo', name: 'Jó', testament: 'AT', chapters: 42, apiSlug: 'job' },
  { key: 'salmos', name: 'Salmos', testament: 'AT', chapters: 150, apiSlug: 'psalms' },
  { key: 'proverbios', name: 'Provérbios', testament: 'AT', chapters: 31, apiSlug: 'proverbs' },
  { key: 'eclesiastes', name: 'Eclesiastes', testament: 'AT', chapters: 12, apiSlug: 'ecclesiastes' },
  { key: 'canticos', name: 'Cânticos', testament: 'AT', chapters: 8, apiSlug: 'song of solomon' },
  { key: 'isaias', name: 'Isaías', testament: 'AT', chapters: 66, apiSlug: 'isaiah' },
  { key: 'jeremias', name: 'Jeremias', testament: 'AT', chapters: 52, apiSlug: 'jeremiah' },
  { key: 'lamentacoes', name: 'Lamentações', testament: 'AT', chapters: 5, apiSlug: 'lamentations' },
  { key: 'ezequiel', name: 'Ezequiel', testament: 'AT', chapters: 48, apiSlug: 'ezekiel' },
  { key: 'daniel', name: 'Daniel', testament: 'AT', chapters: 12, apiSlug: 'daniel' },
  { key: 'oseias', name: 'Oséias', testament: 'AT', chapters: 14, apiSlug: 'hosea' },
  { key: 'joel', name: 'Joel', testament: 'AT', chapters: 3, apiSlug: 'joel' },
  { key: 'amos', name: 'Amós', testament: 'AT', chapters: 9, apiSlug: 'amos' },
  { key: 'obadias', name: 'Obadias', testament: 'AT', chapters: 1, apiSlug: 'obadiah' },
  { key: 'jonas', name: 'Jonas', testament: 'AT', chapters: 4, apiSlug: 'jonah' },
  { key: 'miqueias', name: 'Miquéias', testament: 'AT', chapters: 7, apiSlug: 'micah' },
  { key: 'naum', name: 'Naum', testament: 'AT', chapters: 3, apiSlug: 'nahum' },
  { key: 'habacuque', name: 'Habacuque', testament: 'AT', chapters: 3, apiSlug: 'habakkuk' },
  { key: 'sofonias', name: 'Sofonias', testament: 'AT', chapters: 3, apiSlug: 'zephaniah' },
  { key: 'ageu', name: 'Ageu', testament: 'AT', chapters: 2, apiSlug: 'haggai' },
  { key: 'zacarias', name: 'Zacarias', testament: 'AT', chapters: 14, apiSlug: 'zechariah' },
  { key: 'malaquias', name: 'Malaquias', testament: 'AT', chapters: 4, apiSlug: 'malachi' },
]

// 27 livros do Novo Testamento — 260 capítulos
const NEW_TESTAMENT: BookDef[] = [
  { key: 'mateus', name: 'Mateus', testament: 'NT', chapters: 28, apiSlug: 'matthew' },
  { key: 'marcos', name: 'Marcos', testament: 'NT', chapters: 16, apiSlug: 'mark' },
  { key: 'lucas', name: 'Lucas', testament: 'NT', chapters: 24, apiSlug: 'luke' },
  { key: 'joao', name: 'João', testament: 'NT', chapters: 21, apiSlug: 'john' },
  { key: 'atos', name: 'Atos', testament: 'NT', chapters: 28, apiSlug: 'acts' },
  { key: 'romanos', name: 'Romanos', testament: 'NT', chapters: 16, apiSlug: 'romans' },
  { key: '1corintios', name: '1 Coríntios', testament: 'NT', chapters: 16, apiSlug: '1 corinthians' },
  { key: '2corintios', name: '2 Coríntios', testament: 'NT', chapters: 13, apiSlug: '2 corinthians' },
  { key: 'galatas', name: 'Gálatas', testament: 'NT', chapters: 6, apiSlug: 'galatians' },
  { key: 'efesios', name: 'Efésios', testament: 'NT', chapters: 6, apiSlug: 'ephesians' },
  { key: 'filipenses', name: 'Filipenses', testament: 'NT', chapters: 4, apiSlug: 'philippians' },
  { key: 'colossenses', name: 'Colossenses', testament: 'NT', chapters: 4, apiSlug: 'colossians' },
  { key: '1tessalonicenses', name: '1 Tessalonicenses', testament: 'NT', chapters: 5, apiSlug: '1 thessalonians' },
  { key: '2tessalonicenses', name: '2 Tessalonicenses', testament: 'NT', chapters: 3, apiSlug: '2 thessalonians' },
  { key: '1timoteo', name: '1 Timóteo', testament: 'NT', chapters: 6, apiSlug: '1 timothy' },
  { key: '2timoteo', name: '2 Timóteo', testament: 'NT', chapters: 4, apiSlug: '2 timothy' },
  { key: 'tito', name: 'Tito', testament: 'NT', chapters: 3, apiSlug: 'titus' },
  { key: 'filemom', name: 'Filemom', testament: 'NT', chapters: 1, apiSlug: 'philemon' },
  { key: 'hebreus', name: 'Hebreus', testament: 'NT', chapters: 13, apiSlug: 'hebrews' },
  { key: 'tiago', name: 'Tiago', testament: 'NT', chapters: 5, apiSlug: 'james' },
  { key: '1pedro', name: '1 Pedro', testament: 'NT', chapters: 5, apiSlug: '1 peter' },
  { key: '2pedro', name: '2 Pedro', testament: 'NT', chapters: 3, apiSlug: '2 peter' },
  { key: '1joao', name: '1 João', testament: 'NT', chapters: 5, apiSlug: '1 john' },
  { key: '2joao', name: '2 João', testament: 'NT', chapters: 1, apiSlug: '2 john' },
  { key: '3joao', name: '3 João', testament: 'NT', chapters: 1, apiSlug: '3 john' },
  { key: 'judas', name: 'Judas', testament: 'NT', chapters: 1, apiSlug: 'jude' },
  { key: 'apocalipse', name: 'Apocalipse', testament: 'NT', chapters: 22, apiSlug: 'revelation' },
]

export const BOOKS: BookDef[] = [...OLD_TESTAMENT, ...NEW_TESTAMENT]

export const BOOKS_BY_KEY: Record<string, BookDef> = Object.fromEntries(
  BOOKS.map((b) => [b.key, b]),
)

export const OLD_TESTAMENT_BOOKS = OLD_TESTAMENT
export const NEW_TESTAMENT_BOOKS = NEW_TESTAMENT

export const TOTAL_CHAPTERS = BOOKS.reduce((sum, b) => sum + b.chapters, 0) // 1189
export const TOTAL_OT_CHAPTERS = OLD_TESTAMENT.reduce((sum, b) => sum + b.chapters, 0) // 929
export const TOTAL_NT_CHAPTERS = NEW_TESTAMENT.reduce((sum, b) => sum + b.chapters, 0) // 260
