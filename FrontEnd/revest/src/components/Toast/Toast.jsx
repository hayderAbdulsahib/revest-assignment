import { useEffect } from "react";
import { IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";
import "./style.css";

const Toast = ({
  isVisible,
  message,
  onClose,
  duration = 2000,
  type = "success",
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        <div className="toast-icon">
          {type === "error" ? <IoAlertCircle /> : <IoCheckmarkCircle />}
        </div>
        <div className="toast-content">
          <p className="toast-message">{message}</p>
        </div>
        <button className="toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
