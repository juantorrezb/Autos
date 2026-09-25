document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // FUNCIONES AUXILIARES DE VALIDACIÓN
    // ==========================================

    // 1. Algoritmo oficial de RUT chileno (Módulo 11)
    function validarRutChileno(rutCompleto) {
        // Exige 7 u 8 números, un guion y dígito 0-9 o K
        const regexRut = /^[0-9]{7,8}-[0-9kK]{1}$/;
        if (!regexRut.test(rutCompleto)) return false;

        const partes = rutCompleto.split("-");
        const cuerpo = partes[0];
        const dvIngresado = partes[1].toUpperCase();

        // Fórmula Módulo 11
        let suma = 0;
        let multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += multiplo * parseInt(cuerpo.charAt(i), 10);
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }

        const dvEsperadoCalculado = 11 - (suma % 11);
        let dvCorrecto = "";
        if (dvEsperadoCalculado === 11) {
            dvCorrecto = "0";
        } else if (dvEsperadoCalculado === 10) {
            dvCorrecto = "K";
        } else {
            dvCorrecto = dvEsperadoCalculado.toString();
        }

        return dvIngresado === dvCorrecto;
    }

    // Valida que el correo tenga exactamente UN solo '@' y los dominios permitidos
    function validarCorreoEstricto(correo) {
        if (!correo || correo.length > 100) return false;

        // Impide más de un '@'
        const partesArroba = correo.split("@");
        if (partesArroba.length !== 2) return false;

        // Formato estándar de correo antes y después de la arroba
        const regexEstructura = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexEstructura.test(correo)) return false;

        // Dominios autorizados por pauta
        return correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl") || correo.endsWith("@gmail.com");
    }

    // Helper para manejar las clases de Bootstrap e invalid-feedback
    function setFeedback(inputEl, errorEl, mensaje, valido) {
        if (!inputEl) return;
        if (valido) {
            inputEl.classList.remove("is-invalid");
            inputEl.classList.add("is-valid");
            if (errorEl) {
                errorEl.textContent = "";
                errorEl.style.display = "none";
            }
        } else {
            inputEl.classList.remove("is-valid");
            inputEl.classList.add("is-invalid");
            if (errorEl) {
                errorEl.textContent = mensaje;
                errorEl.style.display = "block";
            }
        }
    }

    // ==========================================
    // 1. VALIDACIÓN DE INICIO DE SESIÓN
    // ==========================================
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function(evento) {
            evento.preventDefault(); 

            const inputCorreo = document.getElementById("correo");
            const inputPassword = document.getElementById("password");
            const correo = inputCorreo.value.trim();
            const password = inputPassword.value.trim();
            
            const errorCorreo = document.getElementById("errorCorreo");
            const errorPassword = document.getElementById("errorPassword");

            let esValido = true;

            // Validación estricta de correo en Login
            if (correo === "") {
                setFeedback(inputCorreo, errorCorreo, "El correo es requerido.", false);
                esValido = false;
            } else if (!validarCorreoEstricto(correo)) {
                setFeedback(inputCorreo, errorCorreo, "Correo inválido. Verifique que no tenga dos '@' y use dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.", false);
                esValido = false;
            } else {
                setFeedback(inputCorreo, errorCorreo, "", true);
            }

            // Validación de Contraseña
            if (password === "") {
                setFeedback(inputPassword, errorPassword, "La contraseña es requerida.", false);
                esValido = false;
            } else if (password.length < 4 || password.length > 10) {
                setFeedback(inputPassword, errorPassword, "La contraseña debe tener entre 4 y 10 caracteres.", false);
                esValido = false;
            } else {
                setFeedback(inputPassword, errorPassword, "", true);
            }

            if (esValido) {
                alert("Validación exitosa. Iniciando sesión...");
                window.location.href = "Index.html";
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

    // ==========================================
    // 4. VALIDACIÓN DE REGISTRO DE USUARIO
    // ==========================================
    const formRegistro = document.getElementById("formRegistro");

    if (formRegistro) {
        formRegistro.addEventListener("submit", function(evento) {
            evento.preventDefault();

            const inputRun = document.getElementById("regRun");
            const inputNombre = document.getElementById("regNombre");
            const inputApellido = document.getElementById("regApellido");
            const inputCorreo = document.getElementById("regCorreo");
            const inputPass = document.getElementById("regPassword");
            const inputPassConfirm = document.getElementById("regPasswordConfirm");

            const errorRun = document.getElementById("errorRegRun");
            const errorNombre = document.getElementById("errorRegNombre");
            const errorApellido = document.getElementById("errorRegApellido");
            const errorCorreo = document.getElementById("errorRegCorreo");
            const errorPass = document.getElementById("errorRegPassword");
            const errorPassConfirm = document.getElementById("errorRegPasswordConfirm");

            const run = inputRun.value.trim().toUpperCase();
            const nombre = inputNombre.value.trim();
            const apellido = inputApellido.value.trim();
            const correo = inputCorreo.value.trim().toLowerCase();
            const pass = inputPass.value.trim();
            const passConfirm = inputPassConfirm.value.trim();

            let esValido = true;

            // RUT: Formato con guion + Algoritmo Módulo 11 (número o K)
            if (!validarRutChileno(run)) {
                setFeedback(inputRun, errorRun, "RUT inválido. Debe incluir guion y dígito verificador correcto (ej: 12345678-5 o 19000001-K).", false);
                esValido = false;
            } else {
                //RUT: Verificación de RUT único en localStorage
                const usuariosExistentes = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
                const rutDuplicado = usuariosExistentes.some(u => u.run.toUpperCase() === run);

                if (rutDuplicado) {
                    setFeedback(inputRun, errorRun, "Este RUT ya se encuentra registrado en el sistema.", false);
                    esValido = false;
                } else {
                    setFeedback(inputRun, errorRun, "", true);
                }
            }

            // Nombre y Apellido obligatorios
            const okNombre = nombre.length >= 2 && nombre.length <= 50;
            setFeedback(inputNombre, errorNombre, "El nombre es obligatorio (mínimo 2 caracteres).", okNombre);
            if (!okNombre) esValido = false;

            const okApellido = apellido.length >= 2 && apellido.length <= 50;
            setFeedback(inputApellido, errorApellido, "El apellido es obligatorio (mínimo 2 caracteres).", okApellido);
            if (!okApellido) esValido = false;

            // Correo: Exactamente un '@', dominios permitidos y único
            if (!validarCorreoEstricto(correo)) {
                setFeedback(inputCorreo, errorCorreo, "Correo inválido. No debe contener dos '@' y debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.", false);
                esValido = false;
            } else {
                const usuariosExistentes = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
                const correoDuplicado = usuariosExistentes.some(u => u.correo.toLowerCase() === correo);

                if (correoDuplicado) {
                    setFeedback(inputCorreo, errorCorreo, "Este correo ya está registrado por otro usuario.", false);
                    esValido = false;
                } else {
                    setFeedback(inputCorreo, errorCorreo, "", true);
                }
            }

            // Contraseña (4 a 10 caracteres)
            const esPassValida = pass.length >= 4 && pass.length <= 10;
            setFeedback(inputPass, errorPass, "La contraseña debe tener entre 4 y 10 caracteres.", esPassValida);
            if (!esPassValida) esValido = false;

            // Confirmación de Contraseña coincidente
            const coinciden = pass === passConfirm && passConfirm !== "";
            setFeedback(inputPassConfirm, errorPassConfirm, "Las contraseñas no coinciden.", coinciden);
            if (!coinciden) esValido = false;

            // Guardar en localStorage si todo es válido
            if (esValido) {
                const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
                usuarios.push({ run, nombre, apellido, correo, rol: "Cliente" });
                localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

                alert(`¡Cuenta creada con éxito para ${nombre} (RUT: ${run})! Ahora puedes iniciar sesión.`);
                formRegistro.reset();

                const inputsReg = formRegistro.querySelectorAll('.form-control');
                inputsReg.forEach(input => input.classList.remove('is-valid'));

                const tabLogin = new bootstrap.Tab(document.getElementById("tab-login"));
                tabLogin.show();
            }
        });
    }

});