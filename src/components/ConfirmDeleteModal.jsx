export default function ConfirmDeleteModal({
  isOpen,
  title = 'Delete Task',
  message,
  confirmButtonText = 'Delete',
  isDanger = true,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmDeleteModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden text-center p-3">
            <div className="modal-body p-4">
              <div
                className={`mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center ${
                  isDanger ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning-emphasis'
                }`}
                style={{ width: '64px', height: '64px' }}
              >
                <i className={`bi ${isDanger ? 'bi-trash3-fill' : 'bi-exclamation-triangle-fill'} fs-2`}></i>
              </div>
              <h5 className="modal-title fw-bold mb-2" id="confirmDeleteModalLabel">
                {title}
              </h5>
              <p className="text-muted small mb-0">{message}</p>
            </div>

            <div className="d-flex gap-2 justify-content-center pb-2">
              <button
                type="button"
                className="btn btn-light rounded-pill px-4 fw-medium"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn ${isDanger ? 'btn-danger' : 'btn-warning'} rounded-pill px-4 fw-semibold shadow-sm`}
                onClick={onConfirm}
              >
                {confirmButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
