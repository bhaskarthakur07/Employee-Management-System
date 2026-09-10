const NewTask = ({ data, employeeId, onUpdateStatus }) => {
  return (
    <div className="flex h-full min-w-[320px] max-w-[360px] flex-shrink-0 flex-col justify-between rounded-2xl border border-blue-500/30 bg-zinc-900/95 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-blue-500/50 hover:shadow-blue-500/5">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            {data.category || 'General'}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-zinc-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {data.taskDate}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
          <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping" />
          <span>New Assignment</span>
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-tight text-white line-clamp-2">
          {data.taskTitle}
        </h3>
        
        <p className="mt-2 text-sm leading-relaxed text-zinc-400 line-clamp-4">
          {data.taskDescription}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 border-t border-zinc-800 pt-4">
        <button
          type="button"
          onClick={() => onUpdateStatus && onUpdateStatus(employeeId, data.id, 'active')}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-500 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Accept Task</span>
        </button>

        <button
          type="button"
          onClick={() => onUpdateStatus && onUpdateStatus(employeeId, data.id, 'failed')}
          className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/20 active:scale-[0.98]"
          title="Reject task"
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export default NewTask