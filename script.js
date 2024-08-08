const palabras = ["flor", "leider", "esternocleidomastoideo"];
let palabraActual = "";
let palabraMezclada = "";
let intentoUsuario = [];
let errores = 0;
const maxErrores = 6;

const displayPalabraMezclada = document.getElementById("scrambled-word");
const displayErrores = document.getElementById("errors");
const contenedorLetras = document.getElementById("letters");

function mezclarPalabra(palabra) {

    let caracteres = palabra.split('');

    
    let mezclado = caracteres
        .map(valor => ({ valor, orden: Math.random() }))  
        .sort((a, b) => a.orden - b.orden)                
        .map(objeto => objeto.valor)                     
        .join('');                                        

    return mezclado;
}

function establecerPalabraAleatoria() {
    palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
    palabraMezclada = mezclarPalabra(palabraActual);
    intentoUsuario = Array(palabraActual.length).fill("_");
    errores = 0;
    actualizarPantalla();
}

function actualizarPantalla() {
    displayPalabraMezclada.textContent = intentoUsuario.join(" ");
    displayErrores.textContent = `Errores: ${errores}/${maxErrores}`;
    contenedorLetras.innerHTML = '';

    palabraMezclada.split('').reduce((contenedor, letra, indice) => {
        const boton = document.createElement("button");
        boton.textContent = letra;
        boton.onclick = () => manejarClickLetra(letra, indice);
        contenedor.appendChild(boton);
        return contenedor;
    }, contenedorLetras);
}

function manejarClickLetra(letra, indice) {
    const indiceVacio = intentoUsuario.indexOf("_");
    if (indiceVacio !== -1) {
        intentoUsuario[indiceVacio] = letra;
        actualizarPantalla();
    }
}

function comprobarPalabra() {
    if (intentoUsuario.join('') === palabraActual) {
        alert("¡Correcto!");
    } else {
        errores++;
        if (errores >= maxErrores) {
            alert("¡Perdiste! La palabra era " + palabraActual);
            establecerPalabraAleatoria();
        } else {
            alert("Incorrecto. Sigue intentando.");
            actualizarPantalla();
        }
    }
}

document.getElementById("accept-btn").onclick = comprobarPalabra;
document.getElementById("random-btn").onclick = establecerPalabraAleatoria;

establecerPalabraAleatoria();
