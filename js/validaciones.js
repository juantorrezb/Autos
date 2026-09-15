document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. VALIDACIÓN DE INICIO DE SESIÓN
    // ==========================================
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function(evento) {
            evento.preventDefault(); 

            const correo = document.getElementById("correo").value.trim();
            const password = document.getElementById("password").value.trim();
            
            const errorCorreo = document.getElementById("errorCorreo");
            const errorPassword = document.getElementById("errorPassword");

            let esValido = true;

            // Validación de Correo
            if (correo === "") {
                errorCorreo.textContent = "El correo es requerido.";
                errorCorreo.style.display = "block";
                esValido = false;
            } else if (correo.length > 100) {
                errorCorreo.textContent = "El correo no puede superar los 100 caracteres.";
                errorCorreo.style.display = "block";
                esValido = false;
            } else if (!correo.endsWith("@duoc.cl") && !correo.endsWith("@profesor.duoc.cl") && !correo.endsWith("@gmail.com")) {
                errorCorreo.textContent = "Dominio inválido. Use @duoc.cl, @profesor.duoc.cl o @gmail.com.";
                errorCorreo.style.display = "block";
                esValido = false;
            } else {
                errorCorreo.style.display = "none";
            }

            // Validación de Contraseña
            if (password === "") {
                errorPassword.textContent = "La contraseña es requerida.";
                errorPassword.style.display = "block";
                esValido = false;
            } else if (password.length < 4 || password.length > 10) {
                errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
                errorPassword.style.display = "block";
                esValido = false;
            } else {
                errorPassword.style.display = "none";
            }

            if (esValido) {
                alert("Validación exitosa. Iniciando sesión...");
                window.location.href = "Index.html";
            }
        });
    }

    // ==========================================
    // 2. VALIDACIÓN DEL PROCESO DE ALQUILER
    // ==========================================
    const formularioReserva = document.getElementById("formularioReserva");

    if (formularioReserva) {
        formularioReserva.addEventListener("submit", function(evento) {
            evento.preventDefault(); 
            let esValido = true;

            const nombre = document.getElementById("firstName");
            const apellido = document.getElementById("lastName");
            const email = document.getElementById("email");
            const vehiculo = document.getElementById("carSelect");
            const numTarjeta = document.getElementById("cardNumber");
            const cvv = document.getElementById("cardCvv");

            function validarCampo(campo, condicion) {
                if (condicion) {
                    campo.classList.remove("is-invalid");
                    campo.classList.add("is-valid");
                } else {
                    campo.classList.remove("is-valid");
                    campo.classList.add("is-invalid");
                    esValido = false;
                }
            }

            validarCampo(nombre, nombre.value.trim() !== "");
            validarCampo(apellido, apellido.value.trim() !== "");
            validarCampo(vehiculo, vehiculo.value !== "");

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validarCampo(email, regexEmail.test(email.value.trim()));

            const regexTarjeta = /^\d{16}$/;
            validarCampo(numTarjeta, regexTarjeta.test(numTarjeta.value.trim()));

            const regexCVV = /^\d{3}$/;
            validarCampo(cvv, regexCVV.test(cvv.value.trim()));

            if (esValido) {
                alert(`¡Reserva confirmada con éxito, ${nombre.value}! El contrato será enviado a ${email.value}.`);
                formularioReserva.reset(); 
                
                const inputs = formularioReserva.querySelectorAll('.form-control, .form-select');
                inputs.forEach(input => {
                    input.classList.remove('is-valid');
                });
            } else {
                alert("Faltan datos o hay errores en el formulario de pago.");
            }
        });
    }

    // ==========================================
    // 3. SELECCIÓN AUTOMÁTICA DESDE EL LOCALSTORAGE
    // ==========================================
    const selectVehiculo = document.getElementById("carSelect");
    
    if (selectVehiculo) {
        const carritoGuardado = JSON.parse(localStorage.getItem('carritoCompras')) || [];
        
        if (carritoGuardado.length > 0) {
            const ultimoAuto = carritoGuardado[carritoGuardado.length - 1].nombre;
            
            for (let i = 0; i < selectVehiculo.options.length; i++) {
                if (selectVehiculo.options[i].value === ultimoAuto || selectVehiculo.options[i].text === ultimoAuto) {
                    selectVehiculo.selectedIndex = i;
                    break; 
                }
            }
        }
    }
});