import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

/**
 * Support page: ticket intake form (UI only).
 */
// PUBLIC_INTERFACE
export default function Support() {
  return (
    <div>
      <div className="main-toolbar">
        <h1 className="page-title">Soporte Técnico</h1>
        <Button variant="outline">Historial</Button>
      </div>

      <Card title="Crear ticket" subtitle="Describe tu incidencia">
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "grid", gap: 12, maxWidth: 640 }}
        >
          <div>
            <label className="subtle">Asunto</label>
            <input className="input" placeholder="Problema con acceso..." />
          </div>
          <div>
            <label className="subtle">Prioridad</label>
            <select className="input" defaultValue="normal">
              <option value="baja">Baja</option>
              <option value="normal">Normal</option>
              <option value="alta">Alta</option>
              <option value="crítica">Crítica</option>
            </select>
          </div>
          <div>
            <label className="subtle">Descripción</label>
            <textarea className="input" rows={5} placeholder="Cuéntanos más..." />
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button variant="outline" type="reset">Cancelar</Button>
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
