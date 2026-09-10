import { useContext, useState, useMemo } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const AllTask = () => {
  const auth = useContext(AuthContext)
  const employees = useMemo(() => auth?.userData || [], [auth?.userData])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)

  // Overall company-wide task statistics
  const stats = useMemo(() => {
    return employees.reduce(
      (acc, emp) => {
        acc.totalEmployees += 1
        acc.newTasks += emp.taskCounts?.newTask || 0
        acc.activeTasks += emp.taskCounts?.active || 0
        acc.completedTasks += emp.taskCounts?.completed || 0
        acc.failedTasks += emp.taskCounts?.failed || 0
        acc.totalTasks += (emp.tasks || []).length
        return acc
      },
      { totalEmployees: 0, newTasks: 0, activeTasks: 0, completedTasks: 0, failedTasks: 0, totalTasks: 0 }
    )
  }, [employees])

  // Filtered employees list
  const filteredEmployees = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return employees
    return employees.filter(
      (e) =>
        e.firstName?.toLowerCase().includes(q) ||
        e.lastName?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.department?.toLowerCase().includes(q)
    )
  }, [employees, searchQuery])

  const selectedEmployee = useMemo(() => {
    return employees.find((e) => e.id === selectedEmployeeId)
  }, [employees, selectedEmployeeId])

  const handleDeleteTask = (employeeId, taskId) => {
    if (window.confirm('Are you sure you want to remove this task?')) {
      if (auth?.deleteTask) {
        auth.deleteTask(employeeId, taskId)
      }
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl backdrop-blur-sm sm:p-8">
      {/* Top Section: Overview stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Total Staff</p>
          <p className="mt-1 text-2xl font-bold text-white">{stats.totalEmployees}</p>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-400">New Queue</p>
          <p className="mt-1 text-2xl font-bold text-blue-400">{stats.newTasks}</p>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-400">In Progress</p>
          <p className="mt-1 text-2xl font-bold text-amber-400">{stats.activeTasks}</p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">Completed</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">{stats.completedTasks}</p>
        </div>
      </div>

      {/* Header and Search Filter */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Team Task Roster</h2>
          <p className="text-sm text-zinc-400">Overview of all employees and their workload breakdown.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/60 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500"
          />
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-800/60 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="px-5 py-3.5">Employee</th>
              <th className="px-4 py-3.5 text-center">New</th>
              <th className="px-4 py-3.5 text-center">Active</th>
              <th className="px-4 py-3.5 text-center">Completed</th>
              <th className="px-4 py-3.5 text-center">Failed</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-900/40">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-zinc-500">
                  No matching employees found.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => {
                const isExpanded = selectedEmployeeId === employee.id
                return (
                  <tr
                    key={employee.id}
                    className={`transition-colors hover:bg-zinc-800/40 ${isExpanded ? 'bg-zinc-800/50' : ''}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-400">
                          {employee.firstName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {employee.firstName} {employee.lastName || ''}
                          </p>
                          <p className="text-xs text-zinc-400">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                        {employee.taskCounts?.newTask || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400">
                        {employee.taskCounts?.active || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                        {employee.taskCounts?.completed || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center rounded-lg bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-400">
                        {employee.taskCounts?.failed || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedEmployeeId(isExpanded ? null : employee.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          isExpanded
                            ? 'bg-zinc-700 text-white'
                            : 'border border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                        }`}
                      >
                        {isExpanded ? 'Hide Tasks' : `View Tasks (${employee.tasks?.length || 0})`}
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Expanded Task Details Modal / Drawer */}
      {selectedEmployee && (
        <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-800/80 p-5">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-700 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">
                Assigned Tasks for {selectedEmployee.firstName} {selectedEmployee.lastName || ''}
              </h3>
              <p className="text-xs text-zinc-400">{selectedEmployee.email} • {selectedEmployee.department || 'Engineering'}</p>
            </div>
            <button
              onClick={() => setSelectedEmployeeId(null)}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              ✕ Close
            </button>
          </div>

          {!selectedEmployee.tasks || selectedEmployee.tasks.length === 0 ? (
            <p className="py-4 text-center text-xs text-zinc-500">No tasks assigned to this employee yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedEmployee.tasks.map((task) => {
                let statusLabel = 'New'
                let badgeClass = 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                if (task.active) {
                  statusLabel = 'In Progress'
                  badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                } else if (task.completed) {
                  statusLabel = 'Completed'
                  badgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                } else if (task.failed) {
                  statusLabel = 'Failed'
                  badgeClass = 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }

                return (
                  <div
                    key={task.id}
                    className="flex flex-col justify-between rounded-xl border border-zinc-700/80 bg-zinc-900/80 p-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeClass}`}>
                          {statusLabel}
                        </span>
                        <span className="text-[11px] text-zinc-400">{task.taskDate}</span>
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-white">{task.taskTitle}</h4>
                      <p className="mt-1 line-clamp-3 text-xs text-zinc-400">{task.taskDescription}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-2 text-[11px]">
                      <span className="text-zinc-500">Category: {task.category}</span>
                      <button
                        onClick={() => handleDeleteTask(selectedEmployee.id, task.id)}
                        className="text-rose-400 hover:text-rose-300"
                        title="Remove Task"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AllTask