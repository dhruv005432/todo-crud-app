export default function EmptyTodo({ filter, searchTerm, onResetFilters }) {
  let title = 'No tasks yet!';
  let message = 'Your todo list is empty. Add your first task using the form above to start organizing your day.';
  let icon = 'bi-clipboard-check';

  if (searchTerm) {
    title = 'No matches found';
    message = `We couldn't find any tasks matching "${searchTerm}". Try a different keyword or clear your search.`;
    icon = 'bi-search';
  } else if (filter === 'completed') {
    title = 'No completed tasks yet';
    message = 'You have not marked any tasks as completed yet. Complete an active task to see it here!';
    icon = 'bi-check2-circle';
  } else if (filter === 'active') {
    title = 'No active tasks';
    message = 'Great job! You have cleared all active tasks. Enjoy your day or add a new task.';
    icon = 'bi-trophy-fill';
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
      <div className="empty-state-icon mx-auto mb-3 bg-light rounded-circle d-flex align-items-center justify-content-center text-primary">
        <i className={`bi ${icon} fs-1`}></i>
      </div>
      <h4 className="fw-bold text-dark mb-2">{title}</h4>
      <p className="text-muted mx-auto mb-4" style={{ maxWidth: '420px' }}>
        {message}
      </p>
      {(searchTerm || filter !== 'all') && (
        <div>
          <button
            type="button"
            className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold"
            onClick={onResetFilters}
          >
            <i className="bi bi-arrow-repeat me-1"></i> View All Tasks
          </button>
        </div>
      )}
    </div>
  );
}
