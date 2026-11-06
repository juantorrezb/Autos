import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../componets/Button";
import Tarjeta from "../componets/Tarjeta";
import type { Auto } from "../data/Auto";
import {
  validarFormulario,
  requerido,
  minLargo,
  esRut,
  type Validador,
} from "../utils/validaciones";

interface ItemCarrito extends Auto {
  cantidad: number;
}

// La tarjeta puede venir con espacios o guiones: se limpian antes de contar
const tarjeta16: Validador = (v) =>
  /^\d{16}$/.test(v.replace(/[\s-]/g, ""))
    ? null
    : "Ingrese un número de tarjeta válido de 16 dígitos.";

const reglasPago = {
  nombre: [requerido("El nombre"), minLargo(3, "El nombre")],
  rut: [requerido("El RUT"), esRut],
  tarjeta: [requerido("La tarjeta"), tarjeta16],
};

function leerCarrito(): ItemCarrito[] {
  try {
    return JSON.parse(localStorage.getItem("carritoCompras") || "[]");
  } catch {
    return [];
  }
}

function Proceso() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState<ItemCarrito[]>(leerCarrito);
  const [form, setForm] = useState({ nombre: "", rut: "", tarjeta: "" });
  const [errores, setErrores] = useState<Record<string, string>>({});

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );

  const cambiar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const claseInput = (campo: string) =>
    `form-control bg-black text-white border-secondary ${errores[campo] ? "is-invalid" : ""}`;

  // Actualiza la pantalla y localStorage a la vez
  const actualizarCarrito = (lista: ItemCarrito[]) => {
    setCarrito(lista);
    localStorage.setItem("carritoCompras", JSON.stringify(lista));
  };

  const handlePagar = (e: React.FormEvent) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert("No hay vehículos en la reserva.");
      return;
    }

    const resultado = validarFormulario(form, reglasPago);
    setErrores(resultado.errores);
    if (!resultado.esValido) return;

    alert(
      `¡Reserva confirmada con éxito para ${form.nombre} (RUT: ${form.rut})!\nHemos enviado el comprobante a tu correo.`,
    );
    actualizarCarrito([]);
    navigate("/");
  };

  return (
    <div className="container py-5 text-white">
      <h2 className="text-warning fw-bold mb-4 text-center">
        Tu Reserva de Arriendo
      </h2>

      <div className="row g-4">
        {/* LISTADO DE AUTOS */}
        <div className="col-lg-7">
          <div className="card bg-dark border-secondary p-4 rounded-4 shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
              <h5 className="mb-0 text-white">
                Vehículos Seleccionados ({carrito.length})
              </h5>
              {carrito.length > 0 && (
                <Button
                  clase="btn btn-outline-danger btn-sm"
                  alHacerClic={() => actualizarCarrito([])}
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
                      texto={item.desc}
                      urlImagen={item.img}
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
                            {(item.precio * item.cantidad).toLocaleString(
                              "es-CL",
                            )}
                          </span>
                        </div>
                        <Button
                          clase="btn btn-outline-danger btn-sm"
                          alHacerClic={() =>
                            actualizarCarrito(
                              carrito.filter((i) => i.id !== item.id),
                            )
                          }
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

        {/* RESUMEN Y FORMULARIO DE PAGO */}
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

            <form onSubmit={handlePagar} noValidate>
              <div className="mb-3">
                <label className="form-label text-light small">
                  Nombre del Titular
                </label>
                <input
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  className={claseInput("nombre")}
                  value={form.nombre}
                  onChange={cambiar}
                />
                {errores.nombre && (
                  <div className="invalid-feedback">{errores.nombre}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label text-light small">
                  RUT / Identificación
                </label>
                <input
                  name="rut"
                  type="text"
                  placeholder="12.345.678-9"
                  className={claseInput("rut")}
                  value={form.rut}
                  onChange={cambiar}
                />
                {errores.rut && (
                  <div className="invalid-feedback">{errores.rut}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label text-light small">
                  Tarjeta de Crédito o Débito
                </label>
                <input
                  name="tarjeta"
                  type="text"
                  maxLength={19}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className={claseInput("tarjeta")}
                  value={form.tarjeta}
                  onChange={cambiar}
                />
                {errores.tarjeta && (
                  <div className="invalid-feedback">{errores.tarjeta}</div>
                )}
              </div>

              <Button
                tipo="submit"
                clase="btn btn-warning w-100 py-2 fw-bold text-dark shadow"
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
