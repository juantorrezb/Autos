import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../componets/Button";
import { validarFormulario, reglasLogin } from "../utils/validaciones";

function Login() {
  const [datos, setDatos] = useState({ correo: "", password: "" });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Un solo handler para los dos inputs (usa el atributo "name")
  const cambiar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const claseInput = (campo: string) =>
    `form-control bg-black text-white border-secondary ${errores[campo] ? "is-invalid" : ""}`;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = validarFormulario(datos, reglasLogin);
    setErrores(resultado.errores);
    if (!resultado.esValido) return;

    const esAdmin =
      datos.correo === "admin@autos.cl" && datos.password === "admin123";
    localStorage.setItem("rolUsuario", esAdmin ? "admin" : "cliente");

    alert(
      esAdmin
        ? "¡Acceso concedido! Entrando al Panel de Administración."
        : "Sesión iniciada con éxito.",
    );
    navigate(esAdmin ? "/admin" : "/");
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

            <form onSubmit={handleLogin} noValidate>
              <div className="mb-3 text-start">
                <label className="form-label text-light small">
                  Correo Electrónico
                </label>
                <input
                  name="correo"
                  type="email"
                  placeholder="admin@autos.cl"
                  className={claseInput("correo")}
                  value={datos.correo}
                  onChange={cambiar}
                />
                {errores.correo && (
                  <div className="invalid-feedback">{errores.correo}</div>
                )}
              </div>

              <div className="mb-4 text-start">
                <label className="form-label text-light small">
                  Contraseña
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="admin123"
                  className={claseInput("password")}
                  value={datos.password}
                  onChange={cambiar}
                />
                {errores.password && (
                  <div className="invalid-feedback">{errores.password}</div>
                )}
              </div>

              <Button
                tipo="submit"
                clase="btn btn-warning w-100 py-2 fw-bold text-dark mb-3"
              >
                Ingresar
              </Button>

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
