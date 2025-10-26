import React from "react";
import PropTypes from "prop-types";

/**
 * Card container with Ocean Professional styling.
 * Supports optional header and footer sections and hover elevation.
 */
// PUBLIC_INTERFACE
export default function Card({
  title,
  subtitle,
  actions,
  footer,
  children,
  className = "",
  hover = true,
  style = {}
}) {
  return (
    <section
      className={`card ${className}`}
      style={{
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-md)",
        padding: 16,
        transition: "var(--transition-base)",
        ...(hover ? { transform: "translateZ(0)" } : {}),
        ...style
      }}
    >
      {(title || subtitle || actions) && (
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--color-text)"
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <div className="subtle" style={{ marginTop: 4 }}>
                {subtitle}
              </div>
            )}
          </div>
          {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
        </header>
      )}
      <div>{children}</div>
      {footer && <footer style={{ marginTop: 12 }}>{footer}</footer>}
    </section>
  );
}

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  style: PropTypes.object
};
