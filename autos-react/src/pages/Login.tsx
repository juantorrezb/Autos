import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Si es la cuenta del Administrador:
    if (correo === "admin@autos.cl" && password === "admin123") {
      localStorage.setItem("rolUsuario", "admin");
      alert("¡Acceso concedido! Entrando al Panel de Administración.");
      navigate("/admin");
      return;
    }

    // 2. Si es un cliente común:
    if (correo && password) {
      localStorage.setItem("rolUsuario", "cliente");
      alert(`Sesión iniciada con éxito.`);
      navigate("/");
      return;
    }

    alert("Por favor completa los campos.");
  };

  return (
    <div className="container py-5 text-white">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card bg-dark border-secondary p-4 p-md-5 shadow-lg rounded-4 text-center">
            <h2 className="text-warning fw-bold mb-3">Iniciar Sesión</h2>
            <p className="text-secondary small mb-4">
              Ingresa tus credenciales para continuar
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-3 text-start">
                <label className="form-label text-light small">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@autos.cl"
                  className="form-control bg-black text-white border-secondary"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label text-light small">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  placeholder="admin123"
                  className="form-control bg-black text-white border-secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 py-2 fw-bold text-dark mb-3"
              >
                Ingresar
              </button>

              <div className="p-2 border border-secondary rounded bg-black text-secondary small mb-3">
                <span className="text-warning fw-bold">
                  Cuenta Admin de prueba:
                </span>
                <br />
                admin@autos.cl / admin123
              </div>

              <Link
                to="/"
                className="text-secondary text-decoration-none small d-block"
              >
                ← Volver al Catálogo
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
