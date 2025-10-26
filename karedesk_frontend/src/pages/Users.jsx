import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getUsers, createUser } from "../services/api";

/**
 * Users management page: list with simple actions.
 */
// PUBLIC_INTERFACE
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const data = await getUsers();
        if (!ignore) {
          // Normalize array from API or use empty list fallback
          setUsers(Array.isArray(data) ? data : data?.items || []);
        }
      } catch (e) {
        if (!ignore) setErr(e.message || "Error cargando usuarios");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleInvite() {
    try {
      const name = window.prompt("Nombre del usuario:");
      if (!name) return;
      const role = window.prompt("Rol (Admin/Editor/Viewer):", "Viewer") || "Viewer";
      const created = await createUser({ name, role });
      // Optimistic update: append to list
      setUsers((prev) => [...prev, created]);
    } catch (e) {
      alert(e.message || "No se pudo crear el usuario");
    }
  }

  return (
    <div>
      <div className="main-toolbar">
        <h1 className="page-title">Usuarios</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={handleInvite}>Invitar</Button>
          <Button variant="outline">Exportar</Button>
        </div>
      </div>
      <Card title="Equipo" subtitle="Miembros y roles">
        {loading ? (
          <div className="subtle">Cargando...</div>
        ) : err ? (
          <div style={{ color: "var(--color-error)" }}>{err}</div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {users.map((u) => (
              <div
                key={u.id || u._id || u.email || u.name}
                className="card"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12 }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{u.name || u.email}</div>
                  <div className="subtle">{u.role || "Usuario"}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant="ghost">Editar</Button>
                  <Button variant="outline">Quitar</Button>
                </div>
              </div>
            ))}
            {users.length === 0 && <div className="subtle">No hay usuarios aún.</div>}
          </div>
        )}
      </Card>
    </div>
  );
}
