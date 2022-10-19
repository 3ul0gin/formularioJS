//Esta función se esjecuta cada vez que el usuario sale del input que esta usando
export function valida (input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    
    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput, input);
    }
} 

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {valueMissing: "El campo Nombre no puede estar vacio"},

    email: {valueMissing: "El campo EMAIL no puede estar vacio",
            typeMismatch: "El correo no es valido"},

    password:{valueMissing: "El campo CONTRASEÑA no puede estar vacio",
              patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener 1 letra minuscula, 1 letra mayuscula, 1 numero y no puede contener carecteres especiales."},

    nacimiento: {valueMissing: "Este campo no puede estar vacio",
                customError:"Debes tener al menos 18 años de edad"},
    
    numero: {valueMissing: "Este campo no puede estar vacio",
             patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"},
    
    direccion: {valueMissing: "Este campo no puede estar vacio",
                patternMismatch: "La dirección debe contener entre 10 y 40 caracteres"},
    
    ciudad: {valueMissing: "Este campo no puede estar vacio",
             patternMismatch: "La ciuedad debe contener entre 4 y 30 caracteres"},
    
    estado: {valueMissing: "Este campo no puede estar vacio",
             patternMismatch: "El estado debe contener entre 4 y 30 caracteres"}
};

const validadores = {
    nacimiento: (input) => validarNacimiento (input)
};

function mostrarMensajeDeError (tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError [tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );
    return diferenciaFechas <=  fechaActual;
}
