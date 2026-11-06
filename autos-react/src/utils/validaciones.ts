// src/utils/validaciones.ts

/* ============================================================
 * 1. TIPOS BASE
 * Un validador recibe un valor y devuelve:
 *   - null           -> el valor es válido
 *   - string         -> mensaje de error
 * ============================================================ */
export type Validador = (valor: string) => string | null;

export type Reglas<T> = { [K in keyof T]?: Validador[] };
export type Errores<T> = Partial<Record<keyof T, string>>;

/* ============================================================
 * 2. VALIDADORES REUTILIZABLES (los "ladrillos")
 * ============================================================ */
export const requerido =
  (campo: string): Validador =>
  (v) =>
    v.trim() === "" ? `${campo} es obligatorio.` : null;

export const minLargo =
  (min: number, campo: string): Validador =>
  (v) =>
    v.trim().length < min
      ? `${campo} debe tener al menos ${min} caracteres.`
      : null;

export const maxLargo =
  (max: number, campo: string): Validador =>
  (v) =>
    v.trim().length > max
      ? `${campo} no puede superar los ${max} caracteres.`
      : null;

export const patron =
  (regex: RegExp, mensaje: string): Validador =>
  (v) =>
    regex.test(v.trim()) ? null : mensaje;

export const esEmail: Validador = patron(
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  "Ingresa un correo electrónico válido.",
);

export const esNumeroMin =
  (min: number, campo: string): Validador =>
  (v) => {
    const n = Number(v);
    if (Number.isNaN(n)) return `${campo} debe ser un número.`;
    return n < min
      ? `${campo} debe ser como mínimo ${min.toLocaleString("es-CL")}.`
      : null;
  };

export const esEntero =
  (campo: string): Validador =>
  (v) =>
    Number.isInteger(Number(v)) ? null : `${campo} debe ser un número entero.`;

// Valida que el valor NO exista en una lista (ej: ID repetido)
export const noRepetido =
  (existentes: string[], campo: string): Validador =>
  (v) =>
    existentes.includes(v.trim().toLowerCase())
      ? `Ese ${campo} ya existe.`
      : null;

/* ============================================================
 * 3. MOTOR: ejecuta los validadores de un campo / de un formulario
 * ============================================================ */

// Devuelve el PRIMER error de la lista (o null si todo está bien)
export function validarCampo(
  valor: string,
  validadores: Validador[] = [],
): string | null {
  for (const validar of validadores) {
    const error = validar(valor);
    if (error) return error;
  }
  return null;
}

// Valida todo un formulario según sus reglas
export function validarFormulario<T extends Record<string, string>>(
  valores: T,
  reglas: Reglas<T>,
): { errores: Errores<T>; esValido: boolean } {
  const errores: Errores<T> = {};

  (Object.keys(reglas) as (keyof T)[]).forEach((campo) => {
    const error = validarCampo(valores[campo], reglas[campo]);
    if (error) errores[campo] = error;
  });

  return { errores, esValido: Object.keys(errores).length === 0 };
}

/* ============================================================
 * 4. REGLAS POR FORMULARIO
 * ============================================================ */

// --- LOGIN ---
export const reglasLogin: Reglas<{ correo: string; password: string }> = {
  correo: [requerido("El correo"), esEmail],
  password: [requerido("La contraseña"), minLargo(6, "La contraseña")],
};

// --- ADMIN: agregar vehículo ---
// Es función porque necesita los IDs ya existentes para evitar duplicados
export const reglasAuto = (idsExistentes: string[]) => ({
  idCar: [
    requerido("El ID"),
    patron(
      /^[a-zA-Z0-9_-]+$/,
      "El ID solo puede tener letras, números, - o _ (sin espacios).",
    ),
    minLargo(3, "El ID"),
    noRepetido(idsExistentes, "ID"),
  ],
  marca: [
    requerido("La marca"),
    minLargo(2, "La marca"),
    maxLargo(30, "La marca"),
  ],
  modelo: [requerido("El modelo"), maxLargo(40, "El modelo")],
  precio: [
    requerido("El precio"),
    esNumeroMin(1000, "El precio"),
    esEntero("El precio"),
  ],
  desc: [maxLargo(200, "La descripción")],
});

/* ============================================================
 * 5. RUT CHILENO (el tuyo, sin cambios)
 * ============================================================ */
export function validarRutChileno(rutCompleto: string): boolean {
  const limpio = rutCompleto.replace(/\./g, "").trim();
  const regexRut = /^[0-9]{7,8}-[0-9kK]{1}$/;
  if (!regexRut.test(limpio)) return false;

  const [cuerpo, dvIngresado] = limpio.split("-");
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo.charAt(i), 10);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvCalculado = 11 - (suma % 11);
  let dvCorrecto = "";
  if (dvCalculado === 11) dvCorrecto = "0";
  else if (dvCalculado === 10) dvCorrecto = "K";
  else dvCorrecto = dvCalculado.toString();

  return dvIngresado.toUpperCase() === dvCorrecto;
}

// Versión "Validador" del RUT, para usarla dentro de las reglas de cualquier formulario
export const esRut: Validador = (v) =>
  validarRutChileno(v) ? null : "Ingresa un RUT válido (ej: 12345678-5).";
