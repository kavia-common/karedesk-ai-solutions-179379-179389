import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

/**
 * Users management page: list with simple actions.
 */
// PUBLIC_INTERFACE
export default function Users() {
  const users = [
    { id: 1, name: "Ana Gómez", role: "Admin" },
    { id: 2, name: "Carlos Pérez", role: "Editor" },
    { id: 3, name: "Laura Sánchez", role: "Viewer" }
  ];

  return (
    <div>
      <div className="main-toolbar">
        <h1 className="page-title">Usuarios</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Button>Invitar</Button>
          <Button variant="outline">Exportar</Button>
        </div>
      </div>
      <Card title="Equipo" subtitle="Miembros y roles">
        <div style={{ display: "grid", gap: 8 }}>
          {users.map((u) => (
            <div
              key={u.id}
              className="card"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12 }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{u.name}</div>
                <div className="subtle">{u.role}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="ghost">Editar</Button>
                <Button variant="outline">Quitar</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
