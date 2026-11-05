import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Index from "./pages/Index";
import Detalle from "./pages/Detalle";
import Proceso from "./pages/Proceso";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-black text-light">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Ruta inicial: Catálogo */}
            <Route path="/" element={<Index />} />

            {/* Ruta parametrizada del profe para ver un auto */}
            <Route path="/detalle/:id" element={<Detalle />} />

            {/* Ruta para el carrito y checkout */}
            <Route path="/proceso" element={<Proceso />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
