export const EMS_DATA_VERSION = 'ems_v2.1'

// Authoritative source of truth for application credentials and aliases
export const SEED_CREDENTIALS = {
  admin: {
    id: 101,
    name: 'Admin User',
    email: 'admin@example.com',
    aliases: ['admin@me.com', 'admin@gmail.com'],
    password: '123',
    role: 'admin',
  },
  employees: [
    {
      id: 1,
      name: 'Arjun Sharma',
      email: 'employee1@example.com',
      aliases: ['employee1@gmail.com', 'e@e.com'],
      password: '123',
    },
    {
      id: 2,
      name: 'Sneha Patel',
      email: 'employee2@example.com',
      aliases: ['employee2@gmail.com'],
      password: '123',
    },
    {
      id: 3,
      name: 'Ravi Verma',
      email: 'employee3@example.com',
      aliases: ['employee3@gmail.com'],
      password: '123',
    },
    {
      id: 4,
      name: 'Priya Nair',
      email: 'employee4@example.com',
      aliases: ['employee4@gmail.com'],
      password: '123',
    },
    {
      id: 5,
      name: 'Karan Kapoor',
      email: 'employee5@example.com',
      aliases: ['employee5@gmail.com'],
      password: '123',
    },
  ],
}

const defaultEmployees = [
  {
    id: 1,
    firstName: "Arjun",
    lastName: "Sharma",
    email: "employee1@example.com",
    aliases: ["employee1@gmail.com", "e@e.com"],
    password: "123",
    role: "employee",
    department: "Engineering",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        id: "task-1-1",
        taskTitle: "Revamp homepage layout",
        taskDescription: "Implement modern hero section and improve responsive navigation.",
        taskDate: "2025-02-15",
        category: "Design",
        newTask: true,
        active: false,
        completed: false,
        failed: false,
      },
      {
        id: "task-1-2",
        taskTitle: "Fix memory leak in analytics worker",
        taskDescription: "Investigate and patch high CPU usage reported in background telemetry.",
        taskDate: "2025-02-18",
        category: "Development",
        newTask: false,
        active: true,
        completed: false,
        failed: false,
      },
      {
        id: "task-1-3",
        taskTitle: "Client requirement sign-off",
        taskDescription: "Gather sign-off documents from client stakeholders for phase 1 release.",
        taskDate: "2025-02-10",
        category: "Meeting",
        newTask: false,
        active: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    id: 2,
    firstName: "Sneha",
    lastName: "Patel",
    email: "employee2@example.com",
    aliases: ["employee2@gmail.com"],
    password: "123",
    role: "employee",
    department: "Backend Systems",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        id: "task-2-1",
        taskTitle: "Database query optimization",
        taskDescription: "Index foreign keys on audit log tables and profile query latency under load.",
        taskDate: "2025-02-14",
        category: "Database",
        newTask: false,
        active: true,
        completed: false,
        failed: false,
      },
      {
        id: "task-2-2",
        taskTitle: "Design authentication microservice",
        taskDescription: "Draft architecture diagrams for OAuth2 and JWT token rotation service.",
        taskDate: "2025-02-11",
        category: "Architecture",
        newTask: false,
        active: false,
        completed: true,
        failed: false,
      },
      {
        id: "task-2-3",
        taskTitle: "Setup Redis cache cluster",
        taskDescription: "Configure distributed caching for frequent dashboard metric queries.",
        taskDate: "2025-02-20",
        category: "DevOps",
        newTask: true,
        active: false,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    id: 3,
    firstName: "Ravi",
    lastName: "Verma",
    email: "employee3@example.com",
    aliases: ["employee3@gmail.com"],
    password: "123",
    role: "employee",
    department: "Quality Assurance",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 1,
    },
    tasks: [
      {
        id: "task-3-1",
        taskTitle: "Automated regression test suite",
        taskDescription: "Expand Cypress end-to-end test coverage for checkout and cart flows.",
        taskDate: "2025-02-16",
        category: "QA",
        newTask: true,
        active: false,
        completed: false,
        failed: false,
      },
      {
        id: "task-3-2",
        taskTitle: "Cross-browser compatibility audit",
        taskDescription: "Test rendering and font fallbacks across Safari, Firefox, and Chromium engines.",
        taskDate: "2025-02-17",
        category: "QA",
        newTask: false,
        active: true,
        completed: false,
        failed: false,
      },
      {
        id: "task-3-3",
        taskTitle: "API load testing reports",
        taskDescription: "Document JMeter latency percentiles under 10k concurrent virtual users.",
        taskDate: "2025-02-08",
        category: "Testing",
        newTask: false,
        active: false,
        completed: true,
        failed: false,
      },
      {
        id: "task-3-4",
        taskTitle: "Legacy IE11 polyfills review",
        taskDescription: "Attempt backward support for discontinued corporate kiosks.",
        taskDate: "2025-02-05",
        category: "Maintenance",
        newTask: false,
        active: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 4,
    firstName: "Priya",
    lastName: "Nair",
    email: "employee4@example.com",
    aliases: ["employee4@gmail.com"],
    password: "123",
    role: "employee",
    department: "Platform Engineering",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        id: "task-4-1",
        taskTitle: "API documentation update",
        taskDescription: "Publish Swagger and OpenAPI spec documentation for public v2 endpoints.",
        taskDate: "2025-02-19",
        category: "Documentation",
        newTask: true,
        active: false,
        completed: false,
        failed: false,
      },
      {
        id: "task-4-2",
        taskTitle: "CI/CD Pipeline hardening",
        taskDescription: "Integrate SonarQube vulnerability scanning into Github Actions workflows.",
        taskDate: "2025-02-16",
        category: "DevOps",
        newTask: false,
        active: true,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    id: 5,
    firstName: "Karan",
    lastName: "Kapoor",
    email: "employee5@example.com",
    aliases: ["employee5@gmail.com"],
    password: "123",
    role: "employee",
    department: "Product Design",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        id: "task-5-1",
        taskTitle: "Design system tokens definition",
        taskDescription: "Establish color palette and typography scales for the revised dark UI.",
        taskDate: "2025-02-18",
        category: "Design",
        newTask: true,
        active: false,
        completed: false,
        failed: false,
      },
      {
        id: "task-5-2",
        taskTitle: "Customer journey mapping",
        taskDescription: "Interview 5 power users and synthesize UX friction points in onboarding.",
        taskDate: "2025-02-15",
        category: "Research",
        newTask: false,
        active: true,
        completed: false,
        failed: false,
      },
      {
        id: "task-5-3",
        taskTitle: "App store release graphics",
        taskDescription: "Deliver localized high-resolution screenshots for Android and iOS listings.",
        taskDate: "2025-02-09",
        category: "Design",
        newTask: false,
        active: false,
        completed: true,
        failed: false,
      },
    ],
  },
]

const defaultAdmin = [
  {
    id: 101,
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    aliases: ["admin@me.com", "admin@gmail.com"],
    password: "123",
    role: "admin",
  },
  {
    id: 102,
    firstName: "Executive",
    lastName: "Admin",
    email: "admin@me.com",
    password: "123",
    role: "admin",
  },
]

// Recompute task counts helper ensuring counts always match tasks array
export const recalculateTaskCounts = (tasks = []) => {
  return tasks.reduce(
    (acc, t) => {
      if (t.newTask) acc.newTask += 1
      if (t.active) acc.active += 1
      if (t.completed) acc.completed += 1
      if (t.failed) acc.failed += 1
      return acc
    },
    { newTask: 0, active: 0, completed: 0, failed: 0 }
  )
}

// Reconciles any previously stored browser localStorage data with authoritative seed credentials
// preserving any user-created tasks or custom task status updates while eliminating email conflicts
export const reconcilePersistedData = (storedEmployees = []) => {
  const seedMap = new Map(SEED_CREDENTIALS.employees.map((e) => [e.id, e]))
  let modified = false

  const reconciled = storedEmployees.map((stored) => {
    const seed = seedMap.get(stored.id)
    if (!seed) return stored

    const storedEmail = (stored.email || '').toLowerCase().trim()
    const isSeedEmail = storedEmail === seed.email.toLowerCase()
    const isKnownAlias = seed.aliases.some((a) => a.toLowerCase() === storedEmail)
    const isGmailOrOldPattern =
      storedEmail.includes('@gmail.com') || storedEmail === 'e@e.com' || storedEmail.includes('@me.com')

    // If email is outdated or differs from canonical seed email, normalize to canonical seed
    if (!isSeedEmail && (isKnownAlias || isGmailOrOldPattern)) {
      modified = true
      return {
        ...stored,
        email: seed.email,
        password: seed.password,
        aliases: seed.aliases,
      }
    }

    if (!stored.aliases) {
      modified = true
      return {
        ...stored,
        aliases: seed.aliases,
      }
    }

    return stored
  })

  // Ensure all 5 default employees exist
  const existingIds = new Set(reconciled.map((e) => e.id))
  defaultEmployees.forEach((defEmp) => {
    if (!existingIds.has(defEmp.id)) {
      reconciled.push(defEmp)
      modified = true
    }
  })

  return { reconciled, modified }
}

// Initialize localStorage and reconcile existing persisted data to prevent silent conflicts
export const initLocalStorage = () => {
  const currentVersion = localStorage.getItem("ems_version")
  const existingEmployeesRaw = localStorage.getItem("employees")
  const existingAdminRaw = localStorage.getItem("admin")

  let employeesToSave = defaultEmployees
  let adminToSave = defaultAdmin

  if (!existingEmployeesRaw || !existingAdminRaw || currentVersion !== EMS_DATA_VERSION) {

    if (existingEmployeesRaw) {
      try {
        const parsed = JSON.parse(existingEmployeesRaw)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const { reconciled } = reconcilePersistedData(parsed)
          employeesToSave = reconciled
        }
      } catch (err) {
        console.warn("Could not parse existing employees from localStorage, resetting to defaults", err)
        employeesToSave = defaultEmployees
      }
    }

    localStorage.setItem("employees", JSON.stringify(employeesToSave))
    localStorage.setItem("admin", JSON.stringify(adminToSave))
    localStorage.setItem("ems_version", EMS_DATA_VERSION)
  }
}

// Backward-compatible alias for existing imports
export const setLocalStorage = () => {
  initLocalStorage()
}

// Retrieve employees and admin from localStorage, guaranteeing synchronization
export const getLocalStorage = () => {
  initLocalStorage()
  try {
    const employees = JSON.parse(localStorage.getItem("employees")) || defaultEmployees
    const admin = JSON.parse(localStorage.getItem("admin")) || defaultAdmin
    return { employees, admin }
  } catch (err) {
    console.error("Error reading localStorage, resetting to defaults", err)
    localStorage.setItem("employees", JSON.stringify(defaultEmployees))
    localStorage.setItem("admin", JSON.stringify(defaultAdmin))
    localStorage.setItem("ems_version", EMS_DATA_VERSION)
    return { employees: defaultEmployees, admin: defaultAdmin }
  }
}

// Save updated employees array to localStorage
export const saveEmployees = (employees) => {
  try {
    localStorage.setItem("employees", JSON.stringify(employees))
  } catch (err) {
    console.error("Failed to save employees to localStorage", err)
  }
}

// Reset data to seed defaults and update version flag
export const resetToSeedData = () => {
  localStorage.setItem("employees", JSON.stringify(defaultEmployees))
  localStorage.setItem("admin", JSON.stringify(defaultAdmin))
  localStorage.setItem("ems_version", EMS_DATA_VERSION)
  localStorage.removeItem("loggedInUser")
  return { employees: defaultEmployees, admin: defaultAdmin }
}

export { defaultEmployees, defaultAdmin }