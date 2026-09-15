document.addEventListener('DOMContentLoaded', () => {
    const inputFirstName = document.getElementById("firstName")
    const inputLastName = document.getElementById("lastName")
    const inputAddress = document.getElementById("address")
    const cardName = document.getElementById("cardName")
    const cardNumber = document.getElementById("cardNumber")
    const cardExpiration = document.getElementById("cardExpiration")
    const cardCvv = document.getElementById("cardCvv")
    const btnConfirm = document.getElementById("btnSubmit")
    const carTypeSelect = document.getElementById("carSelect")
    const cardNumberRegex = /^[0-9]{16}$/
    const cardExpirationRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
    const cardCvvRegex = /^[0-9]{3}$/


    // Helper: Limpiar espacios en blanco
    function getInputValue(inputElement) {
        return inputElement ? inputElement.value.trim() : "";
    }
    //Funcion para tomar los datos del droopdown
    function getSelectionValue(selectElement){
        const selectedOption = selectElement.options[selectElement.selectedIndex]

        return {value : selectElement.value,                    //El valor de la opcion
            text: selectedOption ? selectedOption.text : ""     //El texto visible de la opcion
        }
    }
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
        console.error("Error: Ingrese un nombre valido.")
        return
    }
    if(!lastName){
        console.error("Error: Ingrese un apellido valido.")
        return
    }
    if(!address){
        console.error("Error: Ingrese una dirección valida.")
        return
    }
    if(carType.value==""){
        console.error("Error: Ingrese un tipo de auto valido.")
        return
    }
    if(!cardNameValue){
        console.error("Error: Ingrese un nombre en la tarjeta valido.")
        return
    }
    if(!cardNumberRegex.test(cardNumberValue)){
        console.error("Error: Ingrese un numero de tarjeta valido (16 digitos).")
        return
    }
    if(!cardExpirationRegex.test(cardExpirationValue)){
        console.error("Error: Ingrese una fecha de expiracion valida (MM/YY).")
        return
    }
    if(!cardCvvRegex.test(cardCvvValue)){
        console.error("Error: Ingrese un CVV valido (3 digitos).")
        return
    }

    //Si todos los datos son validos, se puede proceder con el envio del formulario o la logica deseada.
    console.log("Todos los datos son validos. Procediendo con la reserva...")
    //Aqui puedes agregar la logica para enviar los datos al servidor o realizar alguna accion adicional.
    }
            btnConfirm.addEventListener('click', handleButtonClick)
})