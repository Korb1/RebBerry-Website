// Funcionalidad del slider de inicio
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelector('.slider-dots');

    let currentIndex = 0;
    const slideCount = slides.length;

    // Crear puntos indicadores
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dots.appendChild(dot);
    }

    const dotElements = document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;

        updateDots();
    }

    function updateDots() {
        dotElements.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dotElements.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Cambio automático de diapositivas cada 5 segundos
    setInterval(() => goToSlide(currentIndex + 1), 10000);
});

// Función para el desplazamiento suave
function smoothScroll(target, duration) {
    var targetElement = document.getElementById(target);
    var targetPosition = targetElement.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Agregar event listeners a los botones del slider
document.addEventListener('DOMContentLoaded', function () {
    var slideButtons = document.querySelectorAll('.slide-btn');
    slideButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var target = this.getAttribute('data-target');
            smoothScroll(target, 1000);
        });
    });
});

// Funcionalidad del carrusel
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function () {
    showSlider('next');
}
prevButton.onclick = function () {
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if (type === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function () {
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function () {
    carousel.classList.remove('showDetail');
}




// Funcionalidad de ofertas
function updateOfferTimers() {
    const offerCards = document.querySelectorAll('.offer-card');

    offerCards.forEach(card => {
        const timer = card.querySelector('.offer-timer');
        const endTime = new Date(card.dataset.countdown).getTime();
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timer.innerHTML = `
                <span>${days}d</span>
                <span>${hours.toString().padStart(2, '0')}h</span>
                <span>${minutes.toString().padStart(2, '0')}m</span>
                <span>${seconds.toString().padStart(2, '0')}s</span>
            `;
        } else {
            timer.innerHTML = '<span>Oferta terminada</span>';
            card.classList.add('offer-ended');
        }
    });
}

// Actualizar los temporizadores cada segundo
setInterval(updateOfferTimers, 1000);

// Iniciar los temporizadores inmediatamente
document.addEventListener('DOMContentLoaded', updateOfferTimers);




// Funciones del feedback slider
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos del DOM
    const slider = document.querySelector('.feedback-slider-card');
    const slides = Array.from(slider.querySelectorAll('.feedback-card-item'));
    const prevBtn = document.getElementById('feedback-btn-prev');
    const nextBtn = document.getElementById('feedback-btn-next');

    let currentIndex = 0;

    // Función para actualizar la visualización del slider
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else if (index === (currentIndex + 1) % slides.length) {
                slide.classList.add('next');
            }
        });
    }

    // Función para ir a la siguiente diapositiva
    function goToNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    // Función para ir a la diapositiva anterior
    function goToPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Eventos de clic para los botones de navegación
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            goToNext();
        } else if (e.key === 'ArrowLeft') {
            goToPrev();
        }
    });

    // Inicializar el slider
    updateSlider();
});




// Funciones de la sección ai-integration

// Función principal para inicializar todas las funcionalidades de AI
function initAIIntegration() {
    setupAICards();
    animateProgressBars();
    createAINodes();
    initChatDemo();
}

// Función para expandir y colapsar las secciones de AI integración
function setupAICards() {
    const expandButtons = document.querySelectorAll('.ai-expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                this.textContent = 'Colapsar';
                content.style.opacity = '0';
                setTimeout(() => { content.style.opacity = '1'; }, 10);
            } else {
                content.style.display = 'none';
                this.textContent = 'Explorar';
            }
        });
    });
}

// Función para animar las barras de progreso
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '0%';
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 100);
    });
}

// Función para crear la visualización de nodos de IA
function createAINodes() {
    const showcaseVisual = document.querySelector('.showcase-visual');
    if (!showcaseVisual) return;

    const nodes = showcaseVisual.querySelectorAll('.ai-node');
    nodes.forEach((node, index) => {
        const angle = (index / nodes.length) * Math.PI * 2;
        const radius = 100;
        const x = Math.cos(angle) * radius + 150;
        const y = Math.sin(angle) * radius + 150;
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.opacity = '0';
        setTimeout(() => {
            node.style.transition = 'opacity 0.5s ease-in-out';
            node.style.opacity = '1';
        }, index * 100);
    });
}

// Función para inicializar el chat demo
function initChatDemo() {
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');

    if (!chatInput || !chatSend || !chatMessages) return;

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            appendMessage('user', message);
            chatInput.value = '';
            // Simular respuesta del AI después de 1 segundo
            setTimeout(() => {
                const aiResponses = [
                    "Entiendo tu consulta. Déjame procesarla...",
                    "Interesante pregunta. Analizando las mejores opciones...",
                    "Gracias por tu mensaje. Estoy buscando la información más relevante...",
                    "Excelente pregunta. Dame un momento para encontrar la mejor respuesta...",
                ];
                const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
                appendMessage('ai', randomResponse);
            }, 1000);
        }
    }

    function appendMessage(sender, text) {
        const messageElement = document.createElement('p');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Inicializar todas las funciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initAIIntegration);


// Botón de para mas información sobre la ética de la IA
document.addEventListener('DOMContentLoaded', function () {
    const iaEticaBtn = document.getElementById('ia-etica-btn');
    if (iaEticaBtn) {
        iaEticaBtn.addEventListener('click', function () {
            window.location.href = 'enlaces-interesantes/IA etica en RecBerry/ia-etica.html';
        });
    }
});


// Botón Volver Arriba
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});