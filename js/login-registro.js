document.addEventListener('DOMContentLoaded', function() {
    // Selectores para los formularios de login y registro
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Selectores para los enlaces en el header que abren los formularios
    const loginLink = document.querySelector('a[onclick="showLogin()"]');
    const registerLink = document.querySelector('a[onclick="showRegister()"]');
    
    // Selectores para los enlaces dentro de los formularios para alternar
    const showLoginLink = document.getElementById('show-login-link');
    const showRegisterLink = document.getElementById('show-register-link');

    // Funciones para mostrar y ocultar los formularios
    function showLogin() {
        if (loginFormContainer) {
            loginFormContainer.style.display = 'flex';
        }
        if (registerFormContainer) {
            registerFormContainer.style.display = 'none';
        }
    }

    function showRegister() {
        if (loginFormContainer) {
            loginFormContainer.style.display = 'none';
        }
        if (registerFormContainer) {
            registerFormContainer.style.display = 'flex';
        }
    }

    function hideForms() {
        if (loginFormContainer) {
            loginFormContainer.style.display = 'none';
        }
        if (registerFormContainer) {
            registerFormContainer.style.display = 'none';
        }
    }

    // Manejadores de eventos para los enlaces del header
    if (loginLink) {
        loginLink.addEventListener('click', function(event) {
            event.preventDefault();
            showLogin();
        });
    }

    if (registerLink) {
        registerLink.addEventListener('click', function(event) {
            event.preventDefault();
            showRegister();
        });
    }

    // Manejadores de eventos para alternar entre formularios
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(event) {
            event.preventDefault();
            showLogin();
        });
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(event) {
            event.preventDefault();
            showRegister();
        });
    }

    // Manejador del formulario de Registro
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            // Validaciones básicas
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Guardar el usuario en localStorage
            localStorage.setItem('registeredUser', JSON.stringify({ username, email, password }));
            alert('¡Usuario registrado con éxito!');
            hideForms();
        });
    }

    // Manejador del formulario de Login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const usernameInput = document.getElementById('login-username').value;
            const passwordInput = document.getElementById('login-password').value;

            // Obtener el usuario registrado de localStorage
            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

            // Verificar credenciales
            if (storedUser && storedUser.username === usernameInput && storedUser.password === passwordInput) {
                alert('¡Inicio de sesión exitoso!');
                hideForms();
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        });
    }
    
    // Ocultar los formularios al hacer clic fuera de ellos
    document.addEventListener('click', function(event) {
        if (event.target === loginFormContainer || event.target === registerFormContainer) {
            hideForms();
        }
    });

    // Asegúrate de que los formularios estén ocultos al cargar la página
    hideForms();
});