export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="mb-4">
      <div className="card shadow-sm border-0 bg-primary text-white rounded-4 overflow-hidden position-relative hero-header">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-white text-primary px-3 py-2 rounded-pill fw-semibold shadow-sm">
              <i className="bi bi-check2-circle me-1"></i> React CRUD App
            </span>
            <span className="badge bg-light bg-opacity-25 text-white px-3 py-2 rounded-pill">
              <i className="bi bi-calendar3 me-1"></i> {currentDate}
            </span>
          </div>
          <h1 className="display-6 fw-bold mb-1 tracking-tight">
            📝 TODO MANAGEMENT SYSTEM
          </h1>
          <p className="fs-5 text-white-50 mb-0">
            Welcome back, <strong className="text-white">Dhruv 👋</strong> Organize your daily goals, track progress, and stay productive.
          </p>
        </div>
        <div className="header-decoration-circle"></div>
      </div>
    </header>
  );
}
