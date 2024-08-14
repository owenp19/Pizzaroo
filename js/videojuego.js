const malla = document.getElementById('malla');
const marcador = document.getElementById('marcador');
const mensajeFinal = document.getElementById('mensajeFinal');

let puntos = 0;
let velocidadIngrediente = 2;
const puntosMeta = 20; // Meta de puntos para obtener un cupón

// Mover la malla con el mouse
document.addEventListener('mousemove', (e) => {
    const contenedorRect = document.querySelector('.contenedor-juego').getBoundingClientRect();
    let mouseX = e.clientX - contenedorRect.left;
    if (mouseX < 50) mouseX = 50;
    if (mouseX > contenedorRect.width - 50) mouseX = contenedorRect.width - 50;
    malla.style.left = `${mouseX}px`;
});

// Boton comenzar
document.getElementById('botonComenzar').addEventListener('click', () => {
    document.getElementById('pantallaInicial').style.display = 'none';
    document.querySelector('.contenedor-juego').style.display = 'block';
    // Inicia el juego generando ingredientes
    setInterval(crearIngrediente, 1000);
});

// Generar ingredientes aleatorios
function crearIngrediente() {
    const nuevoIngrediente = document.createElement('div');
    nuevoIngrediente.classList.add('ingrediente');
    nuevoIngrediente.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    document.querySelector('.contenedor-juego').appendChild(nuevoIngrediente);
    moverIngrediente(nuevoIngrediente);
}

// Mover ingredientes hacia abajo
function moverIngrediente(ingrediente) {
    let posY = -50;
    const intervalo = setInterval(() => {
        posY += velocidadIngrediente;
        ingrediente.style.top = `${posY}px`;

        // Detectar colisiones
        if (detectarColision(malla, ingrediente)) {
            clearInterval(intervalo);
            ingrediente.remove();
            puntos++;
            actualizarMarcador();
            aumentarDificultad();
            verificarMeta();
        }

        // Eliminar ingredientes que salen de la pantalla
        if (posY > window.innerHeight) {
            clearInterval(intervalo);
            ingrediente.remove();
        }
    }, 20);
}

// Verificar colisión
function detectarColision(base, ingrediente) {
    const baseRect = base.getBoundingClientRect();
    const ingredienteRect = ingrediente.getBoundingClientRect();

    return !(
        baseRect.top > ingredienteRect.bottom ||
        baseRect.bottom < ingredienteRect.top ||
        baseRect.left > ingredienteRect.right ||
        baseRect.right < ingredienteRect.left
    );
}

// Actualizar el marcador
function actualizarMarcador() {
    marcador.textContent = `Puntos: ${puntos}`;
}

// Aumentar la dificultad
function aumentarDificultad() {
    if (puntos % 5 === 0) {
        velocidadIngrediente += 1;
    }
}

// Verificar si se alcanza la meta de puntos
function verificarMeta() {
    if (puntos >= puntosMeta) {
        mostrarMensajeFinal();
    }
}

// Mostrar mensaje de felicitaciones
function mostrarMensajeFinal() {
    mensajeFinal.textContent = "¡Felicidades! Has conseguido un cupón de descuento 🎉";
    mensajeFinal.style.display = 'block';
    setTimeout(() => {
        mensajeFinal.style.display = 'none';
    }, 5000);
}

// Generar nuevos ingredientes de forma periódica
setInterval(crearIngrediente, 1000);


