import { Fragment } from "react/jsx-runtime";
import Tarjeta from "../componets/Tarjeta";
import { vehiculos } from "../data/Auto";
import { Link } from "react-router-dom";

function Index() {
  const handleAlquilar = (auto: (typeof vehiculos)[0]) => {
    const data = localStorage.getItem("carritoCompras");
    const carrito = data ? JSON.parse(data) : [];

    const existe = carrito.find((item: any) => item.id === auto.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      carrito.push({ ...auto, cantidad: 1 });
    }

    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    alert(`¡${auto.nombre} añadido a la reserva!`);
  };

  return (
    <Fragment>
      <h3 className="text-center text-white" style={{ margin: "20px" }}>
        Vehículos Disponibles para Arriendo
      </h3>

      <div className="container text-center mb-5">
        <div className="row g-4 justify-content-center">
          {/* Recorremos el arreglo vehiculos de Auto.ts */}
          {vehiculos.map((auto) => (
            <div
              className="col-md-4 d-flex justify-content-center"
              key={auto.id}
            >
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
                  <Link
                    to={`/detalle/${auto.id}`}
                    className="btn btn-outline-light btn-sm"
                  >
                    Detalle
                  </Link>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm fw-semibold"
                    onClick={() => handleAlquilar(auto)}
                  >
                    Alquilar
                  </button>
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
