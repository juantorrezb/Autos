export interface Pagina {
  id: string;
  nombre: string;
}

export const PAGINAS: Pagina[] = [
  { id: "inicio", nombre: "Catálogo" },
  { id: "detalle", nombre: "Detalle del Auto" },
  { id: "proceso", nombre: "Reserva y Pago" },
];
