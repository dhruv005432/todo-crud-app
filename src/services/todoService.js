// Key used in browser LocalStorage: 'todos'
const STORAGE_KEY = 'todos';

export const todoService = {
  /**
   * Retrieve all todos from LocalStorage JSON
   * If nothing is saved, initializes as empty array [] so no sample data is ever re-injected.
   */
  getTodos: () => {
    try {
      // Remove any legacy key if present
      if (localStorage.getItem('todo_crud_app_data')) {
        localStorage.removeItem('todo_crud_app_data');
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null && stored !== '') {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          console.log(
            '%c[TODO DEBUG] 📋 Loaded tasks from LocalStorage JSON:',
            'color: #2563eb; font-weight: bold; font-size: 12px;',
            parsed
          );
          return parsed;
        }
      }
      // If nothing saved yet in localStorage, initialize with empty array []
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      console.log(
        '%c[TODO DEBUG] ℹ️ LocalStorage initialized as empty array []',
        'color: #64748b; font-style: italic;'
      );
      return [];
    } catch (error) {
      console.error('[TODO DEBUG] ❌ Failed to load todos from LocalStorage JSON:', error);
      return [];
    }
  },

  /**
   * Save todos array directly to LocalStorage as JSON string
   */
  saveTodos: (todos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos || []));
      console.log(
        '%c[TODO DEBUG] 💾 LocalStorage JSON successfully updated ("todos"):',
        'color: #16a34a; font-weight: bold;',
        todos
      );
      return true;
    } catch (error) {
      console.error('[TODO DEBUG] ❌ Failed to save todos to LocalStorage JSON:', error);
      return false;
    }
  },

  /**
   * Permanently delete a todo from LocalStorage JSON by ID
   * Compares ID as string to prevent any type mismatch
   */
  deleteTodo: (id) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const currentList = stored ? JSON.parse(stored) : [];
      const updatedList = currentList.filter(
        (item) => String(item.id) !== String(id)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      console.log(
        `%c[TODO DEBUG] 🗑️ Task [ID: ${id}] PERMANENTLY DELETED from JSON! Remaining tasks:`,
        'color: #dc2626; font-weight: bold; background: #fee2e2; padding: 2px 6px; border-radius: 4px;',
        updatedList
      );
      return updatedList;
    } catch (error) {
      console.error('[TODO DEBUG] ❌ Failed to delete todo from LocalStorage JSON:', error);
      return [];
    }
  },

  /**
   * Permanently delete all completed todos from LocalStorage JSON
   */
  clearCompleted: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const currentList = stored ? JSON.parse(stored) : [];
      const updatedList = currentList.filter((item) => !item.completed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      console.log(
        '%c[TODO DEBUG] 🧹 All completed tasks PERMANENTLY CLEARED from JSON! Remaining tasks:',
        'color: #d97706; font-weight: bold; background: #fef3c7; padding: 2px 6px; border-radius: 4px;',
        updatedList
      );
      return updatedList;
    } catch (error) {
      console.error('[TODO DEBUG] ❌ Failed to clear completed todos from LocalStorage JSON:', error);
      return [];
    }
  },
};
