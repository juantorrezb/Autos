import { Link } from "react-router-dom";
import Tarjeta from "../componets/Tarjeta";

const CLIENTES = [
  {
    nombre: "Arturo Vidal",
    texto:
      "Excelente servicio y puntualidad. Los autos están impecables y la atención fue de primer nivel.",
    img: "/assets/clienteContento.jpg",
  },
  {
    nombre: "Paul Pogba",
    texto:
      "Una experiencia de conducción inolvidable. Vehículos en perfecto estado mecánico y estético.",
    img: "/assets/clienteSatisfecho.jpg",
  },
];

function Nosotros() {
  return (
    <div className="container text-white py-5">
      <div className="text-center mb-5">
        <h2 className="text-warning fw-bold mb-3">Sobre Autos Rentados</h2>
        <p
          className="lead text-secondary mx-auto"
          style={{ maxWidth: "680px" }}
        >
          Empresa líder en arriendo de superdeportivos y vehículos de lujo para
          eventos especiales, matrimonios y producciones audiovisuales en Chile.
        </p>
      </div>

      <h4 className="text-center fw-bold mb-4">
        Clientes que Recomiendan el Servicio
      </h4>
      <div className="row g-4 justify-content-center text-center mb-5">
        {CLIENTES.map((cliente) => (
          <div className="col-md-5" key={cliente.nombre}>
            <Tarjeta
              titulo={cliente.nombre}
              texto={cliente.texto}
              urlImagen={cliente.img}
              altImagen={cliente.nombre}
              clase="card bg-dark text-white border-secondary h-100 shadow-sm"
            >
              <span className="text-warning fs-5">⭐⭐⭐⭐⭐</span>
            </Tarjeta>
          </div>
        ))}
      </div>

      <div
        className="card bg-dark border-secondary p-4 mx-auto text-center shadow-sm"
        style={{ maxWidth: "550px" }}
      >
        <h4 className="text-warning fw-bold mb-3">Contacto Directo</h4>
        <p className="mb-2 text-light">📍 Concepción, Chile</p>
        <p className="mb-2 text-light">📞 +56 9 8765 4321</p>
        <p className="mb-3 text-light">✉️ contacto@autosrentados.cl</p>
        <Link
          to="/"
          className="btn btn-outline-light btn-sm mx-auto"
          style={{ width: "fit-content" }}
        >
          ← Volver al Catálogo
        </Link>
      </div>
    </div>
  );
}

export default Nosotros;
