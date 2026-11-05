import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../componets/Button";
import Tarjeta from "../componets/Tarjeta";

interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  desc?: string;
  img?: string;
}

function Proceso() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const navigate = useNavigate();

  const cargarCarrito = () => {
    const data = localStorage.getItem("carritoCompras");
    if (data) {
      try {
        setCarrito(JSON.parse(data));
      } catch {
        setCarrito([]);
      }
    } else {
      setCarrito([]);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const eliminarItem = (id: string) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    localStorage.setItem("carritoCompras", JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
    window.dispatchEvent(new Event("storage"));
  };

  const vaciarCarrito = () => {
    localStorage.removeItem("carritoCompras");
    setCarrito([]);
    window.dispatchEvent(new Event("storage"));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0,
  );

  const handlePagar = (e: React.FormEvent) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert("No hay vehículos en la reserva.");
      return;
    }
    alert(
      "¡Reserva confirmada con éxito! Te hemos enviado el comprobante a tu correo.",
    );
    vaciarCarrito();
    navigate("/");
  };

  return (
    <div className="container py-5 text-white">
      <h2 className="text-warning fw-bold mb-4 text-center">
        Tu Reserva de Arriendo
      </h2>

      <div className="row g-4">
        {/* LISTADO DE AUTOS USANDO COMPONENTES TARJETA Y BUTTON */}
        <div className="col-lg-7">
          <div className="card bg-dark border-secondary p-4 rounded-4 shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
              <h5 className="mb-0 text-white">
                Vehículos Seleccionados ({carrito.length})
              </h5>
              {carrito.length > 0 && (
                <Button
                  clase="btn btn-outline-danger btn-sm"
                  alHacerClic={vaciarCarrito}
                >
                  Vaciar Reserva
                </Button>
              )}
            </div>

            {carrito.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-secondary fs-5 mb-3">
                  No has seleccionado ningún vehículo aún.
                </p>
                <Link to="/" className="btn btn-warning fw-semibold">
                  Explorar Catálogo de Autos
                </Link>
              </div>
            ) : (
              <div className="row g-3">
                {carrito.map((item) => (
                  <div className="col-12" key={item.id}>
                    <Tarjeta
                      titulo={item.nombre}
                      texto={
                        item.desc ||
                        "Vehículo exclusivo seleccionado para arriendo."
                      }
                      urlImagen={item.img || "/assets/lambo.jpg"}
                      altImagen={item.nombre}
                      clase="card bg-black text-white border-secondary h-100 shadow-sm"
                    >
                      <div className="d-flex justify-content-between align-items-center mt-2 border-top border-secondary pt-2">
                        <div>
                          <span className="text-secondary small d-block">
                            Precio por día: $
                            {item.precio.toLocaleString("es-CL")}
                          </span>
                          <span className="text-warning fw-bold fs-6">
                            Subtotal: $
                            {(
                              item.precio * (item.cantidad || 1)
                            ).toLocaleString("es-CL")}
                          </span>
                        </div>
                        <Button
                          clase="btn btn-outline-danger btn-sm"
                          alHacerClic={() => eliminarItem(item.id)}
                        >
                          Quitar
                        </Button>
                      </div>
                    </Tarjeta>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RESUMEN Y PAGO USANDO COMPONENTE BUTTON */}
        <div className="col-lg-5">
          <div className="card bg-dark border-secondary p-4 rounded-4 shadow-sm">
            <h5 className="text-warning fw-bold mb-3 border-bottom border-secondary pb-2">
              Resumen de Reserva
            </h5>

            <div className="d-flex justify-content-between mb-3 fs-5">
              <span>Total por día:</span>
              <span className="text-warning fw-bold">
                ${total.toLocaleString("es-CL")}
              </span>
            </div>

            <form onSubmit={handlePagar}>
              <div className="mb-3">
                <label className="form-label text-light small">
                  Nombre del Titular
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  className="form-control bg-black text-white border-secondary"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light small">
                  RUT / Identificación
                </label>
                <input
                  type="text"
                  required
                  placeholder="12.345.678-9"
                  className="form-control bg-black text-white border-secondary"
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-light small">
                  Tarjeta de Crédito o Débito
                </label>
                <input
                  type="text"
                  maxLength={19}
                  required
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="form-control bg-black text-white border-secondary"
                />
              </div>

              <Button
                clase="btn btn-warning w-100 py-2 fw-bold text-dark shadow"
                alHacerClic={() => {}}
              >
                Confirmar y Pagar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proceso;
