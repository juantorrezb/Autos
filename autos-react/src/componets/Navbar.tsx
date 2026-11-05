function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="Index">
          Autos Rentados
        </a>
        <div className="d-flex align-items-center gap-3">
          <a className="text-white text-decoration-none" href="login">
            Iniciar Sesión
          </a>
          <a
            href="proceso"
            className="btn btn-outline-warning d-flex align-items-center gap-2 position-relative"
          >
            🛒 Carrito (<span id="contador-carrito">0</span>)
          </a>
          <a href="Nosotros" className="text-white text-decoration-none">
            Nosotros
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
