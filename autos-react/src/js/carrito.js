// Obtener lista del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carritoCompras')) || [];
}

// Guardar lista en localStorage y refrescar vistas
function guardarCarrito(carrito) {
    localStorage.setItem('carritoCompras', JSON.stringify(carrito));
    actualizarContadorNavbar();
}

// Agregar producto con nombre y precio numérico
function agregarAlCarrito(nombre, precio) {
    let carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.nombre === nombre);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: Number(precio),
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    alert(`¡${nombre} añadido al carrito!`);
}

// Actualizar indicador de cantidad en el Navbar
function actualizarContadorNavbar() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        const carrito = obtenerCarrito();
        const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.textContent = total;
    }
}

// Renderizar tabla en proceso.html
function renderizarTablaCarrito() {
    const tbody = document.getElementById('tabla-carrito-body');
    const totalEl = document.getElementById('total-carrito');
    if (!tbody) return;

    const carrito = obtenerCarrito();
    tbody.innerHTML = '';
    let granTotal = 0;

    if (carrito.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">El carrito está vacío.</td></tr>`;
        if (totalEl) totalEl.textContent = '$0';
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        granTotal += subtotal;

        tbody.innerHTML += `
            <tr>
                <td class="fw-bold">${item.nombre}</td>
                <td>$${item.precio.toLocaleString('es-CL')}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, 1)">+</button>
                    </div>
                </td>
                <td>$${subtotal.toLocaleString('es-CL')}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminarItem(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    if (totalEl) {
        totalEl.textContent = `$${granTotal.toLocaleString('es-CL')}`;
    }
}

function cambiarCantidad(index, delta) {
    let carrito = obtenerCarrito();
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    renderizarTablaCarrito();
}

function eliminarItem(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    renderizarTablaCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('carritoCompras');
    actualizarContadorNavbar();
    renderizarTablaCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorNavbar();
    renderizarTablaCarrito();
});