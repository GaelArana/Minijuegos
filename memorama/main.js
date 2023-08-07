let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertosJugador1 = 0;
let aciertosJugador2 = 0;
let jugador1Turno = true;
let paresEncontrados = 0;

const reglas = document.getElementById("reglas");
const historia = document.getElementById("historia");

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertosJugador1 = document.getElementById('jugador1');
let mostrarAciertosJugador2 = document.getElementById('jugador2');
let mostrarGanador = document.getElementById('ganador');
let botonJugarDeNuevo = document.getElementById('jugarDeNuevo');
let botonTurnoJugador = document.getElementById('turnoJugador');

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });

function destapar(id) {
    if (tarjetasdestapadas === 0) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = numeros[id];
        tarjeta1.disabled = true;
    } else if (tarjetasdestapadas === 1) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        setTimeout(verificarPar, 1000);
    }
    tarjetasdestapadas = (tarjetasdestapadas + 1) % 2;
}

function verificarPar() {
    if (tarjeta1.innerHTML === tarjeta2.innerHTML) {
        paresEncontrados++;
        if (jugador1Turno) {
            aciertosJugador1++;
            mostrarAciertosJugador1.innerHTML = `Jugador 1: ${aciertosJugador1} pares`;
        } else {
            aciertosJugador2++;
            mostrarAciertosJugador2.innerHTML = `Jugador 2: ${aciertosJugador2} pares`;
        }
        if (paresEncontrados === 8) {
            mostrarGanador.innerHTML = aciertosJugador1 > aciertosJugador2
                ? `Ganador: Jugador 1`
                : (aciertosJugador2 > aciertosJugador1
                    ? `Ganador: Jugador 2`
                    : `Empate`);
            botonJugarDeNuevo.disabled = false;
            botonTurnoJugador.disabled = true;
        }
    } else {
        tarjeta1.innerHTML = '';
        tarjeta2.innerHTML = '';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasdestapadas = 0;
        jugador1Turno = !jugador1Turno;
        mostrarTurno();
    }
}

function mostrarTurno() {
    botonTurnoJugador.innerHTML = jugador1Turno ? 'Turno de Jugador 1' : 'Turno de Jugador 2';
}


function goBack(){
    reglas.style.display = "none";
    historia.style.display = "none";
}

function rules() {
    reglas.style.display = "flex";
}

function history() {
    historia.style.display = "flex";
}

goBack()
mostrarTurno();