import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

/**
 * Reputation page: summary metrics and actions.
 */
// PUBLIC_INTERFACE
export default function Reputation() {
  return (
    <div>
      <div className="main-toolbar">
        <h1 className="page-title">Reputación Digital</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="outline">Actualizar</Button>
          <Button>Nuevo análisis</Button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        <Card title="Valoración media" subtitle="Últimos 30 días">
          <div style={{ fontSize: 28, fontWeight: 800 }}>4.6</div>
        </Card>
        <Card title="Menciones positivas" subtitle="Social">
          <div style={{ fontSize: 28, fontWeight: 800 }}>312</div>
        </Card>
        <Card title="Alertas" subtitle="Críticas o urgentes" actions={<span className="badge" style={{ background: "rgba(239,68,68,.12)", color: "var(--color-error)" }}>2</span>}>
          <p className="subtle">Hemos detectado dos reseñas que requieren respuesta.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost">Ver</Button>
            <Button variant="outline">Responder</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
