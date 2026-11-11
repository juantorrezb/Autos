import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../componets/Button";
import { validarFormulario, reglasLogin } from "../utils/validaciones";

function Login() {
  const [datos, setDatos] = useState({ correo: "", password: "" });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [esRegistro, setEsRegistro] = useState(false); // Alterna entre Login y Registro
  const navigate = useNavigate();

  // Un solo handler para los dos inputs (usa el atributo "name")
  const cambiar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const claseInput = (campo: string) =>
    `form-control bg-black text-white border-secondary ${errores[campo] ? "is-invalid" : ""}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = validarFormulario(datos, reglasLogin);
    setErrores(resultado.errores);
    if (!resultado.esValido) return;

    const usuarios = JSON.parse(
      localStorage.getItem("usuariosRegistrados") || "[]",
    );
    // MODO 1: REGISTRARSE
    if (esRegistro) {
      if (usuarios.some((u: any) => u.correo === datos.correo)) {
        setErrores({ correo: "Este correo ya se encuentra registrado." });
        return;
      }

      usuarios.push(datos);
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
      alert("¡Cuenta registrada con éxito! Ahora puedes ingresar.");
      setEsRegistro(false);
      return;
    }

    // MODO 2: INICIAR SESIÓN
    const esAdmin =
      datos.correo === "admin@autos.cl" && datos.password === "admin123";
    const esCliente = usuarios.some(
      (u: any) => u.correo === datos.correo && u.password === datos.password,
    );

    if (esAdmin || esCliente) {
      localStorage.setItem("rolUsuario", esAdmin ? "admin" : "cliente");
      alert(
        esAdmin
          ? "¡Acceso concedido! Entrando al Panel de Administración."
          : "Sesión iniciada con éxito.",
      );
      navigate(esAdmin ? "/admin" : "/");
    } else {
      alert("Credenciales incorrectas o usuario no registrado.");
    }
  };

  return (
    <div className="container py-5 text-white">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card bg-dark border-secondary p-4 p-md-5 shadow-lg rounded-4 text-center">
            <h2 className="text-warning fw-bold mb-3">
              {esRegistro ? "Crear Cuenta" : "Iniciar Sesión"}
            </h2>
            <p className="text-secondary small mb-4">
              {esRegistro
                ? "Regístrate para reservar vehículos"
                : "Ingresa tus credenciales para continuar"}
            </p>

            <form onSubmit={handleSubmit} noValidate>
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
                {esRegistro ? "Registrarse" : "Ingresar"}
              </Button>

              {/* Botón simple para cambiar entre Login y Registro sin alterar el diseño */}
              <button
                type="button"
                className="btn btn-link text-warning text-decoration-none small d-block mx-auto mb-3"
                onClick={() => {
                  setEsRegistro(!esRegistro);
                  setErrores({});
                }}
              >
                {esRegistro
                  ? "¿Ya tienes cuenta? Inicia sesión aquí"
                  : "¿No tienes cuenta? Regístrate aquí"}
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
