import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../components/Header';
import TodoStats from '../components/TodoStats';
import TodoForm from '../components/TodoForm';
import TodoSearch from '../components/TodoSearch';
import TodoFilter from '../components/TodoFilter';
import TodoList from '../components/TodoList';
import EditTodoModal from '../components/EditTodoModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import ToastNotification from '../components/ToastNotification';
import { todoService } from '../services/todoService';
import { FILTER_OPTIONS, PRIORITIES } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { logToTerminal } from '../utils/terminalLogger';

export default function TodoDashboard() {
  // Main Todos State (initialized from LocalStorage)
  const [todos, setTodos] = useState(() => todoService.getTodos());

  // Log on initial load to VS Code terminal
  useEffect(() => {
    logToTerminal(
      'INIT',
      `🚀 App initialized. Loaded ${todos.length} task(s) from LocalStorage JSON ("todos").`,
      todos
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modals & Action State
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [isClearCompletedOpen, setIsClearCompletedOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Save to LocalStorage whenever todos change
  useEffect(() => {
    todoService.saveTodos(todos);
  }, [todos]);

  // Statistics calculation
  const counts = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [todos]);

  // CREATE: Add new Todo
  const handleAddTodo = (newTodoData) => {
    const newTodo = {
      id: generateId(),
      ...newTodoData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    logToTerminal(
      'CREATE',
      `➕ New Task Created & Saved to JSON: "${newTodo.title}" [Category: ${newTodo.category}, Priority: ${newTodo.priority}, Due: ${newTodo.dueDate}]`,
      newTodo
    );

    setTodos((prev) => [newTodo, ...prev]);
    showToast(`Task "${newTodo.title}" created successfully! ✅`, 'success');
  };

  // COMPLETE: Toggle task completion
  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (String(todo.id) === String(id)) {
          const updatedStatus = !todo.completed;
          logToTerminal(
            'STATUS',
            `Task "${todo.title}" marked as ${updatedStatus ? 'COMPLETED ✅' : 'ACTIVE ⏳'} [ID: ${id}]`
          );
          showToast(
            updatedStatus
              ? `Task completed! Great job! 🎉`
              : `Task marked as active. ⏳`,
            updatedStatus ? 'success' : 'info'
          );
          return {
            ...todo,
            completed: updatedStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return todo;
      })
    );
  };

  // UPDATE: Save edited Todo
  const handleUpdateTodo = (updatedTodo) => {
    logToTerminal(
      'UPDATE',
      `✏️ Task Updated in JSON: "${updatedTodo.title}" [ID: ${updatedTodo.id}]`,
      updatedTodo
    );
    setTodos((prev) =>
      prev.map((todo) => (String(todo.id) === String(updatedTodo.id) ? updatedTodo : todo))
    );
    setEditingTodo(null);
    showToast(`Task "${updatedTodo.title}" updated successfully! ✏️`, 'success');
  };

  // DELETE: Trigger delete modal
  const handleOpenDelete = (todo) => {
    setDeletingTodo(todo);
  };

  // Confirm delete single todo - permanently removes from JSON storage
  const handleConfirmDelete = () => {
    if (!deletingTodo) return;
    const idToDelete = deletingTodo.id;
    const titleToDelete = deletingTodo.title;

    // 1. Permanently remove from LocalStorage JSON immediately
    const updated = todoService.deleteTodo(idToDelete);
    logToTerminal(
      'DELETE',
      `🗑️ Task PERMANENTLY DELETED from LocalStorage JSON: "${titleToDelete}" [ID: ${idToDelete}]`
    );

    // 2. Update React State
    setTodos(updated !== null ? updated : (prev) => prev.filter((t) => t.id !== idToDelete));

    showToast(`Task "${titleToDelete}" permanently deleted! 🗑️`, 'danger');
    setDeletingTodo(null);
  };

  // CLEAR COMPLETED: Open confirmation modal
  const handleOpenClearCompleted = () => {
    setIsClearCompletedOpen(true);
  };

  // Confirm clear all completed tasks - permanently removes from JSON storage
  const handleConfirmClearCompleted = () => {
    const countCleared = counts.completed;

    // 1. Permanently remove from LocalStorage JSON immediately
    const updated = todoService.clearCompleted();
    logToTerminal(
      'DELETE',
      `🧹 All ${countCleared} completed tasks PERMANENTLY REMOVED from LocalStorage JSON!`
    );

    // 2. Update React State
    setTodos(updated !== null ? updated : (prev) => prev.filter((t) => !t.completed));

    setIsClearCompletedOpen(false);
    showToast(`Cleared ${countCleared} completed task(s)! 🧹`, 'warning');
  };

  // Reset filters helper for EmptyTodo state
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilter(FILTER_OPTIONS.ALL);
    setCategoryFilter('all');
  };

  // Filtered and Sorted todos list
  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        // Status filter
        if (filter === FILTER_OPTIONS.ACTIVE && todo.completed) return false;
        if (filter === FILTER_OPTIONS.COMPLETED && !todo.completed) return false;

        // Category filter
        if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;

        // Search query
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchesTitle = todo.title.toLowerCase().includes(query);
          const matchesDescription = (todo.description || '')
            .toLowerCase()
            .includes(query);
          return matchesTitle || matchesDescription;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort options
        if (sortBy === 'newest') {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        }
        if (sortBy === 'priority') {
          const weightA = PRIORITIES[a.priority]?.weight || 1;
          const weightB = PRIORITIES[b.priority]?.weight || 1;
          return weightB - weightA;
        }
        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [todos, filter, categoryFilter, searchTerm, sortBy]);

  return (
    <div className="container py-4 py-md-5">
      {/* App Header */}
      <Header />

      {/* Main Statistics */}
      <TodoStats
        total={counts.total}
        active={counts.active}
        completed={counts.completed}
      />

      {/* Create Todo Form */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* Search Input */}
      <TodoSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredTodos.length}
      />

      {/* Filter and Sorting Controls */}
      <TodoFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        counts={counts}
        onClearCompleted={handleOpenClearCompleted}
      />

      {/* Todo List */}
      <TodoList
        todos={filteredTodos}
        onToggleComplete={handleToggleComplete}
        onEdit={setEditingTodo}
        onDelete={handleOpenDelete}
        filter={filter}
        searchTerm={searchTerm}
        onResetFilters={handleResetFilters}
      />

      {/* Edit Modal */}
      {editingTodo && (
        <EditTodoModal
          key={editingTodo.id}
          todo={editingTodo}
          onSave={handleUpdateTodo}
          onClose={() => setEditingTodo(null)}
        />
      )}

      {/* Delete Single Todo Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingTodo)}
        title="Delete Task"
        message={
          deletingTodo ? (
            <>
              Are you sure you want to delete{' '}
              <strong>"{deletingTodo.title}"</strong>? This action cannot be undone.
            </>
          ) : (
            ''
          )
        }
        confirmButtonText="Delete Task"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTodo(null)}
      />

      {/* Clear All Completed Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isClearCompletedOpen}
        title="Clear Completed Tasks"
        message={`Are you sure you want to remove all ${counts.completed} completed task(s)?`}
        confirmButtonText="Clear All Completed"
        isDanger={false}
        onConfirm={handleConfirmClearCompleted}
        onCancel={() => setIsClearCompletedOpen(false)}
      />

      {/* Floating Toast Notification */}
      <ToastNotification toast={toast} onClose={closeToast} />
    </div>
  );
}
