document.addEventListener('DOMContentLoaded', function() {
    const btnAgregar = document.getElementById('btnAgregar');
    const btnComprar = document.getElementById('btnComprar');

    if (btnAgregar) {
        btnAgregar.addEventListener('click', function() {
            // Obtener la información del producto
            const nombreProducto = document.querySelector('.nombre-producto h2').textContent;
            const precioTexto = document.querySelector('.valor p').textContent;
            const imagenUrl = document.querySelector('.principal img').src; // <-- Captura la URL de la imagen

            // Limpiamos el texto del precio para que sea un número válido
            // Quitamos el signo de dólar, el punto de los miles, y convertimos a un número
            const precioNumerico = parseInt(precioTexto.replace('$', '').replace(/\./g, ''));

            const producto = {
                nombre: nombreProducto,
                precio: precioNumerico,
                imagen: imagenUrl, // <-- Guardamos la URL de la imagen
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
        });
    }

    if (btnComprar) {
        btnComprar.addEventListener('click', function() {
            window.open('carrito.html', '_blank');
        });
    }
});