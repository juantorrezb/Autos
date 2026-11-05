// 1. Definimos la interfaz
export interface Auto {
  id: string;
  nombre: string;
  precio: number;
  desc: string;
  img: string;
}

// 2. Exportamos el arreglo con el catálogo oficial de vehículos
export const vehiculos: Auto[] = [
  {
    id: "lambo",
    nombre: "Lamborghini Huracán",
    precio: 500000,
    desc: "Superdeportivo italiano con motor V10 atmosférico, tracción integral y aceleración de 0 a 100 km/h en 3.2 segundos.",
    img: "/assets/lambo.jpg",
  },
  {
    id: "mercedes",
    nombre: "Mercedes-Benz Clase S",
    precio: 300000,
    desc: "Elegancia ejecutiva, tecnología de punta, suspensión neumática y máxima seguridad en ruta.",
    img: "/assets/mercedes.jpeg",
  },
  {
    id: "rolls",
    nombre: "Rolls Royce Phantom",
    precio: 800000,
    desc: "El epítome del lujo y la comodidad. Conducción suave, acabados artesanales y máxima insonorización de cabina.",
    img: "/assets/rollsRoyce.jpg",
  },
  {
    id: "ferrari",
    nombre: "Ferrari 488",
    precio: 600000,
    desc: "Diseño aerodinámico italiano y motor V8 turboalimentado con sonido inconfundible y respuesta inmediata.",
    img: "/assets/ferrari.jpg",
  },
  {
    id: "mclaren",
    nombre: "McLaren 720S",
    precio: 550000,
    desc: "Estructura monocasco de fibra de carbono ultra liviana con rendimiento de pista homologado para calle.",
    img: "/assets/Mclarenjpg.jpg",
  },
  {
    id: "bugatti",
    nombre: "Bugatti Chiron",
    precio: 900000,
    desc: "Hiperdeportivo exclusivo con motor W16 quad-turbo de 1500 CV capaz de superar los 400 km/h.",
    img: "/assets/bugatti.jpg",
  },
];
