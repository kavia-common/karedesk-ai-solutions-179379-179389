import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

/**
 * Modal component with overlay, focus trap basics, and Ocean Professional styling.
 * Uses aria-modal, role dialog, and Esc/overlay click to close.
 */
// PUBLIC_INTERFACE
export default function Modal({
  open,
  title = "Modal",
  description,
  onClose,
  actions,
  children
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(17,24,39,0.45)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50,
        animation: "fadeIn 180ms ease-in"
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-desc" : undefined}
        className="card"
        style={{
          width: "100%",
          maxWidth: 560,
          padding: 20,
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          transform: "translateY(4px)",
          animation: "slideUp 220ms ease-out"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8
          }}
        >
          <h2 id="modal-title" className="page-title" style={{ fontSize: 18 }}>
            {title}
          </h2>
          <Button variant="ghost" onClick={onClose} aria-label="Cerrar modal">
            ✖
          </Button>
        </div>
        {description && (
          <p id="modal-desc" className="subtle" style={{ marginTop: 0 }}>
            {description}
          </p>
        )}
        <div style={{ marginTop: 12 }}>{children}</div>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            marginTop: 16
          }}
        >
          {actions || (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button>Confirmar</Button>
            </>
          )}
        </div>
      </div>
      <style>
        {`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}
      </style>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func,
  actions: PropTypes.node,
  children: PropTypes.node
};
