import React from "react";
import "./App.css";
import "./index.css";
import { RouterProvider, Outlet } from "react-router-dom";
import { buildRouter } from "./routes";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

/**
 * AppShell composes the fixed sidebar, top header, and main content area with an Outlet for routed pages.
 */
function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <Header />
      <main className="app-main" role="main">
        <Outlet />
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application component that mounts the router provider using the AppShell layout.
   */
  const router = buildRouter(AppShell);
  return <RouterProvider router={router} />;
}

export default App;
