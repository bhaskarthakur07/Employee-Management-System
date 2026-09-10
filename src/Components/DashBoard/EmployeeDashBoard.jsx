import { useState, useContext } from 'react'
import Header from '../others/Header'
import TaskListNumbers from '../others/TaskListno'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../Context/AuthContext'

const EmployeeDashboard = ({ changeUser, data }) => {
  const auth = useContext(AuthContext)
  const [activeFilter, setActiveFilter] = useState('all')

  // Always use the freshest employee record from auth context if available
  const currentEmployee =
    auth?.userData?.find((e) => e.id === data?.id) || data

  const handleUpdateStatus = (employeeId, taskId, newStatus) => {
    if (auth?.updateTaskStatus) {
      auth.updateTaskStatus(employeeId, taskId, newStatus)
    }
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 py-8 font-sans text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Header changeUser={changeUser} data={currentEmployee} />
        
        <main className="pb-16">
          <TaskListNumbers
            data={currentEmployee}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
          />
          
          <TaskList
            data={currentEmployee}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            onUpdateStatus={handleUpdateStatus}
          />
        </main>
      </div>
    </div>
  )
}

export default EmployeeDashboard
