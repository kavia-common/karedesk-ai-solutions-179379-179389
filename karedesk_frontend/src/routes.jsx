import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Support from "./pages/Support";
import Reputation from "./pages/Reputation";
import NotFound from "./pages/NotFound";

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
        { index: true, element: <Dashboard /> },
        { path: "usuarios", element: <Users /> },
        { path: "proyectos", element: <Projects /> },
        { path: "soporte", element: <Support /> },
        { path: "reputacion", element: <Reputation /> },
        // legacy/other placeholders can be added here as needed
        { path: "*", element: <NotFound /> }
      ]
    }
  ]);

  return router;
}

export default buildRouter;
