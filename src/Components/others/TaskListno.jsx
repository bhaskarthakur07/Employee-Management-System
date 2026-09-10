const TaskListno = ({ data, activeFilter, onSelectFilter }) => {
  const counts = data?.taskCounts || { newTask: 0, active: 0, completed: 0, failed: 0 }

  const cards = [
    {
      id: 'newTask',
      label: 'New Tasks',
      sublabel: 'Pending acceptance',
      count: counts.newTask,
      color: 'blue',
      borderColor: 'border-blue-500/30',
      activeClass: 'ring-2 ring-blue-500 bg-blue-500/10',
      textColor: 'text-blue-400',
      badgeBg: 'bg-blue-500/20',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'active',
      label: 'Accepted / Active',
      sublabel: 'Currently in progress',
      count: counts.active,
      color: 'amber',
      borderColor: 'border-amber-500/30',
      activeClass: 'ring-2 ring-amber-500 bg-amber-500/10',
      textColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/20',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'completed',
      label: 'Completed Tasks',
      sublabel: 'Successfully finished',
      count: counts.completed,
      color: 'emerald',
      borderColor: 'border-emerald-500/30',
      activeClass: 'ring-2 ring-emerald-500 bg-emerald-500/10',
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'failed',
      label: 'Failed Tasks',
      sublabel: 'Blocked or unresolved',
      count: counts.failed,
      color: 'rose',
      borderColor: 'border-rose-500/30',
      activeClass: 'ring-2 ring-rose-500 bg-rose-500/10',
      textColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/20',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const isSelected = activeFilter === card.id
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectFilter && onSelectFilter(isSelected ? 'all' : card.id)}
            className={`group flex cursor-pointer flex-col justify-between rounded-2xl border ${card.borderColor} bg-zinc-900/90 p-5 text-left shadow-lg backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-xl ${
              isSelected ? card.activeClass : 'hover:bg-zinc-800/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-xl p-2.5 ${card.badgeBg} ${card.textColor}`}>
                {card.icon}
              </span>
              <span className={`text-3xl font-extrabold tracking-tight ${card.textColor}`}>
                {card.count}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-bold text-white group-hover:text-zinc-100">
                {card.label}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-400">{card.sublabel}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default TaskListno