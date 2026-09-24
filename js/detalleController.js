// Función para comprar directo: verifica si ya está en el carrito o lo añade antes de redirigir
function irAPagarDirecto(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];
    const yaEstaEnCarrito = carrito.some(item => item.nombre === nombre);

    if (!yaEstaEnCarrito) {
        agregarAlCarrito(nombre, precio);
    }
    window.location.href = "proceso.html";
}

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const idAuto = params.get('id');

    // Catálogo oficial de vehículos
    const vehiculos = [
        { id: "lambo", nombre: "Lamborghini Huracán", precio: 500000, desc: "Superdeportivo italiano con motor V10 atmosférico, tracción integral y aceleración de 0 a 100 km/h en 3.2 segundos.", img: "../assets/lambo.jpg" },
        { id: "rolls", nombre: "Rolls Royce Phantom", precio: 800000, desc: "El epítome del lujo y la comodidad. Conducción suave, acabados artesanales y máxima insonorización de cabina.", img: "../assets/rollsRoyce.jpg" },
        { id: "bugatti", nombre: "Bugatti Chiron", precio: 900000, desc: "Hiperdeportivo exclusivo con motor W16 quad-turbo de 1500 CV capaz de superar los 400 km/h.", img: "../assets/bugatti.jpg" },
        { id: "ferrari", nombre: "Ferrari 488", precio: 600000, desc: "Diseño aerodinámico italiano y motor V8 turboalimentado con sonido inconfundible y respuesta inmediata.", img: "../assets/ferrari.jpg" },
        { id: "mclaren", nombre: "McLaren 720S", precio: 550000, desc: "Estructura monocasco de fibra de carbono ultra liviana con rendimiento de pista homologado para calle.", img: "../assets/Mclarenjpg.jpg" },
        { id: "mercedes", nombre: "Mercedes-Benz Clase S", precio: 300000, desc: "Elegancia ejecutiva, tecnología de punta, suspensión neumática y máxima seguridad en ruta.", img: "../assets/mercedes.jpeg" }
    ];

    const contenedor = document.getElementById("contenedor-detalle");

    // VALIDACIÓN: Comprobar si el auto existe
    const auto = vehiculos.find(v => v.id === idAuto);

    // Si el ID no existe en el catálogo, muestra la alerta de validación
    if (!auto) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="alert alert-danger bg-dark text-white border-danger d-inline-block p-4 rounded-4 shadow">
                    <h2 class="fw-bold text-danger mb-3">⚠️ Vehículo No Encontrado</h2>
                    <p class="text-secondary mb-4">El identificador <code>${idAuto || 'vacío'}</code> no corresponde a ningún vehículo de nuestra flota disponible.</p>
                    <a href="Index.html" class="btn btn-warning px-4 py-2 fw-semibold">Volver al Catálogo</a>
                </div>
            </div>
        `;
        return;
    }

    // Renderizado cuando el auto es válido con texto legible en modo oscuro
    contenedor.innerHTML = `
        <div class="col-md-6 text-center">
            <img src="${auto.img}" class="img-fluid rounded-4 shadow-lg border border-secondary" alt="${auto.nombre}" style="max-height: 420px; width: 100%; object-fit: cover;">
        </div>
        <div class="col-md-6">
            <span class="badge bg-warning text-dark px-3 py-2 fs-6 mb-3">Disponible para Reserva</span>
            <h1 class="fw-bold text-white mb-3">${auto.nombre}</h1>
            <p class="fs-5 text-light opacity-75 mb-4" style="line-height: 1.6;">${auto.desc}</p>
            <h2 class="text-warning fw-bold my-4">$${auto.precio.toLocaleString('es-CL')} <span class="fs-5 text-secondary">/ día</span></h2>
            <div class="d-flex gap-3 flex-wrap">
                <button type="button" class="btn btn-warning btn-lg px-4 fw-semibold" onclick="agregarAlCarrito('${auto.nombre}', ${auto.precio})">
                    🛒 Añadir al Carrito
                </button>
                <button type="button" class="btn btn-outline-light btn-lg px-4" onclick="irAPagarDirecto('${auto.nombre}', ${auto.precio})">
                    Ir a Pagar
                </button>
            </div>
        </div>
    `;
});