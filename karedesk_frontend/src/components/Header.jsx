import React from "react";

// PUBLIC_INTERFACE
export default function Header({ onToggleSidebar, title = "Karedesk", actions = null }) {
  /**
   * Header component
   * Renders the top navigation/header bar with brand, optional actions, and accessibility features.
   */
  return (
    <header className="app-header" role="banner" aria-label="Top navigation">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          className="btn ghost"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar navigation"
          title="Toggle sidebar"
        >
          ☰
        </button>
        <strong style={{ fontSize: 18, color: "var(--color-text)" }}>{title}</strong>
        <span className="badge" aria-label="Application theme">Ocean Professional</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {actions}
        <a
          className="btn outline"
          href="/"
          onClick={(e) => e.preventDefault()}
          aria-label="Notifications"
          title="Notifications"
        >
          🔔
        </a>
        <button className="btn" aria-label="Quick action" title="Quick action">
          ➕ New
        </button>
      </div>
    </header>
  );
}
