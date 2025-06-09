document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailValidationIcon = document.getElementById('emailValidationIcon');
    const passwordValidationIcon = document.getElementById('passwordValidationIcon');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginStatus = document.getElementById('loginStatus');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const createAccountLink = document.getElementById('createAccount');

    // Función para validar el email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Función para validar la contraseña
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

    // Función para mostrar errores
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

    // Función para limpiar errores
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Validación de email en tiempo real
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

    // Validación de contraseña en tiempo real
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

    // Mostrar/ocultar contraseña
    passwordToggle.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Simulación de inicio de sesión
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validar todos los campos antes de enviar
        const isEmailValid = validateEmail(emailInput.value);
        const { isValid: isPasswordValid } = validatePassword(passwordInput.value);

        if (!isEmailValid) {
            showError(emailInput, 'Por favor, ingrese un email válido.');
        }
        if (!isPasswordValid) {
            showError(passwordInput, 'La contraseña no cumple con los requisitos.');
        }

        // Si hay errores, no continuar con el envío
        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        // Mostrar spinner
        loadingIndicator.style.display = 'block';
        loginStatus.style.display = 'none';

        // Simulamos una llamada a la API 
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            loginStatus.textContent = `Iniciando sesión... ${progress}%`;
            loginStatus.style.display = 'block';
            loginStatus.className = 'info';

            if (progress >= 100) {
                clearInterval(progressInterval);
                loadingIndicator.style.display = 'none';

                const success = Math.random() < 0.9; // 90% de probabilidad de éxito

                if (success) {
                    loginStatus.textContent = '¡Inicio de sesión exitoso!';
                    loginStatus.className = 'success';
                    setTimeout(() => {
                        loginStatus.textContent = 'Cargando perfil de usuario...';
                        setTimeout(() => {
                            loginStatus.textContent = 'Verificando preferencias...';
                            setTimeout(() => {
                                loginStatus.textContent = 'Redirigiendo a la pagina principal...';
                                setTimeout(() => {
                                    window.location.href = '/HOME/index.html';
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                } else {
                    loginStatus.textContent = 'Error en el inicio de sesión. Verificando el problema...';
                    loginStatus.className = 'error';
                    setTimeout(() => {
                        loginStatus.textContent = 'Error: Credenciales incorrectas. Por favor, inténtelo de nuevo.';
                    }, 2000);
                }
            }
        }, 200);
    });

    // Funcionalidad de "Olvidé mi contraseña"
    forgotPasswordLink.addEventListener('click', function (e) {
        e.preventDefault();
        const email = prompt('Por favor, ingrese su dirección de correo electrónico:');
        if (email) {
            if (validateEmail(email)) {
                loginStatus.textContent = 'Enviando correo de recuperación...';
                loginStatus.className = 'info';
                loginStatus.style.display = 'block';
                setTimeout(() => {
                    loginStatus.textContent = 'Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña.';
                    loginStatus.className = 'success';
                }, 2000);
            } else {
                loginStatus.textContent = 'Por favor, ingrese una dirección de correo electrónico válida.';
                loginStatus.className = 'error';
                loginStatus.style.display = 'block';
            }
        }
    });

    // Funcionalidad de "Crear cuenta"
    createAccountLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginStatus.textContent = 'Preparando formulario de registro...';
        loginStatus.className = 'info';
        loginStatus.style.display = 'block';
        setTimeout(() => {
            loginStatus.textContent = 'Redirigiendo a la página de registro...';
            setTimeout(() => {
                window.location.href = '/HOME/enlaces-interesantes/Creacion de Cuenta/crear-cuenta.html';
            }, 1000);
        }, 1500);
    });
});
