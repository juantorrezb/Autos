import { Link } from "react-router-dom";

function Footer() {
  const volverArriba = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-secondary py-4 border-top border-secondary mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p className="mb-0 text-white">
          &copy; Autos Rentados - Calidad y Confort para tus Eventos
        </p>

        <div className="d-flex align-items-center gap-3">
          {/* Botón que entra a la sección Nosotros */}
          <Link
            to="/nosotros"
            className="btn btn-outline-warning btn-sm fw-semibold"
          >
            Sobre Nosotros
          </Link>

          <button
            type="button"
            onClick={volverArriba}
            className="btn btn-link text-secondary text-decoration-none small p-0"
          >
            Volver arriba ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
