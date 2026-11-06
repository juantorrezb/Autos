import { Link, useParams } from "react-router-dom";
import Button from "../componets/Button";
import Contenedor from "../componets/Contenedor";
import { vehiculos, type Auto } from "../data/Auto";

function Detalle() {
  const { id } = useParams();

  // Busca en el catálogo guardado o en el base
  const guardados = localStorage.getItem("catalogoAutos");
  const lista: Auto[] = guardados ? JSON.parse(guardados) : vehiculos;
  const auto = lista.find((a) => a.id === id);

  if (!auto) {
    return (
      <Contenedor clase="container text-center my-5 text-white">
        <h2 className="text-danger my-5">Vehículo no encontrado</h2>
        <Link className="btn btn-outline-warning" to="/">
          Volver al Inicio
        </Link>
      </Contenedor>
    );
  }

  const agregar = () => {
    const carrito = JSON.parse(localStorage.getItem("carritoCompras") || "[]");
    const existe = carrito.find((item: Auto) => item.id === auto.id);

    if (existe) existe.cantidad += 1;
    else carrito.push({ ...auto, cantidad: 1 });

    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    alert(`¡${auto.nombre} añadido al carrito!`);
  };

  return (
    <Contenedor clase="container my-5 text-white">
      <div className="my-4">
        <Link className="btn btn-outline-secondary" to="/">
          ⬅️ Volver a la Tienda
        </Link>
      </div>

      <div className="row g-4 align-items-center">
        <div className="col-md-6">
          <img
            src={auto.img}
            alt={auto.nombre}
            className="img-fluid rounded-4 shadow border border-secondary w-100"
            style={{ maxHeight: "420px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6">
          <span className="badge bg-secondary mb-2">ID: {auto.id}</span>
          <h1 className="text-warning fw-bold">{auto.nombre}</h1>
          <p className="fs-5 text-light opacity-75 my-3">{auto.desc}</p>
          <h3 className="text-warning fw-bold mb-4">
            ${auto.precio.toLocaleString("es-CL")}{" "}
            <small className="text-secondary fs-6">/ día</small>
          </h3>

          <div className="d-flex gap-2">
            <Button
              clase="btn btn-warning fw-semibold px-4 py-2"
              alHacerClic={agregar}
            >
              🛒 Añadir al carrito
            </Button>
            <Link to="/proceso" className="btn btn-outline-light px-4 py-2">
              Ir a Pagar
            </Link>
          </div>
        </div>
      </div>
    </Contenedor>
  );
}

export default Detalle;
