const FailedTask = ({ data, employeeId, onUpdateStatus }) => {
  return (
    <div className="flex h-full min-w-[320px] max-w-[360px] flex-shrink-0 flex-col justify-between rounded-2xl border border-rose-500/30 bg-zinc-900/95 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-rose-500/50 hover:shadow-rose-500/5">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose-400">
            {data?.category || 'General'}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-zinc-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {data?.taskDate}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Failed / Blocked</span>
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-tight text-white line-clamp-2">
          {data?.taskTitle}
        </h3>
        
        <p className="mt-2 text-sm leading-relaxed text-zinc-400 line-clamp-4">
          {data?.taskDescription}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Marked Failed
        </span>

        <button
          type="button"
          onClick={() => onUpdateStatus && onUpdateStatus(employeeId, data.id, 'active')}
          className="text-xs text-amber-400 transition hover:text-amber-300"
          title="Retry and move back to active"
        >
          Retry Task →
        </button>
      </div>
    </div>
  )
}

export default FailedTask