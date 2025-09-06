// 1. Obtenemos las imágenes principales y secundarias
const imagenPrincipal = document.querySelector('.principal img');
const imagenesSecundarias = document.querySelectorAll('.secundarias img');

// 2. Agregamos un "escucha de evento" a cada imagen secundaria
imagenesSecundarias.forEach(imagenSecundaria => {
    imagenSecundaria.addEventListener('click', () => {
        // 3. Guardamos la ruta (src) de la imagen principal en una variable temporal
        const srcTemporal = imagenPrincipal.src;

        // 4. Cambiamos la imagen principal por la imagen en la que se hizo clic
        imagenPrincipal.src = imagenSecundaria.src;

        // 5. Y ahora, cambiamos la imagen secundaria por la que era la principal
        imagenSecundaria.src = srcTemporal;
    });
});