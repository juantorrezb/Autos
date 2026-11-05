import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Index from "./pages/Index";
import Detalle from "./pages/Detalle";
//import Proceso from "./pages/Proceso";
import "bootstrap/dist/css/bootstrap.min.css";
//import Nosotros from "./pages/Nosotros";
import Proceso from "./pages/Proceso";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-black text-light">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/Index" element={<Index />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            {/* <Route path="/proceso" element={<Proceso />} /> */}
            {/* <Route path="/Nosotros" element={<Nosotros />} /> */}
            <Route path="/Proceso" element={<Proceso />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
