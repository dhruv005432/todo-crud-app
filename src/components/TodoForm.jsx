import { useState } from 'react';
import { PRIORITIES, CATEGORIES } from '../utils/constants';
import { getTodayString } from '../utils/helpers';

export default function TodoForm({ onAddTodo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState(getTodayString());
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTodo = {
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
    };

    onAddTodo(newTodo);

    // Reset form fields
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setCategory('Personal');
    setDueDate(getTodayString());
    setErrors({});
    setIsOpen(false);
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4 bg-white overflow-hidden">
      <div className="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0 text-dark">
            <i className="bi bi-plus-circle-fill text-primary me-2"></i>
            Create New Task
          </h5>
          <small className="text-muted">Plan and organize your daily work</small>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm rounded-pill px-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <i className="bi bi-dash-lg me-1"></i> Collapse
            </>
          ) : (
            <>
              <i className="bi bi-plus-lg me-1"></i> Expand Form
            </>
          )}
        </button>
      </div>

      <div className={`card-body px-4 pt-1 pb-4 ${isOpen ? 'd-block' : 'd-block'}`}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Quick Row for Title and Add Button */}
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <label htmlFor="todoTitle" className="form-label small fw-semibold text-muted">
                Task Title <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-pencil-square text-muted"></i>
                </span>
                <input
                  id="todoTitle"
                  type="text"
                  className={`form-control border-start-0 ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="e.g. Learn React Hooks & Context API"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                  }}
                />
                {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
              </div>
            </div>

            <div className="col-12 col-md-4 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-3 py-2 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-plus-lg"></i>
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Detailed options (Priority, Category, Due Date, Description) */}
          <div className={`mt-3 pt-3 border-top ${isOpen ? 'd-block' : 'd-none d-md-block'}`}>
            <div className="row g-3">
              {/* Category */}
              <div className="col-12 col-sm-4">
                <label htmlFor="todoCategory" className="form-label small fw-semibold text-muted">
                  Category
                </label>
                <select
                  id="todoCategory"
                  className="form-select bg-light"
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

              {/* Priority */}
              <div className="col-12 col-sm-4">
                <label htmlFor="todoPriority" className="form-label small fw-semibold text-muted">
                  Priority
                </label>
                <select
                  id="todoPriority"
                  className="form-select bg-light"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  {Object.entries(PRIORITIES).map(([prioKey, prio]) => (
                    <option key={prioKey} value={prioKey}>
                      {prio.label} Priority
                    </option>
                  ))}
                </select>
              </div>

              {/* Due Date */}
              <div className="col-12 col-sm-4">
                <label htmlFor="todoDueDate" className="form-label small fw-semibold text-muted">
                  Due Date
                </label>
                <input
                  id="todoDueDate"
                  type="date"
                  className="form-control bg-light"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label htmlFor="todoDescription" className="form-label small fw-semibold text-muted">
                  Description <span className="text-muted fw-normal">(Optional)</span>
                </label>
                <textarea
                  id="todoDescription"
                  className={`form-control bg-light ${errors.description ? 'is-invalid' : ''}`}
                  rows="2"
                  placeholder="Add any specific instructions, links, or notes..."
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
          </div>
        </form>
      </div>
    </div>
  );
}
