import { useState } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data, onUpdateStatus, activeFilter = 'all', onSelectFilter }) => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'carousel'

  const tasks = data?.tasks || []
  const employeeId = data?.id

  // Filter tasks based on activeFilter
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'newTask') return task.newTask
    if (activeFilter === 'active') return task.active
    if (activeFilter === 'completed') return task.completed
    if (activeFilter === 'failed') return task.failed
    return true
  })

  const filterTabs = [
    { id: 'all', label: 'All Tasks', count: tasks.length },
    { id: 'newTask', label: 'New', count: data?.taskCounts?.newTask || 0 },
    { id: 'active', label: 'In Progress', count: data?.taskCounts?.active || 0 },
    { id: 'completed', label: 'Completed', count: data?.taskCounts?.completed || 0 },
    { id: 'failed', label: 'Failed', count: data?.taskCounts?.failed || 0 },
  ]

  return (
    <div className="mt-10">
      {/* Controls Bar: Filter pills + Layout toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectFilter && onSelectFilter(tab.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                activeFilter === tab.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'border border-zinc-800 bg-zinc-900/90 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {tab.label} <span className="ml-1 opacity-70">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/80 p-1">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            title="Grid Layout"
            className={`rounded-lg p-1.5 text-xs transition ${
              viewMode === 'grid' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('carousel')}
            title="Horizontal Carousel Layout"
            className={`rounded-lg p-1.5 text-xs transition ${
              viewMode === 'carousel' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Task Content */}
      {filteredTasks.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-white">No tasks found</h3>
          <p className="mt-1 text-xs text-zinc-400">
            There are currently no tasks matching the{' '}
            <span className="font-semibold text-zinc-300">"{activeFilter}"</span> filter.
          </p>
          {activeFilter !== 'all' && (
            <button
              onClick={() => onSelectFilter && onSelectFilter('all')}
              className="mt-4 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              View all tasks →
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((elem) => {
            if (elem.active) {
              return (
                <AcceptTask
                  key={elem.id}
                  data={elem}
                  employeeId={employeeId}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            }
            if (elem.newTask) {
              return (
                <NewTask
                  key={elem.id}
                  data={elem}
                  employeeId={employeeId}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            }
            if (elem.completed) {
              return (
                <CompleteTask
                  key={elem.id}
                  data={elem}
                  employeeId={employeeId}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            }
            if (elem.failed) {
              return (
                <FailedTask
                  key={elem.id}
                  data={elem}
                  employeeId={employeeId}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            }
            return null
          })}
        </div>
      ) : (
        <div
          id="tasklist"
          className="mt-6 flex w-full gap-5 overflow-x-auto pb-4 pt-1"
        >
          {filteredTasks.map((elem) => {
            if (elem.active) {
              return (
                <AcceptTask
                  key={elem.id}
                  data={elem}
                  employeeId={employeeId}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            }
            if (elem.newTask) {
              return (
                <NewTask
                  key={elem.id}
                  data={elem}
                  employeeId={employeeId}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            }
            if (elem.completed) {
              return (
                <CompleteTask
                  key={elem.id}
                  data={elem}
                  employeeId={employeeId}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            }
            if (elem.failed) {
              return (
                <FailedTask
                  key={elem.id}
                  data={elem}
                  employeeId={employeeId}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            }
            return null
          })}
        </div>
      )}
    </div>
  )
}

export default TaskList