import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tarjeta from "../componets/Tarjeta";
import Button from "../componets/Button";
import { vehiculos as datosBase, type Auto } from "../data/Auto";

interface ReservaAdmin {
  id: string;
  cliente: string;
  vehiculo: string;
  estado: string;
  badgeClase: string;
}

function Admin() {
  const navigate = useNavigate();
  const [listaAutos, setListaAutos] = useState<Auto[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [idCar, setIdCar] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [img, setImg] = useState("/assets/lambo.jpg");
  const [desc, setDesc] = useState("");

  const reservasEjemplo: ReservaAdmin[] = [
    {
      id: "001",
      cliente: "Carlos Pérez",
      vehiculo: "Mercedes-Benz Clase S",
      estado: "Confirmado",
      badgeClase: "bg-success",
    },
    {
      id: "002",
      cliente: "María Gómez",
      vehiculo: "Lamborghini Huracán",
      estado: "Pendiente",
      badgeClase: "bg-warning text-dark",
    },
  ];

  useEffect(() => {
    const rol = localStorage.getItem("rolUsuario");
    if (rol !== "admin") {
      alert("Acceso denegado. Debes identificarte como Administrador.");
      navigate("/login");
      return;
    }

    const guardados = localStorage.getItem("catalogoAutos");
    if (guardados) {
      setListaAutos(JSON.parse(guardados));
    } else {
      setListaAutos(datosBase);
      localStorage.setItem("catalogoAutos", JSON.stringify(datosBase));
    }
  }, [navigate]);

  const handleGuardarAuto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCar || !marca || !modelo || !precio) {
      alert("Por favor completa los campos del vehículo.");
      return;
    }

    const nuevoAuto: Auto = {
      id: idCar.toLowerCase().trim(),
      nombre: `${marca} ${modelo}`,
      precio: Number(precio),
      desc: desc || "Vehículo de alta gama disponible para arriendo.",
      img: img,
    };

    const actualizados = [...listaAutos, nuevoAuto];
    setListaAutos(actualizados);
    localStorage.setItem("catalogoAutos", JSON.stringify(actualizados));
    alert("¡Vehículo agregado al catálogo con éxito!");

    // Limpiar formulario y ocultar
    setIdCar("");
    setMarca("");
    setModelo("");
    setPrecio("");
    setDesc("");
    setMostrarFormulario(false);
  };

  const handleEliminar = (id: string, nombre: string) => {
    if (window.confirm(`¿Deseas eliminar el vehículo "${nombre}"?`)) {
      const filtrados = listaAutos.filter((a) => a.id !== id);
      setListaAutos(filtrados);
      localStorage.setItem("catalogoAutos", JSON.stringify(filtrados));
    }
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("rolUsuario");
    navigate("/");
  };

  return (
    <div className="container py-4 text-white">
      {/* CABECERA ADMIN */}
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
            alHacerClic={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Ocultar Formulario" : "+ Agregar Vehículo"}
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

      {/* MÉTRICAS DE HOMEADMIN.HTML */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card bg-dark border-secondary p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-secondary small">
                  Autos en Inventario
                </span>
                <h3 className="text-white mt-1 mb-0">{listaAutos.length}</h3>
              </div>
              <span className="fs-1 text-warning">🚗</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-dark border-secondary p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-secondary small">
                  Clientes Registrados
                </span>
                <h3 className="text-white mt-1 mb-0">42</h3>
              </div>
              <span className="fs-1 text-warning">👥</span>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE PROCESOCATALOGOADMIN.HTML */}
      {mostrarFormulario && (
        <div className="card bg-dark border-warning p-4 rounded-4 shadow mb-5">
          <h4 className="text-warning fw-bold mb-3">
            Datos del Nuevo Vehículo
          </h4>
          <form onSubmit={handleGuardarAuto}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-light small">
                  ID del Vehículo
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej: audia4"
                  className="form-control bg-black text-white border-secondary"
                  value={idCar}
                  onChange={(e) => setIdCar(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-light small">Marca</label>
                <input
                  type="text"
                  required
                  placeholder="ej: Audi"
                  className="form-control bg-black text-white border-secondary"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-light small">Modelo</label>
                <input
                  type="text"
                  required
                  placeholder="ej: A4 Sportback"
                  className="form-control bg-black text-white border-secondary"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-light small">
                  Precio Diario ($)
                </label>
                <input
                  type="number"
                  required
                  min={1000}
                  placeholder="ej: 350000"
                  className="form-control bg-black text-white border-secondary"
                  value={precio}
                  onChange={(e) =>
                    setPrecio(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-light small">
                  Seleccionar Foto
                </label>
                <select
                  className="form-select bg-black text-white border-secondary"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                >
                  <option value="/assets/mercedes.jpeg">
                    Mercedes-Benz (/assets/mercedes.jpeg)
                  </option>
                  <option value="/assets/lambo.jpg">
                    Lamborghini (/assets/lambo.jpg)
                  </option>
                  <option value="/assets/ferrari.jpg">
                    Ferrari (/assets/ferrari.jpg)
                  </option>
                  <option value="/assets/rollsRoyce.jpg">
                    Rolls Royce (/assets/rollsRoyce.jpg)
                  </option>
                  <option value="/assets/Mclarenjpg.jpg">
                    McLaren (/assets/Mclarenjpg.jpg)
                  </option>
                  <option value="/assets/bugatti.jpg">
                    Bugatti (/assets/bugatti.jpg)
                  </option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label text-light small">
                  Especificaciones / Detalles
                </label>
                <input
                  type="text"
                  placeholder="Transmisión, motor, etc."
                  className="form-control bg-black text-white border-secondary"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-end gap-2">
              <Button
                clase="btn btn-outline-secondary"
                alHacerClic={() => setMostrarFormulario(false)}
              >
                Cancelar
              </Button>
              <Button
                clase="btn btn-warning fw-bold text-dark"
                alHacerClic={() => {}}
              >
                Confirmar Nuevo Vehículo
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* CATÁLOGO DE AUTOS CON COMPONENTE TARJETA */}
      <h4 className="text-warning fw-bold mb-3">Catálogo de Flota</h4>
      <div className="row g-4 mb-5">
        {listaAutos.map((auto) => (
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
                  alHacerClic={() => handleEliminar(auto.id, auto.nombre)}
                >
                  Eliminar
                </Button>
              </div>
            </Tarjeta>
          </div>
        ))}
      </div>

      {/* TABLA DE ÚLTIMAS RESERVAS (HOMEADMIN.HTML) */}
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
              {reservasEjemplo.map((res) => (
                <tr key={res.id}>
                  <td>{res.id}</td>
                  <td>{res.cliente}</td>
                  <td>{res.vehiculo}</td>
                  <td>
                    <span className={`badge ${res.badgeClase}`}>
                      {res.estado}
                    </span>
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
