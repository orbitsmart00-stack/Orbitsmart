import { ReactNode } from 'react'
import { BottomNav } from './BottomNav'

interface LayoutProps {
  title: string
  children: ReactNode
  headerExtra?: ReactNode
}

export function Layout({ title, children, headerExtra }: LayoutProps) {
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-parchment-50/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <h1 className="text-lg font-bold text-brand-700 dark:text-brand-300">{title}</h1>
          {headerExtra}
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 py-4">{children}</main>
      <BottomNav />
    </div>
  )
}
