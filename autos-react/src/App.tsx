import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Index from "./pages/Index";
import Detalle from "./pages/Detalle";
import "bootstrap/dist/css/bootstrap.min.css";
import Nosotros from "./pages/Nosotros";
import Proceso from "./pages/Proceso";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
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
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/Proceso" element={<Proceso />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
