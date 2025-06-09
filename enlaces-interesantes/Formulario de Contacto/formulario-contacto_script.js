document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const fields = ['name', 'email', 'subject', 'message'];

    fields.forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('blur', () => validateField(field));
        input.addEventListener('input', () => validateField(field));
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            // Mostrar animación de carga
            document.getElementById('loading').style.display = 'block';
            form.style.opacity = '0.5';

            // Simulación de envío
            setTimeout(function () {
                document.getElementById('loading').style.display = 'none';
                form.style.display = 'none';
                document.getElementById('success-message').style.display = 'block';
            }, 2000);
        }
    });
});

function validateForm() {
    let isValid = true;
    const fields = ['name', 'email', 'subject', 'message'];

    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();

    switch(fieldId) {
        case 'name':
            return value !== '' ? clearError(fieldId) : showError(fieldId, 'Por favor, ingresa tu nombre completo');
        case 'email':
            return isValidEmail(value) ? clearError(fieldId) : showError(fieldId, 'Por favor, ingresa un correo electrónico válido');
        case 'subject':
            return value !== '' ? clearError(fieldId) : showError(fieldId, 'Por favor, selecciona un asunto');
        case 'message':
            return value !== '' ? clearError(fieldId) : showError(fieldId, 'Por favor, ingresa tu mensaje');
        default:
            return true;
    }
}

function showError(id, message) {
    const errorElement = document.getElementById(id + '-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    return false;
}

function clearError(id) {
    const errorElement = document.getElementById(id + '-error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    return true;
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}