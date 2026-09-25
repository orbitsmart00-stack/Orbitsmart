interface ProgressBarProps {
  percentual: number
  label?: string
}

export function ProgressBar({ percentual, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentual))
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
