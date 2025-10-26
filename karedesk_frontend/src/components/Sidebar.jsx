import React from "react";
import { NavLink } from "react-router-dom";

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const linkBase = {
  padding: "10px 12px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "var(--color-text)",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "var(--transition-base)",
};

function getLinkStyle({ isActive }) {
  return {
    ...linkBase,
    background: isActive ? "rgba(37,99,235,0.08)" : "transparent",
    color: isActive ? "var(--color-primary)" : "var(--color-text)",
  };
}

// PUBLIC_INTERFACE
export default function Sidebar() {
  /**
   * Sidebar component
   * Provides primary navigation on the left with clear focus states and active highlighting.
   */
  return (
    <aside className="app-sidebar" aria-label="Primary navigation">
      <nav style={navStyle}>
        <NavLink to="/" style={getLinkStyle} end>
          <span>🏠</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/usuarios" style={getLinkStyle}>
          <span>👥</span>
          <span>Usuarios</span>
        </NavLink>
        <NavLink to="/proyectos" style={getLinkStyle}>
          <span>📁</span>
          <span>Proyectos</span>
        </NavLink>
        <NavLink to="/soporte" style={getLinkStyle}>
          <span>🛠️</span>
          <span>Soporte Técnico</span>
        </NavLink>
        <NavLink to="/reputacion" style={getLinkStyle}>
          <span>⭐</span>
          <span>Reputación Digital</span>
        </NavLink>
      </nav>
      <div style={{ marginTop: "auto", fontSize: 12, color: "#6b7280" }}>
        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Karedesk</div>
          <div>Consultoría IA Express</div>
        </div>
      </div>
    </aside>
  );
}
