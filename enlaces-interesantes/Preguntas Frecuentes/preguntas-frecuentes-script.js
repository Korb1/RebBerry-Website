// JavaScript para la funcionalidad de las preguntas frecuentes
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('active');
    });
});

// Funcionalidad de búsqueda
const searchInput = document.getElementById('faq-search');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Funcionalidad de filtrado por categorías
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        document.querySelectorAll('.faq-category').forEach(cat => {
            if (cat.getAttribute('data-category') === category || category === 'all') {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    });
});

// Prevenir el envío del formulario (para demostración)
document.querySelector('#contact-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Gracias por tu pregunta. Te responderemos pronto.');
});