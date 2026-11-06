import { useState } from "react";
import { Link } from "react-router-dom";
import Contenedor from "../componets/Contenedor";
import Tarjeta from "../componets/Tarjeta";
import Button from "../componets/Button";
import { vehiculos, type Auto } from "../data/Auto";

function Index() {
  // Catálogo guardado por el Admin, o el catálogo base si no hay uno
  const [autos] = useState<Auto[]>(() => {
    const guardados = localStorage.getItem("catalogoAutos");
    return guardados ? JSON.parse(guardados) : vehiculos;
  });

  const alquilar = (auto: Auto) => {
    const carrito = JSON.parse(localStorage.getItem("carritoCompras") || "[]");
    const existe = carrito.find((item: Auto) => item.id === auto.id);

    if (existe) existe.cantidad += 1;
    else carrito.push({ ...auto, cantidad: 1 });

    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    alert(`¡${auto.nombre} añadido a la reserva!`);
  };

  return (
    <>
      <h3 className="text-center text-white" style={{ margin: "20px" }}>
        Vehículos Disponibles para Arriendo
      </h3>

      <Contenedor clase="container text-center mb-5">
        <div className="row g-4 justify-content-center">
          {autos.map((auto) => (
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
                  <Button
                    clase="btn btn-warning btn-sm fw-semibold"
                    alHacerClic={() => alquilar(auto)}
                  >
                    Alquilar
                  </Button>
                </div>
              </Tarjeta>
            </div>
          ))}
        </div>
      </Contenedor>
    </>
  );
}

export default Index;
