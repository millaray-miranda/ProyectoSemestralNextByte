document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.indicator');
    
    // Variables de estado
    let currentIndex = 0;
    let intervalId = null;
    const intervalTime = 5000; // 5 segundos
    
    // Función para mover el carrusel a un índice específico
    function goToSlide(index) {
        // Asegurarse de que el índice esté dentro de los límites
        if (index < 0) {
            index = carouselItems.length - 1;
        } else if (index >= carouselItems.length) {
            index = 0;
        }
        
        // Mover el carrusel
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Actualizar índice actual
        currentIndex = index;
    }
    
    // Función para ir al slide siguiente
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Iniciar el carrusel automático
    function startAutoSlide() {
        intervalId = setInterval(nextSlide, intervalTime);
    }
    
    // Detener el carrusel automático
    function stopAutoSlide() {
        clearInterval(intervalId);
    }
    
    // Event listeners para los controles
    nextButton.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevButton.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });
    
    // Pausar el carrusel cuando el mouse está sobre él
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Iniciar el carrusel automático
    startAutoSlide();
});