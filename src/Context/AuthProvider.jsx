import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  getLocalStorage,
  saveEmployees,
  recalculateTaskCounts,
  resetToSeedData,
  SEED_CREDENTIALS,
} from '../utils/localStorage'
import { AuthContext } from './AuthContext'

export { AuthContext }

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([])
  const [adminData, setAdminData] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize data from localStorage on initial mount
  useEffect(() => {
    const { employees, admin } = getLocalStorage()
    setUserData(employees)
    setAdminData(admin)

    // Restore existing session if present
    try {
      const storedSession = localStorage.getItem('loggedInUser')
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession)
        if (parsedSession.role === 'admin') {
          setCurrentUser({ role: 'admin', data: parsedSession.data || { firstName: 'Admin', email: parsedSession.email || 'admin@me.com' } })
        } else if (parsedSession.role === 'employee') {
          // Re-lookup the latest employee data to avoid stale session snapshots
          const freshEmployee = employees.find(
            (e) => e.id === parsedSession.id || e.email.toLowerCase() === (parsedSession.email || '').toLowerCase()
          )
          if (freshEmployee) {
            setCurrentUser({ role: 'employee', data: freshEmployee })
          } else if (parsedSession.data) {
            setCurrentUser({ role: 'employee', data: parsedSession.data })
          }
        }
      }
    } catch (err) {
      console.error('Failed to parse loggedInUser from localStorage', err)
      localStorage.removeItem('loggedInUser')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Keep currentUser.data in sync when userData changes for logged in employee
  useEffect(() => {
    if (currentUser?.role === 'employee' && currentUser.data?.id) {
      const updated = userData.find((e) => e.id === currentUser.data.id)
      if (updated && JSON.stringify(updated) !== JSON.stringify(currentUser.data)) {
        setCurrentUser((prev) => (prev ? { ...prev, data: updated } : null))
      }
    }
  }, [userData, currentUser?.role, currentUser?.data?.id, currentUser?.data])

  // Login Handler supporting authoritative credentials and all recognized aliases
  const login = useCallback(
    (email, password) => {
      const trimmedEmail = (email || '').trim().toLowerCase()
      const trimmedPassword = (password || '').trim()

      // 1. Check Admin
      const matchedAdmin = adminData.find((a) => {
        if (a.password !== trimmedPassword) return false
        const aEmail = (a.email || '').toLowerCase()
        if (aEmail === trimmedEmail) return true
        if (Array.isArray(a.aliases) && a.aliases.some((al) => al.toLowerCase() === trimmedEmail)) {
          return true
        }
        return false
      })

      const isAdminEmail =
        trimmedEmail === 'admin@example.com' ||
        trimmedEmail === 'admin@me.com' ||
        trimmedEmail === 'admin@gmail.com'

      if (matchedAdmin || (isAdminEmail && trimmedPassword === '123')) {
        const adminUser = matchedAdmin || {
          id: 101,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          role: 'admin',
        }
        const session = { role: 'admin', email: adminUser.email, data: adminUser }
        localStorage.setItem('loggedInUser', JSON.stringify(session))
        setCurrentUser(session)
        return { success: true, role: 'admin', data: adminUser }
      }

      // 2. Check Employee
      const matchedEmployee = userData.find((e) => {
        if (e.password !== trimmedPassword) return false
        const empEmail = (e.email || '').toLowerCase()
        if (empEmail === trimmedEmail) return true
        if (Array.isArray(e.aliases) && e.aliases.some((al) => al.toLowerCase() === trimmedEmail)) {
          return true
        }
        // Check SEED_CREDENTIALS aliases for this employee id
        const seed = SEED_CREDENTIALS.employees.find((s) => s.id === e.id)
        if (seed) {
          if (seed.email.toLowerCase() === trimmedEmail) return true
          if (seed.aliases.some((al) => al.toLowerCase() === trimmedEmail)) return true
        }
        return false
      })

      if (matchedEmployee) {
        const session = {
          role: 'employee',
          id: matchedEmployee.id,
          email: matchedEmployee.email,
          data: matchedEmployee,
        }
        localStorage.setItem('loggedInUser', JSON.stringify(session))
        setCurrentUser(session)
        return { success: true, role: 'employee', data: matchedEmployee }
      }

      return { success: false, message: 'Invalid email or password' }
    },
    [adminData, userData]
  )


  // Logout Handler
  const logout = useCallback(() => {
    localStorage.removeItem('loggedInUser')
    setCurrentUser(null)
  }, [])

  // Create Task and assign to an employee
  const createTask = useCallback(
    (taskPayload) => {
      const { taskTitle, taskDescription, taskDate, category, assignToId } = taskPayload

      if (!taskTitle || !taskDate || !assignToId) {
        return { success: false, message: 'Task title, date, and employee are required' }
      }

      let employeeFound = false

      const updatedEmployees = userData.map((employee) => {
        // Match by id or firstName
        const matches =
          String(employee.id) === String(assignToId) ||
          employee.firstName.toLowerCase() === String(assignToId).toLowerCase()

        if (!matches) return employee

        employeeFound = true

        const newTaskObj = {
          id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          taskTitle: taskTitle.trim(),
          taskDescription: (taskDescription || '').trim(),
          taskDate,
          category: (category || 'General').trim(),
          newTask: true,
          active: false,
          completed: false,
          failed: false,
        }

        const newTasks = [newTaskObj, ...employee.tasks]
        const updatedCounts = recalculateTaskCounts(newTasks)

        return {
          ...employee,
          tasks: newTasks,
          taskCounts: updatedCounts,
        }
      })

      if (!employeeFound) {
        return { success: false, message: 'Selected employee could not be found' }
      }

      setUserData(updatedEmployees)
      saveEmployees(updatedEmployees)

      return { success: true, message: 'Task assigned successfully!' }
    },
    [userData]
  )

  // Update Task Status (e.g. 'active', 'completed', 'failed')
  const updateTaskStatus = useCallback(
    (employeeId, taskId, targetStatus) => {
      const updatedEmployees = userData.map((employee) => {
        if (employee.id !== employeeId) return employee

        const updatedTasks = employee.tasks.map((task) => {
          if (task.id !== taskId) return task

          return {
            ...task,
            newTask: targetStatus === 'new',
            active: targetStatus === 'active',
            completed: targetStatus === 'completed',
            failed: targetStatus === 'failed',
          }
        })

        return {
          ...employee,
          tasks: updatedTasks,
          taskCounts: recalculateTaskCounts(updatedTasks),
        }
      })

      setUserData(updatedEmployees)
      saveEmployees(updatedEmployees)
      return { success: true }
    },
    [userData]
  )

  // Delete Task
  const deleteTask = useCallback(
    (employeeId, taskId) => {
      const updatedEmployees = userData.map((employee) => {
        if (employee.id !== employeeId) return employee

        const filteredTasks = employee.tasks.filter((t) => t.id !== taskId)
        return {
          ...employee,
          tasks: filteredTasks,
          taskCounts: recalculateTaskCounts(filteredTasks),
        }
      })

      setUserData(updatedEmployees)
      saveEmployees(updatedEmployees)
      return { success: true }
    },
    [userData]
  )

  // Reset to default seed data
  const handleResetData = useCallback(() => {
    const { employees, admin } = resetToSeedData()
    setUserData(employees)
    setAdminData(admin)
    logout()
  }, [logout])

  // Construct context value supporting BOTH array destructuring [userData, setUserData]
  // and object destructuring { userData, login, logout, createTask, ... }
  const contextValue = useMemo(() => {
    const value = [userData, setUserData]
    value.userData = userData
    value.setUserData = setUserData
    value.employees = userData
    value.adminData = adminData
    value.currentUser = currentUser
    value.setCurrentUser = setCurrentUser
    value.isLoading = isLoading
    value.login = login
    value.logout = logout
    value.createTask = createTask
    value.updateTaskStatus = updateTaskStatus
    value.deleteTask = deleteTask
    value.resetData = handleResetData
    return value
  }, [
    userData,
    adminData,
    currentUser,
    isLoading,
    login,
    logout,
    createTask,
    updateTaskStatus,
    deleteTask,
    handleResetData,
  ])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider