import { CATEGORIES, FILTER_OPTIONS, SORT_OPTIONS } from '../utils/constants';

export default function TodoFilter({
  currentFilter,
  onFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortChange,
  counts,
  onClearCompleted,
}) {
  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4 bg-white p-3">
      <div className="row g-3 align-items-center justify-content-between">
        {/* Status Filter Buttons (All, Active, Completed) */}
        <div className="col-12 col-lg-5">
          <div className="btn-group w-100 rounded-pill p-1 bg-light shadow-inner" role="group" aria-label="Status filter">
            <button
              type="button"
              className={`btn btn-sm rounded-pill fw-semibold py-2 d-flex align-items-center justify-content-center gap-1 ${
                currentFilter === FILTER_OPTIONS.ALL
                  ? 'btn-primary shadow-sm text-white'
                  : 'btn-light text-muted'
              }`}
              onClick={() => onFilterChange(FILTER_OPTIONS.ALL)}
            >
              <span>All</span>
              <span className={`badge rounded-pill ${currentFilter === FILTER_OPTIONS.ALL ? 'bg-white text-primary' : 'bg-secondary-subtle text-dark'}`}>
                {counts.total}
              </span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill fw-semibold py-2 d-flex align-items-center justify-content-center gap-1 ${
                currentFilter === FILTER_OPTIONS.ACTIVE
                  ? 'btn-primary shadow-sm text-white'
                  : 'btn-light text-muted'
              }`}
              onClick={() => onFilterChange(FILTER_OPTIONS.ACTIVE)}
            >
              <span>Active</span>
              <span className={`badge rounded-pill ${currentFilter === FILTER_OPTIONS.ACTIVE ? 'bg-white text-primary' : 'bg-warning-subtle text-warning-emphasis'}`}>
                {counts.active}
              </span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill fw-semibold py-2 d-flex align-items-center justify-content-center gap-1 ${
                currentFilter === FILTER_OPTIONS.COMPLETED
                  ? 'btn-primary shadow-sm text-white'
                  : 'btn-light text-muted'
              }`}
              onClick={() => onFilterChange(FILTER_OPTIONS.COMPLETED)}
            >
              <span>Completed</span>
              <span className={`badge rounded-pill ${currentFilter === FILTER_OPTIONS.COMPLETED ? 'bg-white text-primary' : 'bg-success-subtle text-success'}`}>
                {counts.completed}
              </span>
            </button>
          </div>
        </div>

        {/* Dropdowns (Category, Sort) & Clear Completed */}
        <div className="col-12 col-lg-7">
          <div className="d-flex flex-wrap gap-2 justify-content-lg-end align-items-center">
            {/* Category Dropdown Filter */}
            <div className="flex-grow-1 flex-sm-grow-0" style={{ minWidth: '150px' }}>
              <select
                className="form-select form-select-sm bg-light rounded-pill border-0 px-3 py-2 fw-medium"
                value={categoryFilter}
                onChange={(e) => onCategoryFilterChange(e.target.value)}
                aria-label="Filter by category"
              >
                <option value="all">📂 All Categories</option>
                {Object.entries(CATEGORIES).map(([catKey, cat]) => (
                  <option key={catKey} value={catKey}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex-grow-1 flex-sm-grow-0" style={{ minWidth: '170px' }}>
              <select
                className="form-select form-select-sm bg-light rounded-pill border-0 px-3 py-2 fw-medium"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                aria-label="Sort tasks"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    ⇅ {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Completed Button */}
            {counts.completed > 0 && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-1"
                onClick={onClearCompleted}
                title="Remove all completed tasks"
              >
                <i className="bi bi-trash3"></i>
                <span className="d-none d-sm-inline">Clear Completed</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
