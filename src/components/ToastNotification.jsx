import { useEffect } from 'react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const typeConfig = {
    success: {
      bg: 'bg-success',
      icon: 'bi-check-circle-fill',
    },
    danger: {
      bg: 'bg-danger',
      icon: 'bi-trash-fill',
    },
    info: {
      bg: 'bg-primary',
      icon: 'bi-info-circle-fill',
    },
    warning: {
      bg: 'bg-warning text-dark',
      icon: 'bi-exclamation-triangle-fill',
    },
  };

  const currentType = typeConfig[toast.type] || typeConfig.info;

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1080 }}
    >
      <div
        className={`toast show align-items-center text-white ${currentType.bg} border-0 shadow-lg rounded-4`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex p-2">
          <div className="toast-body d-flex align-items-center gap-2 py-1 px-2 fw-medium">
            <i className={`bi ${currentType.icon} fs-5`}></i>
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
