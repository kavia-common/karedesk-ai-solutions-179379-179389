import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getProjects, createProject } from "../services/api";

/**
 * Projects page: overview of current projects.
 */
// PUBLIC_INTERFACE
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const data = await getProjects();
        if (!ignore) {
          setProjects(Array.isArray(data) ? data : data?.items || []);
        }
      } catch (e) {
        if (!ignore) setErr(e.message || "Error cargando proyectos");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleNewProject() {
    try {
      const name = window.prompt("Nombre del proyecto:");
      if (!name) return;
      const status = window.prompt("Estado (Planificación/En progreso/Completado):", "Planificación") || "Planificación";
      const created = await createProject({ name, status });
      setProjects((prev) => [created, ...prev]);
    } catch (e) {
      alert(e.message || "No se pudo crear el proyecto");
    }
  }

  return (
    <div>
      <div className="main-toolbar">
        <h1 className="page-title">Proyectos</h1>
        <Button onClick={handleNewProject}>Nuevo proyecto</Button>
      </div>
      {loading ? (
        <div className="subtle">Cargando...</div>
      ) : err ? (
        <div style={{ color: "var(--color-error)" }}>{err}</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {projects.map((p) => (
            <Card
              key={p.id || p._id || p.name}
              title={p.name}
              subtitle={p.key || p.code || p.id}
              actions={<span className="badge">{p.status || "En progreso"}</span>}
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
          {projects.length === 0 && <div className="subtle">No hay proyectos aún.</div>}
        </div>
      )}
    </div>
  );
}
