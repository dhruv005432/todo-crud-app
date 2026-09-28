import { useState } from 'react';
import { PRIORITIES, CATEGORIES } from '../utils/constants';

export default function EditTodoModal({ todo, onSave, onClose }) {
  const [title, setTitle] = useState(todo ? todo.title || '' : '');
  const [description, setDescription] = useState(todo ? todo.description || '' : '');
  const [priority, setPriority] = useState(todo ? todo.priority || 'Medium' : 'Medium');
  const [category, setCategory] = useState(todo ? todo.category || 'Personal' : 'Personal');
  const [dueDate, setDueDate] = useState(todo ? todo.dueDate || '' : '');
  const [errors, setErrors] = useState({});

  if (!todo) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Title is required.';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must contain at least 3 characters.';
    }

    if (description.length > 250) {
      errs.description = 'Description cannot exceed 250 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...todo,
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editTodoModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="modal-header bg-primary text-white py-3 px-4">
              <h5 className="modal-title fw-bold" id="editTodoModalLabel">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Task
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleUpdate} noValidate>
              <div className="modal-body p-4">
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label small fw-semibold text-muted">
                    Task Title <span className="text-danger">*</span>
                  </label>
                  <input
                    id="editTitle"
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                    }}
                    autoFocus
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                {/* Category & Priority Row */}
                <div className="row g-2 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="editCategory" className="form-label small fw-semibold text-muted">
                      Category
                    </label>
                    <select
                      id="editCategory"
                      className="form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {Object.entries(CATEGORIES).map(([catKey, cat]) => (
                        <option key={catKey} value={catKey}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="editPriority" className="form-label small fw-semibold text-muted">
                      Priority
                    </label>
                    <select
                      id="editPriority"
                      className="form-select"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      {Object.entries(PRIORITIES).map(([prioKey, prio]) => (
                        <option key={prioKey} value={prioKey}>
                          {prio.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div className="mb-3">
                  <label htmlFor="editDueDate" className="form-label small fw-semibold text-muted">
                    Due Date
                  </label>
                  <input
                    id="editDueDate"
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="mb-2">
                  <label htmlFor="editDescription" className="form-label small fw-semibold text-muted">
                    Description <span className="text-muted fw-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="editDescription"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    rows="3"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
                    }}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                  <div className="d-flex justify-content-end mt-1">
                    <small className="text-muted">{description.length}/250</small>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light border-0 px-4 py-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4 fw-medium"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm"
                >
                  <i className="bi bi-check-lg me-1"></i> Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
