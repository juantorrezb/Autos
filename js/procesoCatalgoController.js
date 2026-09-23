document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del formulario

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
    inputFirstName.addEventListener("input",() => cleanErrorMensaje(errorPrimerNombre))
    inputLastName.addEventListener("input",() => cleanErrorMensaje(errorApellido))
    carTypeSelect.addEventListener("input",() => cleanErrorMensaje(errorTipoDeAuto))
    inputAddress.addEventListener("input",() => cleanErrorMensaje(errorDireccion))
    cardName.addEventListener("input",() => cleanErrorMensaje(errorNombreTarjeta))
    cardNumber.addEventListener("input",() => cleanErrorMensaje(errorNumeroTarjeta))
    cardExpiration.addEventListener("input",() => cleanErrorMensaje(errorVencimientoTarjeta))
    cardCvv.addEventListener("input",() => cleanErrorMensaje(errorCVVTarjeta))


    function handleButtonClick(event){

        event.preventDefault();
        const firstName = getInputValue(inputFirstName)
        const lastName = getInputValue(inputLastName)
        const address = getInputValue(inputAddress)
        const carType = getSelectionValue(carTypeSelect)
        const cardNameValue = getInputValue(cardName)
        const cardNumberValue = getInputValue(cardNumber)
        const cardExpirationValue = getInputValue(cardExpiration)
        const cardCvvValue = getInputValue(cardCvv)

        console.log("First Name:", firstName)
        console.log("Last Name:", lastName)
        console.log("Address:", address)
        console.log("Car Type:", carType.text, "Value:", carType.value)
        console.log("Card Name:", cardNameValue)
        console.log("Card Number:", cardNumberValue)
        console.log("Card Expiration:", cardExpirationValue)
        console.log("Card CVV:", cardCvvValue)

        //Validar datos
    if(!firstName){
        errorPrimerNombre.textContent = "Ingrese un nombre valido."
        errorPrimerNombre.style.display = "block"
        console.error("Error: Ingrese un nombre valido.")
        return
    }
    if(!lastName){
        errorApellido.textContent = "Ingrese un apellido valido."
        errorApellido.style.display = "block"
        console.error("Error: Ingrese un apellido valido.")
        return
    }
    if(carType.value==""){
        errorTipoDeAuto.textContent = "Ingrese un tipo de auto valido."
        errorTipoDeAuto.style.display = "block"
        console.error("Error: Ingrese un tipo de auto valido.")
        return
    }
    if(!address){
        errorDireccion.textContent = "Ingrese una direccion valida."
        errorDireccion.style.display = "block"
        console.error("Error: Ingrese una direccion valida.")
        return
    }
    if(!cardNameValue){
        errorNombreTarjeta.textContent = "Ingrese un nombre en la tarjeta valido."
        errorNombreTarjeta.style.display = "block"
        console.error("Error: Ingrese un nombre en la tarjeta valido.")
        return
    }
    if(!cardNumberRegex.test(cardNumberValue)){
        errorNumeroTarjeta.textContent = "Ingrese un numero de tarjeta valido (16 digitos)."
        errorNumeroTarjeta.style.display = "block"
        console.error("Error: Ingrese un numero de tarjeta valido (16 digitos).")
        return
    }
    if(!cardExpirationRegex.test(cardExpirationValue)){
        errorVencimientoTarjeta.textContent = "Ingrese una fecha de expiracion valida (MM/YY)."
        errorVencimientoTarjeta.style.display = "block"
        console.error("Error: Ingrese una fecha de expiracion valida (MM/YY).")
        return
    }
    if(!cardCvvRegex.test(cardCvvValue)){
        errorCVVTarjeta.textContent = "Ingrese un CVV valido (3 digitos)."
        errorCVVTarjeta.style.display = "block"
        console.error("Error: Ingrese un CVV valido (3 digitos).")
        return
    }

    //Si todos los datos son validos, se puede proceder con el envio del formulario o la logica deseada.
    console.log("Todos los datos son validos. Procediendo con la reserva...")
    //Aqui puedes agregar la logica para enviar los datos al servidor o realizar alguna accion adicional.
    }
            btnConfirm.addEventListener('click', handleButtonClick)
})