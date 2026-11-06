import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tarjeta from "../componets/Tarjeta";
import Button from "../componets/Button";
import { vehiculos, type Auto } from "../data/Auto";
import { validarFormulario, reglasAuto } from "../utils/validaciones";

const FOTOS = [
  { nombre: "Mercedes-Benz", ruta: "/assets/mercedes.jpeg" },
  { nombre: "Lamborghini", ruta: "/assets/lambo.jpg" },
  { nombre: "Ferrari", ruta: "/assets/ferrari.jpg" },
  { nombre: "Rolls Royce", ruta: "/assets/rollsRoyce.jpg" },
  { nombre: "McLaren", ruta: "/assets/Mclarenjpg.jpg" },
  { nombre: "Bugatti", ruta: "/assets/bugatti.jpg" },
];

const RESERVAS = [
  {
    id: "001",
    cliente: "Carlos Pérez",
    vehiculo: "Mercedes-Benz Clase S",
    estado: "Confirmado",
    badge: "bg-success",
  },
  {
    id: "002",
    cliente: "María Gómez",
    vehiculo: "Lamborghini Huracán",
    estado: "Pendiente",
    badge: "bg-warning text-dark",
  },
];

const FORM_VACIO = {
  idCar: "",
  marca: "",
  modelo: "",
  precio: "",
  img: "/assets/lambo.jpg",
  desc: "",
};

function Admin() {
  const navigate = useNavigate();

  const [autos, setAutos] = useState<Auto[]>(() => {
    const guardados = localStorage.getItem("catalogoAutos");
    return guardados ? JSON.parse(guardados) : vehiculos;
  });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState<Record<string, string>>({});

  // Solo el administrador puede entrar
  useEffect(() => {
    if (localStorage.getItem("rolUsuario") !== "admin") {
      alert("Acceso denegado. Debes identificarte como Administrador.");
      navigate("/login");
    }
  }, [navigate]);

  // Un solo handler para todos los campos (usa el atributo "name")
  const cambiar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const claseInput = (campo: string) =>
    `form-control bg-black text-white border-secondary ${errores[campo] ? "is-invalid" : ""}`;

  // Actualiza la pantalla y localStorage a la vez
  const actualizarAutos = (lista: Auto[]) => {
    setAutos(lista);
    localStorage.setItem("catalogoAutos", JSON.stringify(lista));
  };

  const handleGuardarAuto = (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = validarFormulario(
      form,
      reglasAuto(autos.map((a) => a.id.toLowerCase())),
    );
    setErrores(resultado.errores);
    if (!resultado.esValido) return;

    actualizarAutos([
      ...autos,
      {
        id: form.idCar.toLowerCase().trim(),
        nombre: `${form.marca.trim()} ${form.modelo.trim()}`,
        precio: Number(form.precio),
        desc:
          form.desc.trim() || "Vehículo de alta gama disponible para arriendo.",
        img: form.img,
      },
    ]);
    alert("¡Vehículo agregado al catálogo con éxito!");

    setForm(FORM_VACIO);
    setMostrarForm(false);
  };

  const handleEliminar = (auto: Auto) => {
    if (window.confirm(`¿Deseas eliminar el vehículo "${auto.nombre}"?`)) {
      actualizarAutos(autos.filter((a) => a.id !== auto.id));
    }
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("rolUsuario");
    navigate("/");
  };

  return (
    <div className="container py-4 text-white">
      {/* CABECERA */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary gap-3">
        <div>
          <h2 className="text-warning fw-bold mb-0">Panel de Administración</h2>
          <small className="text-secondary">
            Gestión de inventario y reservas
          </small>
        </div>
        <div className="d-flex gap-2">
          <Button
            clase="btn btn-warning fw-semibold btn-sm"
            alHacerClic={() => setMostrarForm(!mostrarForm)}
          >
            {mostrarForm ? "Ocultar Formulario" : "+ Agregar Vehículo"}
          </Button>
          <Link to="/" className="btn btn-outline-light btn-sm">
            Ver Tienda
          </Link>
          <Button
            clase="btn btn-outline-danger btn-sm"
            alHacerClic={handleCerrarSesion}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* MÉTRICAS */}
      <div className="row g-3 mb-4">
        {[
          { titulo: "Autos en Inventario", valor: autos.length, icono: "🚗" },
          { titulo: "Clientes Registrados", valor: 42, icono: "👥" },
        ].map((m) => (
          <div className="col-md-6" key={m.titulo}>
            <div className="card bg-dark border-secondary p-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-secondary small">{m.titulo}</span>
                  <h3 className="text-white mt-1 mb-0">{m.valor}</h3>
                </div>
                <span className="fs-1 text-warning">{m.icono}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FORMULARIO NUEVO VEHÍCULO */}
      {mostrarForm && (
        <div className="card bg-dark border-warning p-4 rounded-4 shadow mb-5">
          <h4 className="text-warning fw-bold mb-3">
            Datos del Nuevo Vehículo
          </h4>
          <form onSubmit={handleGuardarAuto} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-light small">
                  ID del Vehículo
                </label>
                <input
                  name="idCar"
                  type="text"
                  placeholder="ej: audia4"
                  className={claseInput("idCar")}
                  value={form.idCar}
                  onChange={cambiar}
                />
                {errores.idCar && (
                  <div className="invalid-feedback">{errores.idCar}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label text-light small">Marca</label>
                <input
                  name="marca"
                  type="text"
                  placeholder="ej: Audi"
                  className={claseInput("marca")}
                  value={form.marca}
                  onChange={cambiar}
                />
                {errores.marca && (
                  <div className="invalid-feedback">{errores.marca}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label text-light small">Modelo</label>
                <input
                  name="modelo"
                  type="text"
                  placeholder="ej: A4 Sportback"
                  className={claseInput("modelo")}
                  value={form.modelo}
                  onChange={cambiar}
                />
                {errores.modelo && (
                  <div className="invalid-feedback">{errores.modelo}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label text-light small">
                  Precio Diario ($)
                </label>
                <input
                  name="precio"
                  type="number"
                  placeholder="ej: 350000"
                  className={claseInput("precio")}
                  value={form.precio}
                  onChange={cambiar}
                />
                {errores.precio && (
                  <div className="invalid-feedback">{errores.precio}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label text-light small">
                  Seleccionar Foto
                </label>
                <select
                  name="img"
                  className="form-select bg-black text-white border-secondary"
                  value={form.img}
                  onChange={cambiar}
                >
                  {FOTOS.map((foto) => (
                    <option key={foto.ruta} value={foto.ruta}>
                      {foto.nombre} ({foto.ruta})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label text-light small">
                  Especificaciones / Detalles
                </label>
                <input
                  name="desc"
                  type="text"
                  placeholder="Transmisión, motor, etc."
                  className={claseInput("desc")}
                  value={form.desc}
                  onChange={cambiar}
                />
                {errores.desc && (
                  <div className="invalid-feedback">{errores.desc}</div>
                )}
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <Button
                clase="btn btn-outline-secondary"
                alHacerClic={() => setMostrarForm(false)}
              >
                Cancelar
              </Button>
              <Button tipo="submit" clase="btn btn-warning fw-bold text-dark">
                Confirmar Nuevo Vehículo
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* CATÁLOGO */}
      <h4 className="text-warning fw-bold mb-3">Catálogo de Flota</h4>
      <div className="row g-4 mb-5">
        {autos.map((auto) => (
          <div className="col-md-4 d-flex justify-content-center" key={auto.id}>
            <Tarjeta
              titulo={auto.nombre}
              texto={auto.desc}
              urlImagen={auto.img}
              altImagen={auto.nombre}
              clase="card bg-dark text-white border-secondary h-100 shadow-sm"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-warning fw-bold">ID: #{auto.id}</span>
                <span className="fw-bold">
                  ${auto.precio.toLocaleString("es-CL")}/d
                </span>
              </div>
              <div className="d-flex gap-2 mt-auto">
                <Link
                  to={`/detalle/${auto.id}`}
                  className="btn btn-outline-light btn-sm flex-grow-1"
                >
                  Ver Ficha
                </Link>
                <Button
                  clase="btn btn-outline-danger btn-sm"
                  alHacerClic={() => handleEliminar(auto)}
                >
                  Eliminar
                </Button>
              </div>
            </Tarjeta>
          </div>
        ))}
      </div>

      {/* ÚLTIMAS RESERVAS */}
      <div className="card bg-dark border-secondary p-4 rounded-4 shadow-sm">
        <h5 className="text-warning fw-bold mb-3">
          Últimas Reservas Registradas
        </h5>
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-secondary small">
                <th>#</th>
                <th>Cliente</th>
                <th>Vehículo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {RESERVAS.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.cliente}</td>
                  <td>{r.vehiculo}</td>
                  <td>
                    <span className={`badge ${r.badge}`}>{r.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
