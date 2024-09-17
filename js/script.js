// script barra de navegacion   
const header = document.querySelector('header');
const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.barra-nav');

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 0);
});

// script de animacion de entrada 
menu.onclick = () => {
    navbar.classList.toggle('sticky');
}
window.onscroll =() => {
    navbar.classList.remove('sticky');
}
const sr = ScrollReveal ({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});
sr.reveal('.inicio-texto',{delay:200, origin:'top'});
sr.reveal('.inicio-img',{delay:450, origin:'top'});

// script de corazon like
document.querySelectorAll('.corazon-icono').forEach(icon => {
    icon.addEventListener('click', function() {
        this.querySelector('i').classList.toggle('liked');
    });
});

// script de añadir al carrito de compras
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('carrito-numero');
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const pizzaName = button.getAttribute('nombre-datos');
            const pizzaPrice = button.getAttribute('precio-datos');
            cart.push({ name: pizzaName, price: pizzaPrice });
            alert(`${pizzaName} ha sido añadida al carrito.`);
            cartCount.textContent = cart.length;
            console.log(cart);
        });
    });
});

// script de detalles del producto
document.addEventListener('DOMContentLoaded', () => {
    const precioBaseProducto = 30800;
    const precioProductoElemento = document.getElementById('precio-producto');
    const opcionesAdicionales = document.getElementById('opciones-adicionales');
    const cantidadProducto = document.getElementById('cantidad-producto');
    const añadirCarritoBtn = document.getElementById('añadir-carrito');
    const listaCarrito = document.getElementById('lista-carrito');

    // Actualizar el precio del producto cuando se selecciona una opción adicional
    opcionesAdicionales.addEventListener('change', actualizarPrecio);
    cantidadProducto.addEventListener('input', actualizarPrecio);

    function actualizarPrecio() {
        const precioAdicional = parseInt(opcionesAdicionales.value);
        const cantidad = parseInt(cantidadProducto.value);
        const precioTotal = (precioBaseProducto + precioAdicional) * cantidad;
        precioProductoElemento.textContent = `$${precioTotal.toLocaleString()}`;
    }

    // Añadir producto al carrito
    añadirCarritoBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const nombreProducto = "Pizza Cuatro Quesos";
        const precioAdicional = parseInt(opcionesAdicionales.value);
        const cantidad = parseInt(cantidadProducto.value);
        const precioTotal = (precioBaseProducto + precioAdicional) * cantidad;

        const elementoCarrito = document.createElement('li');
        elementoCarrito.textContent = `${nombreProducto} - $${precioTotal.toLocaleString()} x ${cantidad}`;
        
        listaCarrito.appendChild(elementoCarrito);
    });
});

// script de numero de pedidos en tiempo real 
document.addEventListener("DOMContentLoaded", function() {
    let contador = 1;
    const maxPedidos = 500;
    const incremento = 1;

    const contadorElement = document.querySelector('.cantidad-pedidos');

    // Función para incrementar el contador
    const incrementarContador = () => {
        if (contador < maxPedidos) {
            contador += incremento;
            contadorElement.textContent = contador;
        }
    };

    // Establecer un intervalo de 10 segundos
    setInterval(incrementarContador, 10000); // 10000 ms = 10 segundos
});

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

// Seleccionar todos los botones de 'mas', 'menos', y 'eliminar'
const itemsCarrito = document.querySelectorAll('.item');
const subtotalDisplay = document.getElementById('subtotal');

itemsCarrito.forEach(item => {
    const btnMas = item.querySelector('.mas');
    const btnMenos = item.querySelector('.menos');
    const btnEliminar = item.querySelector('.eliminar');
    const cantidadInput = item.querySelector('.cantidad input');
    const precioItem = parseFloat(item.querySelector('.precio').textContent.replace('COP ', '').replace(',', ''));

    btnMas.addEventListener('click', () => {
        let cantidadActual = parseInt(cantidadInput.value);
        cantidadActual++;
        cantidadInput.value = cantidadActual;
        actualizarSubtotal();
    });

    btnMenos.addEventListener('click', () => {
        let cantidadActual = parseInt(cantidadInput.value);
        if (cantidadActual > 1) {
            cantidadActual--;
            cantidadInput.value = cantidadActual;
            actualizarSubtotal();
        }
    });

    btnEliminar.addEventListener('click', () => {
        item.remove();
        actualizarSubtotal();
    });
});

// Función para actualizar el subtotal
function actualizarSubtotal() {
    let subtotal = 0;
    document.querySelectorAll('.item').forEach(item => {
        const cantidad = parseInt(item.querySelector('.cantidad input').value);
        const precio = parseFloat(item.querySelector('.precio').textContent.replace('COP ', '').replace(',', ''));
        subtotal += cantidad * precio;
    });
    subtotalDisplay.textContent = `COP ${subtotal.toLocaleString()}`;
}





