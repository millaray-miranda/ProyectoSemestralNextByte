document.addEventListener('DOMContentLoaded', function() {
    const contadorCarrito = document.getElementById('contador-carrito');
    const botonesAgregar = document.querySelectorAll('.botton-comprar');

    function actualizarContador() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
        if (contadorCarrito) {
            contadorCarrito.textContent = totalItems;
        }
    }

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function() {
            const detalles = boton.closest('.detalles-producto');
            if (!detalles) {
                console.error('No se encontró el contenedor .detalles-producto para el botón', boton);
                return;
            }

            const nombreProducto = detalles.querySelector('.nombre-producto h2').textContent;
            const precioTexto = detalles.querySelector('.valor p').textContent;
            // IMPORTANTE: asegurarse que exista la imagen-producto para no lanzar error
            const imagenElemento = detalles.querySelector('.imagen-producto img');
            const imagenUrl = imagenElemento ? imagenElemento.src : 'https://via.placeholder.com/50';

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

    // Variables para la vista previa
    const btnCarritoVistaPrevia = document.getElementById('btnCarritoVistaPrevia');
    const vistaPreviaCarrito = document.getElementById('vista-previa-carrito');
    const listaProductosPrevia = document.getElementById('lista-productos-previa');
    const totalPrevia = document.getElementById('total-previa');
    const carritoVacioTexto = document.getElementById('carrito-vacio-texto');

    function mostrarVistaPrevia() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        listaProductosPrevia.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            carritoVacioTexto.style.display = 'block';
            totalPrevia.textContent = '$0';
        } else {
            carritoVacioTexto.style.display = 'none';
            carrito.forEach(producto => {
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.marginBottom = '10px';
                li.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: auto; margin-right: 10px;">
                    <div>
                        <strong>${producto.nombre}</strong><br>
                        Cantidad: ${producto.cantidad} <br>
                        Subtotal: $${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                    </div>
                `;
                listaProductosPrevia.appendChild(li);
                total += producto.precio * producto.cantidad;
            });
            totalPrevia.textContent = `$${total.toLocaleString('es-CL')}`;
        }
        vistaPreviaCarrito.style.display = 'block';
    }

    function ocultarVistaPrevia() {
        vistaPreviaCarrito.style.display = 'none';
    }

    btnCarritoVistaPrevia.addEventListener('click', function(event) {
        event.stopPropagation();
        if (vistaPreviaCarrito.style.display === 'block') {
            ocultarVistaPrevia();
        } else {
            mostrarVistaPrevia();
        }
    });

    document.addEventListener('click', function(event) {
        if (!vistaPreviaCarrito.contains(event.target) && event.target !== btnCarritoVistaPrevia) {
            ocultarVistaPrevia();
        }
    });

    actualizarContador();
});
