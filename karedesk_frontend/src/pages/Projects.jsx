import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

/**
 * Projects page: overview of current projects.
 */
// PUBLIC_INTERFACE
export default function Projects() {
  const projects = [
    { id: "KDX-01", name: "Web corporativa", status: "En progreso" },
    { id: "KDX-02", name: "Chatbot IA", status: "Planificación" },
    { id: "KDX-03", name: "App soporte", status: "En progreso" }
  ];

  return (
    <div>
      <div className="main-toolbar">
        <h1 className="page-title">Proyectos</h1>
        <Button>Nuevo proyecto</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {projects.map((p) => (
          <Card
            key={p.id}
            title={p.name}
            subtitle={p.id}
            actions={<span className="badge">{p.status}</span>}
          >
            <p className="subtle" style={{ marginTop: 8 }}>
              Proyecto orientado a resultados con entregables semanales.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Button variant="ghost">Abrir</Button>
              <Button variant="outline">Archivar</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
