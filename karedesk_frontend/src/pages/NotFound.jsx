import React from "react";
import Button from "../components/ui/Button";

/**
 * NotFound page for undefined routes.
 */
// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div>
      <h1 className="page-title">Página no encontrada</h1>
      <p className="subtle">La ruta solicitada no existe o fue movida.</p>
      <div style={{ marginTop: 12 }}>
        <Button as="a" href="/">Volver al inicio</Button>
      </div>
    </div>
  );
}
