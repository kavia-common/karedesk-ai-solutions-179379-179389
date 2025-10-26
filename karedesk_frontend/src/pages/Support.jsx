import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { createTicket } from "../services/api";

/**
 * Support page: ticket intake form (UI only).
 */
// PUBLIC_INTERFACE
export default function Support() {
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const payload = { subject, priority, description };
      await createTicket(payload);
      setMessage("Ticket creado correctamente.");
      setSubject("");
      setPriority("normal");
      setDescription("");
    } catch (err) {
      setMessage(err.message || "No se pudo crear el ticket");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="main-toolbar">
        <h1 className="page-title">Soporte Técnico</h1>
        <Button variant="outline">Historial</Button>
      </div>

      <Card title="Crear ticket" subtitle="Describe tu incidencia">
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 640 }}>
          <div>
            <label className="subtle">Asunto</label>
            <input
              className="input"
              placeholder="Problema con acceso..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="subtle">Prioridad</label>
            <select
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="baja">Baja</option>
              <option value="normal">Normal</option>
              <option value="alta">Alta</option>
              <option value="crítica">Crítica</option>
            </select>
          </div>
          <div>
            <label className="subtle">Descripción</label>
            <textarea
              className="input"
              rows={5}
              placeholder="Cuéntanos más..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {message && (
            <div className="subtle" style={{ color: message.includes("correctamente") ? "var(--color-text)" : "var(--color-error)" }}>
              {message}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button variant="outline" type="reset" onClick={() => { setSubject(""); setPriority("normal"); setDescription(""); }}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
