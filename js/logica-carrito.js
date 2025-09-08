document.addEventListener('DOMContentLoaded', () => {
    // Definimos el descuento y las variables
    const DESCUENTO_VALOR = 0.10; // 10% de descuento
    const CODIGO_SECRETO = 'NEXTBYTE10';
    let descuentoAplicado = false;

    // Función principal para renderizar el carrito
    function renderizarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const listaProductos = document.getElementById('lista-productos');
        const carritoVacioMensaje = document.getElementById('carrito-vacio');

        if (!listaProductos || !carritoVacioMensaje) {
            console.error("Error: La página del carrito no tiene los elementos HTML necesarios.");
            return;
        }

        listaProductos.innerHTML = '';

        if (carrito.length === 0) {
            carritoVacioMensaje.style.display = 'block';
        } else {
            carritoVacioMensaje.style.display = 'none';

            carrito.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto-item');
                productoDiv.dataset.nombre = producto.nombre;

                // Calcula el subtotal para cada producto
                const subtotalItem = producto.precio * producto.cantidad;

                productoDiv.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="producto-info">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio.toLocaleString('es-CL')}</p>
                    </div>
                    <div class="cantidad-controls">
                        <button class="decrementar">-</button>
                        <input type="number" value="${producto.cantidad}" min="1" class="cantidad-input">
                        <button class="incrementar">+</button>
                    </div>
                    <p class="subtotal-item">$${subtotalItem.toLocaleString('es-CL')}</p>
                    <button class="eliminar-btn">Eliminar</button>
                `;
                listaProductos.appendChild(productoDiv);
            });
        }

        calcularTotales(carrito);
    }

    // Función para calcular y mostrar los totales del carrito
    function calcularTotales(carrito) {
        const subtotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        const envio = subtotal > 0 ? 5000 : 0;
        let descuento = 0;

        if (descuentoAplicado) {
            descuento = subtotal * DESCUENTO_VALOR;
        }

        const total = subtotal - descuento + envio;

        // Actualizamos todos los valores en el HTML
        document.getElementById('subtotal-valor').textContent = `$${subtotal.toLocaleString('es-CL')}`;
        document.getElementById('envio-valor').textContent = `$${envio.toLocaleString('es-CL')}`;
        document.getElementById('descuento-valor').textContent = `-$${descuento.toLocaleString('es-CL')}`;
        document.getElementById('total-valor').textContent = `$${total.toLocaleString('es-CL')}`;
    }

    // Función para manejar los eventos de clic de los botones
    function manejarEventos(event) {
        // Vaciar carrito
        if (event.target.id === 'btnVaciar') {
            if (confirm('¿Estás seguro que deseas vaciar el carrito?')) {
                localStorage.removeItem('carrito');
                descuentoAplicado = false;
                renderizarCarrito();
            }
            return;
        }

        // Aplicar descuento
        if (event.target.id === 'aplicar-descuento') {
            const codigoInput = document.getElementById('codigo-descuento');
            if (codigoInput.value.toUpperCase() === CODIGO_SECRETO) {
                descuentoAplicado = true;
                alert('¡Código de descuento aplicado!');
            } else {
                descuentoAplicado = false;
                alert('Código de descuento inválido.');
            }
            renderizarCarrito();
            return;
        }

        // Eventos para los productos (+, -, eliminar)
        const itemContenedor = event.target.closest('.producto-item');
        if (!itemContenedor) return;

        const nombreProducto = itemContenedor.dataset.nombre;
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoIndex = carrito.findIndex(item => item.nombre === nombreProducto);

        if (event.target.classList.contains('incrementar')) {
            if (productoIndex !== -1) {
                carrito[productoIndex].cantidad++;
            }
        } else if (event.target.classList.contains('decrementar')) {
            if (productoIndex !== -1 && carrito[productoIndex].cantidad > 1) {
                carrito[productoIndex].cantidad--;
            }
        } else if (event.target.classList.contains('eliminar-btn')) {
            if (productoIndex !== -1) {
                carrito.splice(productoIndex, 1);
            }
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    }

    renderizarCarrito();
    document.body.addEventListener('click', manejarEventos);
});