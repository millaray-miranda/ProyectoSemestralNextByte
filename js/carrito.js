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
            const imagenUrl = detalles.querySelector('.imagen-producto img').src;

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

    actualizarContador();
});
