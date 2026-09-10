import { useState, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const Login = ({ handleLogin }) => {
  const auth = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    const result = handleLogin
      ? handleLogin(email, password)
      : auth?.login
      ? auth.login(email, password)
      : { success: false, message: 'Login handler not found' }

    if (!result || !result.success) {
      setErrorMessage(result?.message || 'Invalid email or password. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleDemoFill = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setErrorMessage('')
  }

  const handleResetData = () => {
    if (window.confirm('Reset all employee credentials and tasks back to initial seed data?')) {
      if (auth?.resetData) {
        auth.resetData()
        setErrorMessage('')
        setEmail('')
        setPassword('')
      }
    }
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-zinc-950 p-4 font-sans text-white selection:bg-emerald-500 selection:text-white">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-md transition-all sm:p-10">
        
        {/* Brand header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/20">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">EMS Portal</h1>
          <p className="mt-1.5 text-sm text-zinc-400">Employee & Task Management System</p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
            {auth?.resetData && (
              <button
                type="button"
                onClick={handleResetData}
                className="text-xs underline hover:text-red-300 flex-shrink-0"
              >
                Reset Data
              </button>
            )}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Email Address
            </label>
            <div className="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500 focus:bg-zinc-800 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-3 pr-10 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500 focus:bg-zinc-800 focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </span>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* Demo Accounts Quick-Fill Section */}
        <div className="mt-8 border-t border-zinc-800 pt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium text-zinc-400">
              Quick-Fill Demo Credentials (Password: <span className="font-mono text-zinc-300">123</span>):
            </p>
            {auth?.resetData && (
              <button
                type="button"
                onClick={handleResetData}
                className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 hover:underline"
                title="Reset local storage data to default seed data"
              >
                Reset Demo Data
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={() => handleDemoFill('admin@example.com', '123')}
              className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300 transition hover:bg-purple-500/20"
            >
              👑 Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('employee1@example.com', '123')}
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
            >
              👤 Arjun (Emp 1)
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('employee2@example.com', '123')}
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/20"
            >
              👤 Sneha (Emp 2)
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('employee3@example.com', '123')}
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/20"
            >
              👤 Ravi (Emp 3)
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('employee4@example.com', '123')}
              className="rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-300 transition hover:bg-teal-500/20"
            >
              👤 Priya (Emp 4)
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('employee5@example.com', '123')}
              className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20"
            >
              👤 Karan (Emp 5)
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
