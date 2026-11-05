import { Fragment } from "react/jsx-runtime";
import Button from "../componets/Button";
import { vehiculos } from "../data/Auto";

interface Props {
  idAuto: string;
  onCambiarPagina: (pagina: string) => void;
  onAlquilar: (nombre: string, precio: number) => void;
}

function Detalle({ idAuto, onCambiarPagina, onAlquilar }: Props) {
  // Buscar el auto según el identificador recibido
  const auto = vehiculos.find(
    (v) => v.id.toLowerCase() === idAuto.toLowerCase(),
  );

  if (!auto) {
    return (
      <div className="container py-5 text-center text-white">
        <div className="alert alert-danger bg-dark border-danger text-white d-inline-block p-4 rounded-4 shadow">
          <h2 className="text-danger fw-bold">❌ Vehículo no encontrado</h2>
          <p className="text-secondary">
            El auto seleccionado no existe o no está disponible.
          </p>
          <Button
            clase="btn btn-warning mt-3 fw-semibold"
            alHacerClic={() => onCambiarPagina("inicio")}
          >
            Volver al Catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="container py-5 text-white">
        <div className="row align-items-center g-5">
          <div className="col-md-6 text-center">
            <img
              src={auto.img}
              alt={auto.nombre}
              className="img-fluid rounded-4 shadow-lg border border-secondary"
              style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <span className="badge bg-warning text-dark px-3 py-2 fs-6 mb-3">
              Disponible para Reserva
            </span>
            <h1 className="fw-bold mb-3">{auto.nombre}</h1>
            <p
              className="fs-5 text-light opacity-75 mb-4"
              style={{ lineHeight: "1.6" }}
            >
              {auto.desc}
            </p>
            <h2 className="text-warning fw-bold my-4">
              ${auto.precio.toLocaleString("es-CL")}{" "}
              <span className="fs-5 text-secondary">/ día</span>
            </h2>
            <div className="d-flex gap-3 flex-wrap">
              <Button
                clase="btn btn-warning btn-lg px-4 fw-semibold"
                alHacerClic={() => onAlquilar(auto.nombre, auto.precio)}
              >
                🛒 Añadir a la Reserva
              </Button>
              <Button
                clase="btn btn-outline-light btn-lg px-4"
                alHacerClic={() => {
                  onAlquilar(auto.nombre, auto.precio);
                  onCambiarPagina("proceso");
                }}
              >
                Ir a Pagar
              </Button>
              <Button
                clase="btn btn-link text-secondary text-decoration-none align-self-center"
                alHacerClic={() => onCambiarPagina("inicio")}
              >
                ← Volver al Catálogo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Detalle;
