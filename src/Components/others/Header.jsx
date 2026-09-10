import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const Header = ({ changeUser, data }) => {
  const auth = useContext(AuthContext)

  const displayName = data?.firstName || (data?.role === 'admin' ? 'Admin' : 'Admin')
  const userRole = data?.role === 'employee' ? `Employee • ${data?.department || 'Operations'}` : 'Administrator'

  const handleLogout = () => {
    if (auth?.logout) {
      auth.logout()
    }
    if (typeof changeUser === 'function') {
      changeUser(null)
    }
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="flex flex-col gap-4 border-b border-zinc-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-400">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{userRole}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">{currentDate}</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Hello, <span className="text-emerald-400">{displayName}</span> 👋
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {data?.role === 'admin' && auth?.resetData && (
          <button
            onClick={() => {
              if (window.confirm('Reset all task and employee data back to original seed demo values?')) {
                auth.resetData()
              }
            }}
            title="Reset to default seed data"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset Demo Data</span>
          </button>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-500 active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </header>
  )
}

export default Header