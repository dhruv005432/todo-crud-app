export default function TodoSearch({ searchTerm, onSearchChange, resultCount }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 mb-3 bg-white p-3">
      <div className="row g-2 align-items-center">
        <div className="col-12 col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0 ps-0"
              placeholder="Search todos by title or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search todos"
            />
            {searchTerm && (
              <button
                type="button"
                className="btn bg-light border-start-0 text-muted"
                onClick={() => onSearchChange('')}
                title="Clear search"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-12 col-md-4 text-md-end">
          {searchTerm.trim() ? (
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
              <i className="bi bi-funnel-fill me-1"></i> Found {resultCount} matching task{resultCount !== 1 ? 's' : ''}
            </span>
          ) : (
            <small className="text-muted">
              <i className="bi bi-lightning-charge me-1"></i> Quick real-time filtering
            </small>
          )}
        </div>
      </div>
    </div>
  );
}
