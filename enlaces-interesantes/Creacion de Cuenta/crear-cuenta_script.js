document.addEventListener('DOMContentLoaded', function () {
    const createAccountForm = document.getElementById('createAccountForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const nameValidationIcon = document.getElementById('nameValidationIcon');
    const emailValidationIcon = document.getElementById('emailValidationIcon');
    const passwordValidationIcon = document.getElementById('passwordValidationIcon');
    const confirmPasswordValidationIcon = document.getElementById('confirmPasswordValidationIcon');
    const passwordToggle = document.getElementById('passwordToggle');
    const accountStatus = document.getElementById('accountStatus');
    const loadingIndicator = document.getElementById('loadingIndicator');

    function validateName(name) {
        return name.length >= 2;
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasNonalphas = /\W/.test(password);
        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas,
            errors: [
                password.length < minLength ? 'Al menos 8 caracteres' : null,
                !hasUpperCase ? 'Al menos una mayúscula' : null,
                !hasLowerCase ? 'Al menos una minúscula' : null,
                !hasNumbers ? 'Al menos un número' : null,
                !hasNonalphas ? 'Al menos un carácter especial' : null
            ].filter(Boolean)
        };
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    nameInput.addEventListener('input', function () {
        const isValid = validateName(this.value);
        nameValidationIcon.textContent = isValid ? '✓' : '✗';
        nameValidationIcon.className = `validation-icon ${isValid ? 'valid' : 'invalid'}`;
        if (!isValid) {
            showError(this, 'El nombre debe tener al menos 2 caracteres.');
        } else {
            clearError(this);
        }
    });

    emailInput.addEventListener('input', function () {
        const isValid = validateEmail(this.value);
        emailValidationIcon.textContent = isValid ? '✓' : '✗';
        emailValidationIcon.className = `validation-icon ${isValid ? 'valid' : 'invalid'}`;
        if (!isValid) {
            showError(this, 'Por favor, ingrese un email válido.');
        } else {
            clearError(this);
        }
    });

    passwordInput.addEventListener('input', function () {
        const { isValid, errors } = validatePassword(this.value);
        passwordValidationIcon.textContent = isValid ? '✓' : '✗';
        passwordValidationIcon.className = `validation-icon ${isValid ? 'valid' : 'invalid'}`;
        if (!isValid) {
            showError(this, errors.join(', '));
        } else {
            clearError(this);
        }
    });

    confirmPasswordInput.addEventListener('input', function () {
        const isValid = this.value === passwordInput.value;
        confirmPasswordValidationIcon.textContent = isValid ? '✓' : '✗';
        confirmPasswordValidationIcon.className = `validation-icon ${isValid ? 'valid' : 'invalid'}`;
        if (!isValid) {
            showError(this, 'Las contraseñas no coinciden.');
        } else {
            clearError(this);
        }
    });

    passwordToggle.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        confirmPasswordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    createAccountForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const { isValid: isPasswordValid } = validatePassword(passwordInput.value);
        const isConfirmPasswordValid = passwordInput.value === confirmPasswordInput.value;

        if (!isNameValid) showError(nameInput, 'El nombre debe tener al menos 2 caracteres.');
        if (!isEmailValid) showError(emailInput, 'Por favor, ingrese un email válido.');
        if (!isPasswordValid) showError(passwordInput, 'La contraseña no cumple con los requisitos.');
        if (!isConfirmPasswordValid) showError(confirmPasswordInput, 'Las contraseñas no coinciden.');

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            loadingIndicator.style.display = 'block';
            accountStatus.style.display = 'none';

            // Simulamos una llamada a la API
            setTimeout(() => {
                loadingIndicator.style.display = 'none';
                accountStatus.textContent = '¡Cuenta creada con éxito! Redirigiendo...';
                accountStatus.className = 'success';
                accountStatus.style.display = 'block';

                // Simulamos una redirección después de crear la cuenta
                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 2000);
            }, 2000);
        }
    });
});