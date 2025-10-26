import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { getHealth } from "../services/api";

/**
 * Dashboard page shows overview metrics and quick actions.
 */
// PUBLIC_INTERFACE
export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 16
  };

  const tile = {
    gridColumn: "span 3",
    minWidth: 0
  };

  const responsive = `
  @media (max-width: 1200px){ .tile{ grid-column: span 6; } }
  @media (max-width: 640px){ .tile{ grid-column: span 12; } }
  `;

  // Lightweight backend health check
  const [health, setHealth] = useState({ status: "checking", message: "" });
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await getHealth();
        if (!ignore) {
          setHealth({ status: "ok", message: data?.message || "Backend activo" });
        }
      } catch (e) {
        if (!ignore) {
          setHealth({ status: "error", message: e.message || "Backend no disponible" });
        }
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <div>
      <style>{responsive}</style>
      <div className="main-toolbar">
        <h1 className="page-title">Dashboard</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            title={health.message || ""}
            aria-label={`Backend status: ${health.status}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 9999,
              fontSize: 12,
              background:
                health.status === "ok"
                  ? "rgba(16,185,129,0.12)"
                  : health.status === "checking"
                  ? "rgba(37,99,235,0.10)"
                  : "rgba(239,68,68,0.12)",
              color:
                health.status === "ok"
                  ? "#065f46"
                  : health.status === "checking"
                  ? "var(--color-primary)"
                  : "var(--color-error)",
              border:
                health.status === "ok"
                  ? "1px solid rgba(16,185,129,0.35)"
                  : health.status === "checking"
                  ? "1px solid rgba(37,99,235,0.25)"
                  : "1px solid rgba(239,68,68,0.25)"
            }}
          >
            <span>
              {health.status === "ok" ? "●" : health.status === "checking" ? "○" : "●"}
            </span>
            <span>
              {health.status === "ok"
                ? "Backend OK"
                : health.status === "checking"
                ? "Verificando backend..."
                : "Backend no disponible"}
            </span>
          </div>
          <Button onClick={() => setOpen(true)}>Nueva Acción</Button>
          <Button variant="outline">Exportar</Button>
        </div>
      </div>

      <div style={gridStyle}>
        <div className="tile" style={tile}>
          <Card
            title="Usuarios activos"
            subtitle="Últimos 24h"
            actions={<span className="badge">+12%</span>}
          >
            <div style={{ fontSize: 28, fontWeight: 800 }}>1,284</div>
          </Card>
        </div>
        <div className="tile" style={tile}>
          <Card
            title="Proyectos"
            subtitle="En progreso"
            actions={<span className="badge">7</span>}
          >
            <div style={{ fontSize: 28, fontWeight: 800 }}>19</div>
          </Card>
        </div>
        <div className="tile" style={tile}>
          <Card
            title="Tickets soporte"
            subtitle="Abiertos"
            actions={<span className="badge" style={{ background: "rgba(239,68,68,.12)", color: "var(--color-error)" }}>3 urgentes</span>}
          >
            <div style={{ fontSize: 28, fontWeight: 800 }}>24</div>
          </Card>
        </div>
        <div className="tile" style={tile}>
          <Card title="Reputación" subtitle="Índice general">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <div style={{ fontSize: 28, fontWeight: 800 }}>4.6</div>
              <span className="subtle">/ 5.0</span>
            </div>
          </Card>
        </div>

        <div style={{ gridColumn: "span 8" }}>
          <Card
            title="Actividad reciente"
            subtitle="Eventos del sistema"
            actions={<Button variant="ghost">Ver todo</Button>}
          >
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Nuevo proyecto creado por Ana</li>
              <li>Ticket de soporte resuelto #1281</li>
              <li>Usuario invitado: carlos@empresa.com</li>
            </ul>
          </Card>
        </div>
        <div style={{ gridColumn: "span 4" }}>
          <Card
            title="Accesos rápidos"
            actions={<Button variant="outline" href="/soporte">Abrir ticket</Button>}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button href="/usuarios" as="a">Usuarios</Button>
              <Button variant="outline" href="/proyectos" as="a">Proyectos</Button>
              <Button variant="ghost" href="/reputacion" as="a">Reputación</Button>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={open}
        title="Crear acción rápida"
        description="Inicia un flujo de trabajo común desde aquí."
        onClose={() => setOpen(false)}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => setOpen(false)}>Nuevo proyecto</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Invitar usuario
          </Button>
        </div>
      </Modal>
    </div>
  );
}
