# 🚀 Employee Management System (EMS)

A modern **Employee Management System** built using **React, Vite, Tailwind CSS, Context API, and localStorage**.

This project was built as a learning project to understand how different parts of a React application work together, including authentication, state management, component-based architecture, data persistence, and task management.

---

## 📌 Project Overview

The Employee Management System allows an **Admin** to manage employees and assign tasks.

Employees can log in to their accounts, view their assigned tasks, and update the status of those tasks.

The project currently uses **browser localStorage** for data persistence, so no backend or database is required.

---

# ✨ Features

## 👑 Admin Features

- Admin login
- View all employees
- View employee task statistics
- Search employees
- Create and assign tasks
- View employee tasks
- Delete tasks
- Monitor task counts and status
- Reset demo data

---

## 👨‍💻 Employee Features

- Employee login
- Personalized dashboard
- View assigned tasks
- View task statistics
- Accept new tasks
- Reject tasks
- Mark active tasks as completed
- Mark tasks as failed
- Retry failed tasks
- Reopen completed tasks
- Filter tasks based on their status
- Switch between different task layouts
- Logout functionality

---

# 🔐 Authentication

The application provides separate login flows for:

- 👑 Admin
- 👨‍💻 Employees

Authentication is currently simulated using employee and admin data stored in the browser's `localStorage`.

> ⚠️ This is a frontend learning project. Passwords are stored as demo data and are not secure enough for a real production application.

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| ⚛️ React | Building the user interface |
| ⚡ Vite | Development environment and build tool |
| 🎨 Tailwind CSS | Styling the application |
| 🌍 Context API | Global state management |
| 💾 localStorage | Browser-based data persistence |
| 🟨 JavaScript | Application logic |
| 🔍 ESLint | Code quality checks |
| 🐙 Git | Version control |
| 🌐 GitHub | Remote repository hosting |

---

# 🧠 What I Learned

This project was mainly built as a learning experience.

While building and improving this Employee Management System, I learned several important concepts.

---

## ⚛️ React Components

I learned how React applications can be divided into small and reusable components.

Instead of writing the complete application inside a single file, the project is divided into components such as:

- Login
- Header
- Admin Dashboard
- Employee Dashboard
- Task Lists
- Task Cards

This makes the application easier to organize, understand, and maintain.

---

## 📦 Props

I learned how to pass data between components using **props**.

Components can receive:

- Employee data
- Task data
- Functions
- Event handlers

Props allow parent and child components to communicate with each other.

---

## 🔄 React State

I learned how React state manages changing data inside an application.

State is used for things such as:

- Logged-in users
- Employee data
- Tasks
- Task status
- Filters
- UI interactions

I also learned that React state updates are asynchronous and should be handled carefully.

---

## 🌍 Context API

One of the major concepts I learned was the **React Context API**.

Context allows data to be shared between multiple components without passing props through every component level.

The project uses Context to manage shared application data such as:

- Employee data
- Authentication
- Task creation
- Task updates
- Task deletion

---

## 🪝 useContext

I learned how the `useContext` hook allows components to access shared data.

Instead of passing the same data through multiple components, components can access global data directly through Context.

This makes state management easier in medium-sized React applications.

---

## 💾 localStorage

I learned how browser `localStorage` can be used to store application data.

The project stores information such as:

- Employee data
- Tasks
- Task status
- Login sessions

This allows data to remain available even after refreshing the page.

I also learned an important lesson about **seed data and persisted data**.

The data written in a JavaScript file can be different from the data already stored in browser localStorage. Applications must handle this carefully to avoid data inconsistencies.

---

## 🔐 Authentication Flow

I learned how a basic frontend authentication flow works.

The application:

1. Accepts an email and password.
2. Checks the credentials.
3. Identifies whether the user is an Admin or Employee.
4. Displays the appropriate dashboard.
5. Stores the login session.
6. Restores the session after a page refresh.

This is simulated authentication.

A real application would use:

- A backend
- Secure password hashing
- Authentication tokens
- Secure sessions

---

## 🔀 Conditional Rendering

I learned how React can display different components depending on application state.

