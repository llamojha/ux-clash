"use client"

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="es">
      <body style={{ background: "#1a1a2e", color: "#f5f5f5", display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Algo salió mal</h1>
          <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", opacity: 0.6 }}>
            Ocurrió un error inesperado.
          </p>
          <button
            onClick={reset}
            style={{ marginTop: "1.5rem", background: "#f5f5f5", color: "#1a1a2e", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  )
}
