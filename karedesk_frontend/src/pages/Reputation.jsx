import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getReputationSummary, createReputationRecord } from "../services/api";

/**
 * Reputation page: summary metrics and actions.
 */
// PUBLIC_INTERFACE
export default function Reputation() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const data = await getReputationSummary();
      setSummary(data || {});
    } catch (e) {
      setErr(e.message || "Error cargando reputación");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleNewAnalysis() {
    try {
      await createReputationRecord({ type: "analysis", note: "Manual trigger" });
      await load();
    } catch (e) {
      alert(e.message || "No se pudo crear el análisis");
    }
  }

  return (
    <div>
      <div className="main-toolbar">
        <h1 className="page-title">Reputación Digital</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="outline" onClick={load}>Actualizar</Button>
          <Button onClick={handleNewAnalysis}>Nuevo análisis</Button>
        </div>
      </div>
      {loading ? (
        <div className="subtle">Cargando...</div>
      ) : err ? (
        <div style={{ color: "var(--color-error)" }}>{err}</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          <Card title="Valoración media" subtitle="Últimos 30 días">
            <div style={{ fontSize: 28, fontWeight: 800 }}>{summary?.rating || 4.6}</div>
          </Card>
          <Card title="Menciones positivas" subtitle="Social">
            <div style={{ fontSize: 28, fontWeight: 800 }}>{summary?.positiveMentions || 312}</div>
          </Card>
          <Card
            title="Alertas"
            subtitle="Críticas o urgentes"
            actions={
              <span
                className="badge"
                style={{ background: "rgba(239,68,68,.12)", color: "var(--color-error)" }}
              >
                {summary?.alerts || 0}
              </span>
            }
          >
            <p className="subtle">
              {summary?.alerts
                ? "Se han detectado reseñas que requieren respuesta."
                : "No hay alertas críticas."}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="ghost">Ver</Button>
              <Button variant="outline">Responder</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
