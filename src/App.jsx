import { useContext } from 'react'
import Login from './Components/Auth/Login'
import EmployeeDashboard from './Components/DashBoard/EmployeeDashBoard'
import AdminDashboard from './Components/DashBoard/AdminDashBoard'
import { AuthContext } from './Context/AuthContext'

const App = () => {
  const auth = useContext(AuthContext)
  const { currentUser, login, logout, isLoading } = auth || {}

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-zinc-400">Loading EMS Portal...</p>
        </div>
      </div>
    )
  }

  // If no user is logged in, show the Login screen
  if (!currentUser) {
    return <Login handleLogin={login} />
  }

  // Admin view
  if (currentUser.role === 'admin') {
    return (
      <AdminDashboard
        changeUser={logout}
        adminData={currentUser.data}
      />
    )
  }

  // Employee view
  if (currentUser.role === 'employee') {
    return (
      <EmployeeDashboard
        changeUser={logout}
        data={currentUser.data}
      />
    )
  }

  return <Login handleLogin={login} />
}

export default App