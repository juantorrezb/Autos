import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Contenedor from "../componets/Contenedor";
import Tarjeta from "../componets/Tarjeta";
import Button from "../componets/Button";
import { vehiculos as datosBase, type Auto } from "../data/Auto";

function Index() {
  const [listaAutos, setListaAutos] = useState<Auto[]>([]);

  // Lee el catálogo modificado por el Admin desde localStorage
  useEffect(() => {
    const guardados = localStorage.getItem("catalogoAutos");
    if (guardados) {
      setListaAutos(JSON.parse(guardados));
    } else {
      setListaAutos(datosBase);
      localStorage.setItem("catalogoAutos", JSON.stringify(datosBase));
    }
  }, []);

  const handleAlquilar = (auto: Auto) => {
    const data = localStorage.getItem("carritoCompras");
    const carrito = data ? JSON.parse(data) : [];

    const existe = carrito.find((item: any) => item.id === auto.id);
    if (existe) {
      existe.cantidad = (existe.cantidad || 1) + 1;
    } else {
      carrito.push({ ...auto, cantidad: 1 });
    }

    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    window.dispatchEvent(new Event("storage"));
    alert(`¡${auto.nombre} añadido a la reserva!`);
  };

  return (
    <Fragment>
      <h3 className="text-center text-white" style={{ margin: "20px" }}>
        Vehículos Disponibles para Arriendo
      </h3>

      {/* Usando el componente Contenedor del profesor */}
      <Contenedor clase="container text-center mb-5">
        <div className="row g-4 justify-content-center">
          {listaAutos.map((auto) => (
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
                  {/* Usando el componente Button del profesor */}
                  <Button
                    clase="btn btn-warning btn-sm fw-semibold"
                    alHacerClic={() => handleAlquilar(auto)}
                  >
                    Alquilar
                  </Button>
                </div>
              </Tarjeta>
            </div>
          ))}
        </div>
      </Contenedor>
    </Fragment>
  );
}

export default Index;
