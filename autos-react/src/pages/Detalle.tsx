import { Link, useParams } from "react-router-dom";
import Button from "../componets/Button";
import { vehiculos } from "../data/Auto";

// Defino los tipos en los parámetros de dirección
interface ProductoParams {
  id: string;
  [key: string]: string | undefined;
}

function Detalle() {
  const { id } = useParams<ProductoParams>();
  console.log("Estoy en producto id=" + id);

  const auto = vehiculos.find((p) => p.id === id);

  if (!auto) {
    return (
      <div className="container text-center my-5 text-white">
        <h2 className="text-center my-5 text-danger">Vehículo no encontrado</h2>
        <Link className="btn btn-outline-warning" to={"/"}>
          Volver al Inicio
        </Link>
      </div>
    );
  }

  console.log("Nombre: " + auto.nombre);

  const handleAgregar = () => {
    const data = localStorage.getItem("carritoCompras");
    const carrito = data ? JSON.parse(data) : [];

    const existe = carrito.find((item: any) => item.id === auto.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      carrito.push({ ...auto, cantidad: 1 });
    }

    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    alert(`¡${auto.nombre} añadido al carrito!`);
  };

  return (
    <div className="container my-5 text-white">
      <div className="my-4">
        <Link className="btn btn-outline-secondary" to={"/"}>
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
          {/* Datos del producto */}
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
              alHacerClic={handleAgregar}
            >
              🛒 Añadir al carrito
            </Button>
            <Link
              to="/proceso.html"
              className="btn btn-outline-light px-4 py-2"
            >
              Ir a Pagar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalle;
