import Header from '../others/Header'
import CreateTask from '../others/CreateTask'
import AllTask from '../others/AllTask'

const AdminDashboard = ({ changeUser, adminData }) => {
  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 py-8 font-sans text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Header changeUser={changeUser} data={adminData || { role: 'admin', firstName: 'Admin' }} />
        <main className="space-y-8 pb-12">
          <CreateTask />
          <AllTask />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard