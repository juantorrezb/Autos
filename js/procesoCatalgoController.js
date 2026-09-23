document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del formulario
    const inputIdCar = document.getElementById("IdCar")
    const inputMarcaAuto = document.getElementById("MarcaAuto")
    const inputModeloAuto = document.getElementById("ModeloAuto")
    const inputPrecioAuto = document.getElementById("PrecioAuto")
    // Helper: Limpiar espacios en blanco
    function getInputValue(inputElement) {
        return inputElement ? inputElement.value.trim() : "";
    }
//Funcion para limpiar el error visual de los campos especificos
    function cleanErrorMensaje(errorElement){
        if(errorElement){
            errorElement.textContent = ""
            errorElement.style.display = "none"
        }
    }
    // Escuchar cambios en tiempo real para limpiar los mensajes de error
    inputIdCar.addEventListener("input",() => cleanErrorMensaje(errorId))
    inputMarcaAuto.addEventListener("input",() => cleanErrorMensaje(errorMarca))
    inputModeloAuto.addEventListener("input",() => cleanErrorMensaje(errorModelo))
    inputPrecioAuto.addEventListener("input",() => cleanErrorMensaje(errorPrecio))


    function handleButtonClick(event){

        event.preventDefault();
        const idCar = getInputValue(inputIdCar)
        const marcaAuto = getInputValue(inputMarcaAuto)
        const modeloAuto = getInputValue(inputModeloAuto)
        const precioAuto = getInputValue(inputPrecioAuto)

        console.log("ID del Vehículo:", idCar)
        console.log("Marca:", marcaAuto)
        console.log("Modelo:", modeloAuto)
        console.log("Precio:", precioAuto)

        //Validar datos
    if(!idCar){
        errorId.textContent = "Ingrese un ID de vehículo valido."
        errorId.style.display = "block"
        console.error("Error: Ingrese un ID de vehículo valido.")
        return
    }
    if(!marcaAuto){
        errorMarca.textContent = "Ingrese una marca valida."
        errorMarca.style.display = "block"
        console.error("Error: Ingrese una marca valida.")
        return
    }
    if(!modeloAuto){
        errorModelo.textContent = "Ingrese un modelo valido."
        errorModelo.style.display = "block"
        console.error("Error: Ingrese un modelo valido.")
        return
    }
    if(!precioAuto){
        errorPrecio.textContent = "Ingrese un precio valido."
        errorPrecio.style.display = "block"
        console.error("Error: Ingrese un precio valido.")
        return
    }
    //Si todos los datos son validos, se puede proceder con el envio del formulario o la logica deseada.
    console.log("Todos los datos son validos. Procediendo con la reserva...")
    //Aqui puedes agregar la logica para enviar los datos al servidor o realizar alguna accion adicional.
    }
            btnConfirm.addEventListener('click', handleButtonClick)
})