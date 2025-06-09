document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel del equipo
    initTeamCarousel();

    // Inicializar los gráficos estadísticos
    initCharts();

    // Inicializar la navegación suave
    initSmoothScrolling();

    // Inicializar la animación de la línea de tiempo
    initTimelineAnimation();
});

function initTeamCarousel() {
    const carousel = document.querySelector('.team-carousel');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function showSlide(index) {
        const slides = carousel.querySelectorAll('.team-member');
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
        showSlide(currentIndex);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    showSlide(currentIndex);
}

function initCharts() {
    // Gráfico de Crecimiento de Ventas Anuales
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Ventas Anuales (Millones €)',
                data: [1, 5, 15, 30, 50],
                borderColor: 'rgb(215, 25, 33)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Distribución de Productos
    const productCtx = document.getElementById('productChart').getContext('2d');
    new Chart(productCtx, {
        type: 'pie',
        data: {
            labels: ['RecHeadset', 'RecHome', 'RecHealth', 'RecVR', 'Otros'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    'rgb(215, 25, 33)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });

    // Gráfico de Satisfacción del Cliente
    const satisfactionCtx = document.getElementById('satisfactionChart').getContext('2d');
    new Chart(satisfactionCtx, {
        type: 'bar',
        data: {
            labels: ['Muy Satisfecho', 'Satisfecho', 'Neutral', 'Insatisfecho', 'Muy Insatisfecho'],
            datasets: [{
                label: 'Porcentaje de Clientes',
                data: [60, 25, 10, 3, 2],
                backgroundColor: 'rgb(215, 25, 33)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

