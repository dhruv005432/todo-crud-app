import { PRIORITIES, CATEGORIES } from '../utils/constants';
import { formatDate, isOverdue } from '../utils/helpers';

export default function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  const priorityInfo = PRIORITIES[todo.priority] || PRIORITIES.Medium;
  const categoryInfo = CATEGORIES[todo.category] || CATEGORIES.Other;
  const overdue = isOverdue(todo.dueDate, todo.completed);

  return (
    <div
      className={`card border-0 shadow-sm rounded-4 mb-3 todo-item-card transition-all ${
        todo.completed ? 'completed-item bg-light-subtle' : 'bg-white'
      }`}
    >
      <div className="card-body p-3 p-md-4">
        <div className="d-flex align-items-start gap-3">
          {/* Custom Checkbox */}
          <div className="pt-1">
            <button
              type="button"
              className={`btn btn-link p-0 text-decoration-none check-toggle-btn ${
                todo.completed ? 'text-success' : 'text-secondary'
              }`}
              onClick={() => onToggleComplete(todo.id)}
              aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
              title={todo.completed ? 'Click to mark as active' : 'Click to mark as completed'}
            >
              {todo.completed ? (
                <i className="bi bi-check-circle-fill fs-3"></i>
              ) : (
                <i className="bi bi-circle fs-3 text-muted"></i>
              )}
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-grow-1 min-w-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">
              <h5
                className={`mb-0 fw-bold text-break ${
                  todo.completed ? 'text-muted text-decoration-line-through' : 'text-dark'
                }`}
              >
                {todo.title}
              </h5>

              {/* Badges: Category & Priority */}
              <div className="d-flex flex-wrap gap-2 align-items-center">
                {/* Category Badge */}
                <span className="badge rounded-pill bg-light text-dark border px-2 py-1 small">
                  <i className={`bi ${categoryInfo.icon} me-1 text-${categoryInfo.color}`}></i>
                  {categoryInfo.label}
                </span>

                {/* Priority Badge */}
                <span className={`badge rounded-pill px-2 py-1 small ${priorityInfo.badgeClass}`}>
                  <i className={`bi ${priorityInfo.icon} me-1`}></i>
                  {priorityInfo.label}
                </span>
              </div>
            </div>

            {/* Description if present */}
            {todo.description && (
              <p
                className={`mb-2 text-break small ${
                  todo.completed ? 'text-muted text-decoration-line-through opacity-75' : 'text-secondary'
                }`}
              >
                {todo.description}
              </p>
            )}

            {/* Metadata (Due Date, Overdue flag, Created At) */}
            <div className="d-flex flex-wrap align-items-center gap-3 mt-2 pt-2 border-top border-light-subtle small text-muted">
              {/* Due Date */}
              <span className={`d-flex align-items-center gap-1 ${overdue ? 'text-danger fw-semibold' : ''}`}>
                <i className={`bi ${overdue ? 'bi-exclamation-circle-fill' : 'bi-calendar-event'}`}></i>
                <span>Due: {formatDate(todo.dueDate)}</span>
                {overdue && (
                  <span className="badge bg-danger-subtle text-danger ms-1 px-2 py-0 rounded-pill">
                    Overdue
                  </span>
                )}
              </span>

              {/* Status indicator */}
              <span className="d-none d-sm-inline-flex align-items-center gap-1">
                <i className={`bi ${todo.completed ? 'bi-check-all text-success' : 'bi-clock text-warning'}`}></i>
                <span>{todo.completed ? 'Completed' : 'In Progress'}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons: Edit & Delete */}
          <div className="d-flex flex-column flex-sm-row gap-1 align-self-start">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm rounded-circle action-btn shadow-sm"
              onClick={() => onEdit(todo)}
              title="Edit Task"
              aria-label={`Edit ${todo.title}`}
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-circle action-btn shadow-sm"
              onClick={() => onDelete(todo)}
              title="Delete Task"
              aria-label={`Delete ${todo.title}`}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
