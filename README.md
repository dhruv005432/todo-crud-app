# 📝 Todo Management System — React CRUD App

A modern, responsive **React.js Todo CRUD Application** built with Vite, React Hooks, Bootstrap 5, and browser LocalStorage persistence. Designed as a portfolio project showcasing component-driven architecture, form validation, real-time search, multi-factor filtering, priority tagging, and state management.

---

## 🚀 Features

- ➕ **Create (Add Task)**: Create tasks with title, optional description, category, priority level, and due date.
- 📋 **Read (View Tasks)**: Clean, card-based display showing task metadata, formatted dates, category icons, and priority badges.
- ✏️ **Update (Edit Task)**: Interactive modal allowing full editing of existing task details with client-side validation.
- 🗑️ **Delete (Remove Task)**: Safe deletion workflow with a confirmation modal dialog to avoid accidental data loss.
- ✅ **Toggle Completion**: One-click checkbox completion toggle with instant UI feedback (strikethrough & badge status).
- 🔍 **Live Search**: Instant real-time task filtering across titles and descriptions with an instant result counter and clear button.
- 🔽 **Multi-filter System**:
  - Status filters: **All**, **Active**, **Completed** with dynamic counter badges.
  - Category filters: **Learning**, **Work**, **Study**, **Personal**, **Shopping**, **Other**.
- 🔃 **Sorting Options**: Sort tasks by **Newest**, **Oldest**, **Priority (High to Low)**, **Due Date**, or **Alphabetical (A - Z)**.
- 📊 **Real-time Statistics**: Interactive metric cards showing Total, Active, Completed tasks, and a dynamic percentage progress bar.
- ⚠️ **Overdue Detection**: Automatically detects and flags past-due tasks with an alert badge.
- 💾 **LocalStorage Persistence**: Auto-saves every modification to browser `localStorage` and loads saved data on page reload.
- 🔔 **Toast Feedback**: Toast alerts for create, update, delete, complete, and clear actions.
- 🧹 **Clear Completed**: One-click batch cleanup of all completed tasks with confirmation.
- 📱 **Fully Responsive**: Mobile-first design optimized for mobile, tablet, laptop, and desktop viewports.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Styling**: [Bootstrap 5.3](https://getbootstrap.com/) & custom CSS
- **Iconography**: [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Language**: JavaScript (ES6+ Modules)
- **Persistence**: Browser `localStorage` API
- **React Concepts Used**:
  - `useState()` for local and form state management
  - `useEffect()` for LocalStorage persistence and auto-dismissing toast notifications
  - `useMemo()` for optimized real-time search, filtering, sorting, and stats calculation
  - `useCallback()` for memoized notification callbacks
  - Controlled inputs and form validation

---

## 📂 Project Structure

```
todo-crud-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Top banner, greeting, date, and reset button
│   │   ├── TodoStats.jsx          # Statistics counter cards and progress bar
│   │   ├── TodoForm.jsx           # Task creation form with validation
│   │   ├── TodoSearch.jsx         # Live search bar with counter and clear action
│   │   ├── TodoFilter.jsx         # Status tabs, category dropdown, sort options, clear completed
│   │   ├── TodoList.jsx           # Task list container
│   │   ├── TodoItem.jsx           # Individual task card with status, badges, and actions
│   │   ├── EditTodoModal.jsx      # Modal for updating task fields
│   │   ├── ConfirmDeleteModal.jsx # Confirmation dialog for safe deletion
│   │   ├── EmptyTodo.jsx          # Context-aware empty state illustrations
│   │   └── ToastNotification.jsx  # Floating non-blocking feedback messages
│   │
│   ├── pages/
│   │   └── TodoDashboard.jsx      # Main dashboard orchestrating state, filters, and modals
│   │
│   ├── services/
│   │   └── todoService.js         # LocalStorage persistence service
│   │
│   ├── utils/
│   │   ├── constants.js           # Priorities, Categories, Sort/Filter options, Sample tasks
│   │   └── helpers.js             # Date formatters, overdue checks, unique ID generation
│   │
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point importing Bootstrap & styles
│   └── index.css                  # Custom styling, animations, and theme accents
│
├── package.json
└── README.md
```

---

## 📦 Data Model

```json
{
  "id": 1727500000001,
  "title": "Learn React Fundamentals",
  "description": "Master JSX, Props, State, Component Lifecycle, and Virtual DOM concepts.",
  "priority": "High",
  "category": "Learning",
  "dueDate": "2026-09-30",
  "completed": false,
  "createdAt": "2026-09-28T09:00:00.000Z",
  "updatedAt": "2026-09-28T09:00:00.000Z"
}
```

---

## 🚦 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 2. Installation
Clone or navigate to the project directory:
```bash
cd todo-crud-app
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🧪 Testing User Scenarios

1. **Create Task**: Fill in the title, priority, due date, category, and click **Add Task**. Validation prevents adding tasks with titles shorter than 3 characters.
2. **Toggle Completion**: Click the circle checkbox. The task is marked as completed, title receives strikethrough, and the completed counter increments.
3. **Edit Task**: Click the pencil icon (✏️). Update title or priority in the modal and click **Update Task**.
4. **Delete Task**: Click the trash icon (🗑️). A modal prompts for confirmation before permanently deleting.
5. **Search**: Type keywords into the search bar. The list updates instantly.
6. **Filter & Sort**: Switch between Active / Completed filters, filter by Category, or sort by Due Date or Priority.
7. **Persistence**: Refresh the browser page (`F5`). All created and edited tasks persist via `localStorage`.

---

## 💼 Resume Portfolio Bullet Points

- **Todo Management CRUD Web Application (React.js, Bootstrap 5, Vite)**:
  - Engineered a responsive Single Page Application implementing complete **CRUD operations**, form validation, and reactive UI state updates.
  - Implemented persistent browser storage using **LocalStorage** with automatic serialization and initial data seeding.
  - Built an intuitive filtering engine with **real-time search**, status filters (All/Active/Completed), category tagging, and multi-factor sorting using `useMemo()`.
  - Designed accessible and mobile-friendly components with **Bootstrap 5**, modal confirmation dialogs, overdue date detection, and self-dismissing toast notifications.

---

## 🔮 Future Roadmap (Full-Stack Version)

- **Backend API**: Node.js / Express or .NET Web API with endpoints:
  - `GET /api/todos` — Fetch all user todos
  - `POST /api/todos` — Create a new todo
  - `PUT /api/todos/:id` — Update existing todo
  - `PATCH /api/todos/:id/complete` — Toggle completed status
  - `DELETE /api/todos/:id` — Delete todo
- **Database**: MongoDB / PostgreSQL / MySQL for persistent multi-user database storage.
- **Authentication**: JWT token-based auth with Register, Login, and private user workspaces.
