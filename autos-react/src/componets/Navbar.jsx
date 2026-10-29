function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="Index.html">
          Autos Rentados
        </a>
        <div class="d-flex align-items-center gap-3">
          <a class="text-white text-decoration-none" href="login.html">
            Iniciar Sesión
          </a>
          <a
            href="proceso.html"
            class="btn btn-outline-warning d-flex align-items-center gap-2 position-relative"
          >
            🛒 Carrito (<span id="contador-carrito">0</span>)
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
