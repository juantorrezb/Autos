import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Index from "./pages/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-black text-light">
      <Navbar />
      <main className="flex-grow-1">
        <Index />
      </main>
      <Footer />
    </div>
  );
}

export default App;