import { useEffect, useState } from 'react'

export interface ApiVerse {
  verse: number
  text: string
}

export interface ChapterResult {
  verses: ApiVerse[]
}

const CACHE_PREFIX = 'bible-cache-v1:'

function cacheKey(apiSlug: string, chapter: number) {
  return `${CACHE_PREFIX}${apiSlug}:${chapter}`
}

function readCache(apiSlug: string, chapter: number): ChapterResult | null {
  try {
    const raw = localStorage.getItem(cacheKey(apiSlug, chapter))
    return raw ? (JSON.parse(raw) as ChapterResult) : null
  } catch {
    return null
  }
}

function writeCache(apiSlug: string, chapter: number, result: ChapterResult) {
  try {
    localStorage.setItem(cacheKey(apiSlug, chapter), JSON.stringify(result))
  } catch {
    // Cota de armazenamento excedida — segue sem cache.
  }
}

async function fetchChapterRaw(apiSlug: string, chapter: number): Promise<ChapterResult> {
  const ref = encodeURIComponent(`${apiSlug} ${chapter}`)
  const url = `https://bible-api.com/${ref}?translation=almeida`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Não foi possível carregar o texto (erro ${res.status}).`)
  }
  const data = await res.json()
  if (data?.error) {
    throw new Error(String(data.error))
  }
  const verses: ApiVerse[] = Array.isArray(data.verses)
    ? data.verses.map((v: { verse: number; text: string }) => ({
        verse: v.verse,
        text: String(v.text).replace(/\s+/g, ' ').trim(),
      }))
    : []
  return { verses }
}

/**
 * Busca o texto de um capítulo (com cache em localStorage). A tradução usada
 * é a Almeida (domínio público), servida pela API pública bible-api.com.
 * Como a busca acontece no navegador de quem usa o app, funciona normalmente
 * em qualquer ambiente com acesso à internet, mesmo que este sandbox de
 * desenvolvimento tenha o domínio bloqueado por política de rede.
 */
export async function getChapterText(apiSlug: string, chapter: number): Promise<ChapterResult> {
  const cached = readCache(apiSlug, chapter)
  if (cached) return cached
  const result = await fetchChapterRaw(apiSlug, chapter)
  writeCache(apiSlug, chapter, result)
  return result
}

type ChapterState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; verses: ApiVerse[] }

export function useChapterText(apiSlug: string, chapter: number) {
  const [state, setState] = useState<ChapterState>({ status: 'loading' })
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })
    getChapterText(apiSlug, chapter)
      .then((result) => {
        if (!cancelled) setState({ status: 'ready', verses: result.verses })
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setState({
            status: 'error',
            message: err.message || 'Não foi possível carregar o texto deste capítulo.',
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [apiSlug, chapter, reloadToken])

  return { ...state, retry: () => setReloadToken((t) => t + 1) }
}
