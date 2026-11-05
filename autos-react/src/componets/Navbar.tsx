import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm border-bottom border-secondary">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">
          🚗 Autos Rentados
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link className="text-white text-decoration-none fw-semibold" to="/">
            Catálogo
          </Link>
          <Link
            className="text-white text-decoration-none fw-semibold"
            to="/login"
          >
            🛒 Carrito (<span id="contador-carrito">0</span>)
          </Link>
          <a href="Nosotros" className="text-white text-decoration-none">
            Nosotros
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
