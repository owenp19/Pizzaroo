// script de menu desplegable 
document.getElementById("icono-usuario").addEventListener("click", function() {
    const menu = document.getElementById("menu-desplegable");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});

// Cierra el menú si se hace clic fuera de él
window.addEventListener("click", function(event) {
    const menu = document.getElementById("menu-desplegable");
    if (!event.target.matches('#icono-usuario') && !event.target.closest('#menu-sesion')) {
        if (menu.style.display === "block") {
            menu.style.display = "none";
        }
    }
});

// script de videojuego atrapa los ingredientes  
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

// Lista de ingredientes correctos (para pizza)
const ingredientesCorrectos = [
    '/imgs/tomato.png',
    '/imgs/queso.png',
    '/imgs/champiñón.png',
    '/imgs/pimenton.png',
    '/imgs/harina.png'
];

// Lista de ingredientes incorrectos (no para pizza)
const ingredientesIncorrectos = [
    '/imgs/chocolate.png',
    '/imgs/pescado.png',
    '/imgs/brócoli.png',
    '/imgs/helado.png',
    '/imgs/dona.png'
];

// Generar ingredientes aleatorios
function crearIngrediente() {
    const nuevoIngrediente = document.createElement('div');
    nuevoIngrediente.classList.add('ingrediente');

    // Elegir si será un ingrediente correcto o incorrecto (50% de probabilidad)
    const esCorrecto = Math.random() < 0.5;
    const ingredienteAleatorio = esCorrecto 
        ? ingredientesCorrectos[Math.floor(Math.random() * ingredientesCorrectos.length)]
        : ingredientesIncorrectos[Math.floor(Math.random() * ingredientesIncorrectos.length)];

    nuevoIngrediente.style.backgroundImage = `url(${ingredienteAleatorio})`;
    nuevoIngrediente.dataset.tipo = esCorrecto ? 'correcto' : 'incorrecto'; // Añadimos un atributo data para identificar el tipo

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

            // Verificar si el ingrediente es correcto o incorrecto
            if (ingrediente.dataset.tipo === 'correcto') {
                puntos += 10; // Sumar puntos si es correcto
            } else {
                puntos -= 20; // Restar puntos si es incorrecto
            }

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

// Actualizar el marcador
function actualizarMarcador() {
    marcador.textContent = `Puntos: ${puntos}`;
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


// Aumentar la dificultad
function aumentarDificultad() {
    if (puntos % 5 === 0) {
        velocidadIngrediente += 1;
    }
}

// Generar nuevos ingredientes de forma periódica
setInterval(crearIngrediente, 1000);


