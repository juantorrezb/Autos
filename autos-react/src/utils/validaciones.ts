// src/utils/validaciones.ts

// 1. Algoritmo oficial de RUT chileno (Módulo 11)
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
