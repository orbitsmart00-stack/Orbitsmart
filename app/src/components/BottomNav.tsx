import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Cronograma', icon: '📅' },
  { to: '/comentarios', label: 'Comentários', icon: '📝' },
  { to: '/config', label: 'Ajustes', icon: '⚙️' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-lg justify-around">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium ${
                isActive
                  ? 'text-brand-600 dark:text-brand-300'
                  : 'text-slate-500 dark:text-slate-500'
              }`
            }
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
