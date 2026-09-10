import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const CreateTask = () => {
  const auth = useContext(AuthContext)
  const employees = auth?.userData || auth?.employees || []

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [assignToId, setAssignToId] = useState('')
  const [category, setCategory] = useState('Development')
  const [customCategory, setCustomCategory] = useState('')
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const categoryOptions = ['Development', 'Design', 'DevOps', 'QA', 'Database', 'Meeting', 'Support', 'Other']

  const submitHandler = (e) => {
    e.preventDefault()
    setFeedback({ type: '', message: '' })

    const finalCategory = category === 'Other' ? customCategory.trim() || 'General' : category

    if (!taskTitle.trim()) {
      setFeedback({ type: 'error', message: 'Please provide a task title' })
      return
    }

    if (!assignToId) {
      setFeedback({ type: 'error', message: 'Please select an employee to assign this task to' })
      return
    }

    if (!taskDate) {
      setFeedback({ type: 'error', message: 'Please choose a due date' })
      return
    }

    const payload = {
      taskTitle: taskTitle.trim(),
      taskDescription: taskDescription.trim(),
      taskDate,
      category: finalCategory,
      assignToId,
    }

    let result = { success: false, message: 'Could not create task' }

    if (auth?.createTask) {
      result = auth.createTask(payload)
    }

    if (result.success) {
      setFeedback({ type: 'success', message: 'Task assigned successfully!' })
      setTaskTitle('')
      setTaskDescription('')
      setTaskDate('')
      setAssignToId('')
      setCategory('Development')
      setCustomCategory('')

      setTimeout(() => {
        setFeedback({ type: '', message: '' })
      }, 4000)
    } else {
      setFeedback({ type: 'error', message: result.message || 'Failed to create task' })
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl backdrop-blur-sm sm:p-8">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Create & Assign Task</h2>
          <p className="text-sm text-zinc-400">Assign a new work item directly to an employee's queue.</p>
        </div>
        
        {feedback.message && (
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium ${
              feedback.type === 'success'
                ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border border-rose-500/30 bg-rose-500/10 text-rose-300'
            }`}
          >
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      <form onSubmit={submitHandler} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Core Details */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Task Title <span className="text-emerald-400">*</span>
            </label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              type="text"
              placeholder="e.g. Implement OAuth2 Refresh Flow"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500 focus:bg-zinc-800 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Due Date <span className="text-emerald-400">*</span>
              </label>
              <input
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                required
                type="date"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500 focus:bg-zinc-800 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Assign To <span className="text-emerald-400">*</span>
              </label>
              <select
                value={assignToId}
                onChange={(e) => setAssignToId(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500 focus:bg-zinc-800 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled className="bg-zinc-800 text-zinc-500">
                  Select Employee...
                </option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id} className="bg-zinc-800 text-white">
                    {emp.firstName} {emp.lastName || ''} ({emp.taskCounts?.active || 0} active)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    category === cat
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                      : 'border border-zinc-700 bg-zinc-800/70 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {category === 'Other' && (
              <input
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                type="text"
                placeholder="Specify custom category"
                className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
              />
            )}
          </div>
        </div>

        {/* Right Column: Description & Submit */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="flex flex-1 flex-col">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Task Description
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={5}
              placeholder="Detail specific deliverables, acceptance criteria, and technical expectations..."
              className="w-full flex-1 rounded-xl border border-zinc-700 bg-zinc-800/60 p-4 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500 focus:bg-zinc-800 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-500 active:scale-[0.99]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Assign Task to Employee</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask