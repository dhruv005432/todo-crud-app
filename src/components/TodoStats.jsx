export default function TodoStats({ total, active, completed }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="mb-4" aria-label="Task statistics">
      <div className="row g-3">
        {/* Total Tasks Card */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 stat-card bg-white p-3 h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted text-uppercase fw-semibold small mb-1">Total Tasks</p>
                <h3 className="fw-bold mb-0 text-dark">{total}</h3>
              </div>
              <div className="stat-icon bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center">
                <i className="bi bi-list-task fs-4"></i>
              </div>
            </div>
            <div className="mt-3 text-muted small">
              <i className="bi bi-stack me-1"></i> All created items
            </div>
          </div>
        </div>

        {/* Active Tasks Card */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 stat-card bg-white p-3 h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted text-uppercase fw-semibold small mb-1">Active / Pending</p>
                <h3 className="fw-bold mb-0 text-warning-emphasis">{active}</h3>
              </div>
              <div className="stat-icon bg-warning-subtle text-warning-emphasis rounded-4 d-flex align-items-center justify-content-center">
                <i className="bi bi-hourglass-split fs-4"></i>
              </div>
            </div>
            <div className="mt-3 text-muted small">
              <i className="bi bi-clock-history me-1"></i> Requires attention
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 stat-card bg-white p-3 h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted text-uppercase fw-semibold small mb-1">Completed</p>
                <h3 className="fw-bold mb-0 text-success">{completed}</h3>
              </div>
              <div className="stat-icon bg-success-subtle text-success rounded-4 d-flex align-items-center justify-content-center">
                <i className="bi bi-check-circle-fill fs-4"></i>
              </div>
            </div>
            <div className="mt-3 text-muted small">
              <i className="bi bi-trophy me-1"></i> Finished tasks
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {total > 0 && (
        <div className="card border-0 shadow-sm rounded-4 bg-white p-3 mt-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="small fw-semibold text-muted">Overall Task Completion</span>
            <span className="small fw-bold text-primary">{percentage}% Complete</span>
          </div>
          <div className="progress rounded-pill" style={{ height: '10px' }}>
            <div
              className={`progress-bar rounded-pill ${
                percentage === 100 ? 'bg-success' : 'bg-primary'
              }`}
              role="progressbar"
              style={{ width: `${percentage}%`, transition: 'width 0.4s ease' }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      )}
    </section>
  );
}
