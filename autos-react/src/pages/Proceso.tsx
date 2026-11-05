import { useState, useEffect } from "react";
import Button from "../componets/Button";

interface ItemCarrito {
  nombre: string;
  precio: number;
  cantidad: number;
}

interface Props {
  onCambiarPagina: (pagina: string) => void;
  onActualizarContador: () => void;
}

function Proceso({ onCambiarPagina, onActualizarContador }: Props) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [datosPago, setDatosPago] = useState({
    nombre: "",
    apellido: "",
    tarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  // Cargar datos desde localStorage al montar la página
  useEffect(() => {
    const data = localStorage.getItem("carritoCompras");
    if (data) {
      setCarrito(JSON.parse(data));
    }
  }, []);

  const vaciarCarrito = () => {
    localStorage.removeItem("carritoCompras");
    setCarrito([]);
    onActualizarContador();
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert("El carrito está vacío. Añada un vehículo primero.");
      return;
    }
    alert("¡Reserva confirmada con éxito! Su contrato ha sido emitido.");
    vaciarCarrito();
    onCambiarPagina("inicio");
  };

  return (
    <div className="container py-5 text-white">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Finalizar Reserva de Alquiler</h2>
        <p className="text-secondary">
          Revise los vehículos seleccionados y complete el método de pago.
        </p>
      </div>

      <div className="row g-5">
        {/* TABLA DE VEHÍCULOS */}
        <div className="col-lg-7">
          <div className="card bg-dark border-secondary shadow-sm mb-4">
            <div className="card-header border-secondary d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-white">Vehículos en la Reserva</h5>
              {carrito.length > 0 && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={vaciarCarrito}
                >
                  Vaciar Carrito
                </button>
              )}
            </div>
            <div className="card-body">
              {carrito.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-secondary mb-3">
                    No hay ningún vehículo en la reserva.
                  </p>
                  <Button
                    clase="btn btn-warning fw-semibold"
                    alHacerClic={() => onCambiarPagina("inicio")}
                  >
                    Explorar Catálogo
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle mb-0">
                    <thead>
                      <tr className="text-secondary">
                        <th>Vehículo</th>
                        <th>Precio Diario</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.map((item, index) => (
                        <tr key={index}>
                          <td className="fw-bold text-white">{item.nombre}</td>
                          <td>${item.precio.toLocaleString("es-CL")}</td>
                          <td>{item.cantidad}</td>
                          <td className="text-warning fw-bold">
                            $
                            {(item.precio * item.cantidad).toLocaleString(
                              "es-CL",
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {carrito.length > 0 && (
              <div className="card-footer border-secondary d-flex justify-content-between align-items-center">
                <span className="fs-5">Total a Pagar:</span>
                <span className="fs-4 fw-bold text-warning">
                  ${total.toLocaleString("es-CL")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* FORMULARIO DE PAGO */}
        <div className="col-lg-5">
          <div className="card bg-dark border-secondary p-4 shadow-sm">
            <h5 className="fw-bold text-warning mb-4">Datos de Pago</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-light">Nombre</label>
                <input
                  type="text"
                  className="form-control bg-black text-white border-secondary"
                  required
                  value={datosPago.nombre}
                  onChange={(e) =>
                    setDatosPago({ ...datosPago, nombre: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">Apellido</label>
                <input
                  type="text"
                  className="form-control bg-black text-white border-secondary"
                  required
                  value={datosPago.apellido}
                  onChange={(e) =>
                    setDatosPago({ ...datosPago, apellido: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  maxLength={19}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="form-control bg-black text-white border-secondary"
                  required
                  value={datosPago.tarjeta}
                  onChange={(e) =>
                    setDatosPago({ ...datosPago, tarjeta: e.target.value })
                  }
                />
              </div>
              <div className="row g-2 mb-4">
                <div className="col-6">
                  <label className="form-label text-light">Vencimiento</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="form-control bg-black text-white border-secondary"
                    required
                    value={datosPago.vencimiento}
                    onChange={(e) =>
                      setDatosPago({
                        ...datosPago,
                        vencimiento: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-light">CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="123"
                    className="form-control bg-black text-white border-secondary"
                    required
                    value={datosPago.cvv}
                    onChange={(e) =>
                      setDatosPago({ ...datosPago, cvv: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100 py-3 fw-bold fs-5 shadow"
                disabled={carrito.length === 0}
              >
                Confirmar y Pagar Reserva
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proceso;
