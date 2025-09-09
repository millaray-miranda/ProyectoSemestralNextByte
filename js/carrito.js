document.addEventListener('DOMContentLoaded', function() {
    const btnAgregar = document.getElementById('btnAgregar');
    const btnComprar = document.getElementById('btnComprar');
    // 1. Obtenemos el elemento del contador con su ID
    const contadorCarrito = document.getElementById('contador-carrito');

    // 2. Creamos una función para actualizar el contador
    function actualizarContador() {
        // Obtenemos el carrito del localStorage
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Sumamos la cantidad de todos los productos en el carrito
        const totalItems = carrito.reduce((acumulador, producto) => {
            return acumulador + producto.cantidad;
        }, 0);

        // Actualizamos el texto del elemento en el HTML
        if (contadorCarrito) {
            contadorCarrito.textContent = totalItems;
        }
    }

    if (btnAgregar) {
        btnAgregar.addEventListener('click', function() {
            // Obtener la información del producto
            const nombreProducto = document.querySelector('.nombre-producto h2').textContent;
            const precioTexto = document.querySelector('.valor p').textContent;
            const imagenUrl = document.querySelector('.principal img').src;

            // Limpiamos el texto del precio para que sea un número válido
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
            
            // 3. Llamamos a la función para actualizar el contador después de agregar un producto
            actualizarContador();
        });
    }

    if (btnComprar) {
        btnComprar.addEventListener('click', function() {
            window.open('carrito.html', '_blank');
        });
    }

    // 4. Llamamos a la función al cargar la página para mostrar el estado inicial
    actualizarContador();
});