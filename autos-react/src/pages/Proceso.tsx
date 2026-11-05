import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Auto } from "../data/Auto";

interface CarritoItem extends Auto {
  cantidad: number;
}

function ProcesoAlquiler() {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("carritoCompras");
    if (data) {
      const parsedCarrito: CarritoItem[] = JSON.parse(data);
      setCarrito(parsedCarrito);

      const totalReserva = parsedCarrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0,
      );
      setTotal(totalReserva);
    }
  }, []);

  const vaciarCarrito = () => {
    localStorage.removeItem("carritoCompras");
    setCarrito([]);
    setTotal(0);
  };

  return (
    <Fragment>
      {/* BARRA SUPERIOR */}
      <nav className="navbar navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Autos Rentados
          </Link>
          <div className="d-flex align-items-center">
            <Link to="/" className="btn btn-outline-light btn-sm me-3">
              Volver al Catálogo
            </Link>
            <span className="navbar-text text-warning fw-semibold">
              🛒 Carrito (<span id="contador-carrito">{carrito.length}</span>)
            </span>
          </div>
        </div>
      </nav>

      <div className="container">
        <main>
          <div className="py-5 text-center">
            <h2>Proceso de Alquiler</h2>
            <p className="lead text-white">
              Siga estos pasos para alquilar un vehículo. Complete sus datos
              personales y seleccione el método de pago para confirmar su
              reserva.
            </p>
          </div>

          <div className="row g-5">
            <div className="col-md-8 mx-auto">
              {/* TABLA RESUMEN DEL CARRITO */}
              <div className="card shadow-sm mb-4 bg-dark text-white border-secondary">
                <div className="card-header bg-black text-white d-flex justify-content-between align-items-center border-secondary">
                  <h5 className="mb-0">Vehículos en la Reserva</h5>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={vaciarCarrito}
                  >
                    Vaciar Carrito
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-dark table-striped align-middle">
                      <thead>
                        <tr>
                          <th>Vehículo</th>
                          <th>Precio Diario</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody id="tabla-carrito-body">
                        {carrito.length > 0 ? (
                          carrito.map((item) => (
                            <tr key={item.id}>
                              <td>{item.nombre}</td>
                              <td>${item.precio.toLocaleString("es-CL")}</td>
                              <td>{item.cantidad}</td>
                              <td>
                                $
                                {(item.precio * item.cantidad).toLocaleString(
                                  "es-CL",
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center">
                              No hay vehículos en la reserva.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="fw-bold text-warning">
                          <td colSpan={3} className="text-end border-0">
                            Total Reserva:
                          </td>
                          <td id="total-carrito" className="border-0">
                            ${total.toLocaleString("es-CL")}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              {/* FORMULARIO DE RESERVA Y PAGO LIMPIO */}
              <form id="formularioReserva" className="text-white">
                <h4 className="mb-3">Datos del Cliente y Reserva</h4>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Apellido
                    </label>
                    <input type="text" className="form-control" id="lastName" />
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="usuario@duoc.cl"
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Dirección de Entrega
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Av. Principal 123"
                    />
                  </div>
                </div>

                <hr className="my-4 border-secondary" />

                <h4 className="mb-3">Método de Pago</h4>

                <div className="row gy-3">
                  <div className="col-md-6">
                    <label htmlFor="cardName" className="form-label">
                      Nombre en la tarjeta
                    </label>
                    <input type="text" className="form-control" id="cardName" />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cardNumber" className="form-label">
                      Número de tarjeta (16 dígitos)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      placeholder="1234567812345678"
                      maxLength={16}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cardExpiration" className="form-label">
                      Vencimiento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardExpiration"
                      placeholder="MM/AA"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cardCvv" className="form-label">
                      CVV (3 dígitos)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardCvv"
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>

                <hr className="my-4 border-secondary" />

                <button
                  className="w-100 btn btn-warning fw-bold btn-lg mb-5"
                  type="submit"
                  id="btnSubmit"
                >
                  Confirmar Reserva y Recibir Contrato
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default ProcesoAlquiler;
