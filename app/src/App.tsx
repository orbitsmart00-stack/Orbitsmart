import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DayDetail } from './pages/DayDetail'
import { Home } from './pages/Home'
import { MyComments } from './pages/MyComments'
import { Onboarding } from './pages/Onboarding'
import { Settings } from './pages/Settings'
import { useAppState } from './lib/store'

function useThemeEffect() {
  const appState = useAppState()

  useEffect(() => {
    const root = document.documentElement
    const apply = (dark: boolean) => root.classList.toggle('dark', dark)

    if (appState.settings.theme === 'dark') {
      apply(true)
      return
    }
    if (appState.settings.theme === 'light') {
      apply(false)
      return
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    apply(mq.matches)
    const listener = (e: MediaQueryListEvent) => apply(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [appState.settings.theme])
}

export default function App() {
  useThemeEffect()
  const appState = useAppState()

  return (
    <Routes>
      <Route
        path="/onboarding"
        element={<Onboarding />}
      />
      <Route
        path="/"
        element={appState.plan ? <Home /> : <Navigate to="/onboarding" replace />}
      />
      <Route path="/dia/:dia" element={<DayDetail />} />
      <Route path="/comentarios" element={<MyComments />} />
      <Route path="/config" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
