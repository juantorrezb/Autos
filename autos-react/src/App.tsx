import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Index from "./pages/Index";
import Detalle from "./pages/Detalle";
import Proceso from "./pages/Proceso";
import Nosotros from "./pages/Nosotros";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import "bootstrap/dist/css/bootstrap.min.css";
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
            <Route path="/proceso" element={<Proceso />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
