import React from "react";
import { createBrowserRouter } from "react-router-dom";

/**
 * Placeholder pages for routing to be implemented later.
 */
function Placeholder({ title }) {
  return (
    <div>
      <h1 className="page-title">{title}</h1>
      <p className="subtle">Contenido próximamente...</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export function buildRouter(AppShell) {
  /**
   * Builds the router using the provided AppShell layout which contains Header, Sidebar, and an Outlet area.
   * Returns a BrowserRouter instance to be used by RouterProvider.
   */
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppShell />,
      children: [
        { index: true, element: <Placeholder title="Dashboard" /> },
        { path: "consultoria", element: <Placeholder title="Consultoría IA" /> },
        { path: "soporte", element: <Placeholder title="Soporte Técnico" /> },
        { path: "reputacion", element: <Placeholder title="Reputación Digital" /> },
        { path: "elevacion", element: <Placeholder title="Sector Elevación" /> },
        { path: "ajustes", element: <Placeholder title="Ajustes" /> }
      ]
    }
  ]);

  return router;
}

export default buildRouter;
