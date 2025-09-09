document.addEventListener('DOMContentLoaded', function() {
    // Selectores para el carrito y la vista previa
    const contadorCarrito = document.getElementById('contador-carrito');
    const btnCarritoVistaPrevia = document.getElementById('btnCarritoVistaPrevia');
    const vistaPreviaCarrito = document.getElementById('vista-previa-carrito');
    const listaProductosPrevia = document.getElementById('lista-productos-previa');
    const totalPrevia = document.getElementById('total-previa');
    const carritoVacioTexto = document.getElementById('carrito-vacio-texto');

    // Selectores para los botones de agregar productos
    const botonesAgregar = document.querySelectorAll('.btn-agregar-estilo');

    // Función para actualizar el contador
    function actualizarContador() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
        if (contadorCarrito) {
            contadorCarrito.textContent = totalItems;
        }
    }

    // Función para mostrar la vista previa del carrito
    function mostrarVistaPrevia() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        listaProductosPrevia.innerHTML = ''; // Limpiamos la lista anterior
        let total = 0;

        if (carrito.length === 0) {
            carritoVacioTexto.style.display = 'block';
        } else {
            carritoVacioTexto.style.display = 'none';
            carrito.forEach(producto => {
                const item = document.createElement('li');
                item.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px;">
                    <p>${producto.nombre} - Cantidad: ${producto.cantidad}</p>
                    <p>Subtotal: $${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</p>
                `;
                listaProductosPrevia.appendChild(item);
                total += producto.precio * producto.cantidad;
            });
        }
        totalPrevia.textContent = `$${total.toLocaleString('es-CL')}`;
        vistaPreviaCarrito.style.display = 'block'; // Mostramos el contenedor
    }

    // Ocultar la vista previa del carrito
    function ocultarVistaPrevia() {
        vistaPreviaCarrito.style.display = 'none';
    }

    // Manejador de eventos para el botón del carrito
    if (btnCarritoVistaPrevia) {
        btnCarritoVistaPrevia.addEventListener('click', function(event) {
            event.stopPropagation(); // Previene que el clic se propague al documento
            if (vistaPreviaCarrito.style.display === 'block') {
                ocultarVistaPrevia();
            } else {
                mostrarVistaPrevia();
            }
        });
    }

    // Ocultar la vista previa al hacer clic en cualquier lugar de la página
    document.addEventListener('click', function(event) {
        if (vistaPreviaCarrito && !vistaPreviaCarrito.contains(event.target) && event.target !== btnCarritoVistaPrevia) {
            ocultarVistaPrevia();
        }
    });

    // Manejador de evento para los botones "Agregar al carrito"
    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', function() {
                const card = boton.closest('.card');
                const nombreProducto = card.querySelector('.nombre-producto').textContent;
                const precioTexto = card.querySelector('.precio-producto strong').textContent;
                const imagenUrl = card.querySelector('.card-img-top').src;

                const precioNumerico = parseInt(precioTexto.replace('$', '').replace(/\./g, ''));

                const producto = {
                    nombre: nombreProducto,
                    precio: precioNumerico,
                    imagen: imagenUrl,
                    cantidad: 1
                };

                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const productoExistente = carrito.find(item => item.nombre === producto.nombre);

                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push(producto);
                }

                localStorage.setItem('carrito', JSON.stringify(carrito));
                alert('Producto agregado al carrito!');
                actualizarContador();
            });
        });
    }

    // Manejador de evento para el botón "Ver Carrito" dentro de la vista previa
    const btnVerCarritoCompleto = document.getElementById('btnVerCarritoCompleto');
    if (btnVerCarritoCompleto) {
        btnVerCarritoCompleto.addEventListener('click', function() {
            window.open('carrito.html', '_blank');
        });
    }

    // Actualizamos el contador al cargar la página
    actualizarContador();
});