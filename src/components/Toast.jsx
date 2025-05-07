import { useEffect } from "react";
import "../components/css/toast.css";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container-login">
      <div className={`toast-my toast-${type}`}>
        <span className="toast-icon">🔥</span>
        <span className="toast-text">{message}</span>
        <span className="toast-decoration explosion"></span>
      </div>
    </div>
  );
}