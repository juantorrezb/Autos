import { Fragment } from "react/jsx-runtime";
import Tarjeta from "../componets/Tarjeta";
import Button from "../componets/Button";
import { vehiculos } from "../data/Auto";

function Index() {
  const handleAlquilar = (nombre: string) => {
    alert(`Vehículo seleccionado: ${nombre}`);
  };

  return (
    <Fragment>
      <h3 className="text-center text-white" style={{ margin: "20px" }}>
        Vehículos Disponibles para Arriendo
      </h3>

      {/* Contenedor estándar de Bootstrap */}
      <div className="container text-center mb-5">
        <div className="row g-4 justify-content-center">
          {vehiculos.map((auto) => (
            <div className="col-md-4 d-flex justify-content-center" key={auto.id}>
              <Tarjeta
                titulo={auto.nombre}
                texto={auto.desc}
                urlImagen={auto.img}
                altImagen={auto.nombre}
                clase="card bg-dark text-white border-secondary h-100 shadow-sm"
              >
                <p className="card-text fw-bold text-warning fs-5">
                  ${auto.precio.toLocaleString("es-CL")} / día
                </p>
                <div className="d-flex justify-content-center gap-2 mt-auto">
                  <Button
                    clase="btn btn-outline-light btn-sm"
                    alHacerClic={() => alert(`Ficha técnica de: ${auto.nombre}`)}
                  >
                    Ver Detalle
                  </Button>
                  <Button
                    clase="btn btn-warning btn-sm fw-semibold"
                    alHacerClic={() => handleAlquilar(auto.nombre)}
                  >
                    Alquilar
                  </Button>
                </div>
              </Tarjeta>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Index;