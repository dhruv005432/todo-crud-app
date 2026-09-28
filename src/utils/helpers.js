/**
 * Format a date string (YYYY-MM-DD or ISO) into human-friendly format (e.g. 28 Sep 2026)
 */
export function formatDate(dateString) {
  if (!dateString) return 'No due date';
  try {
    const parts = dateString.split('T')[0].split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Checks whether a task is overdue (dueDate is in the past and not completed)
 */
export function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parts = dueDate.split('T')[0].split('-');
  if (parts.length === 3) {
    const due = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return due < today;
  }
  return false;
}

/**
 * Get current date as YYYY-MM-DD for date inputs
 */
export function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate a unique timestamp-based ID
 */
export function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}
