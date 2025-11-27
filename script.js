// Función para modo oscuro persistente
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(savedTheme);
    
    // Asegurar que si se guardó dark-mode, el body tenga la clase
    if (savedTheme === 'dark-mode') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        // Toggle lógica
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateToggleIcon('light-mode');
            console.log('Tema cambiado a: light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateToggleIcon('dark-mode');
            console.log('Tema cambiado a: dark-mode');
        }
    });

    function updateToggleIcon(theme) {
        themeToggle.innerHTML = theme === 'dark-mode' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
}

// Scroll suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Validación y envío de formulario (Sin caché)
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Limpiar formulario al cargar la página para evitar caché
    form.reset();

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        let isValid = true;

        // Validaciones simples
        if (!name) {
            showError('nameError', 'El nombre es obligatorio.');
            isValid = false;
        } else hideError('nameError');

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('emailError', 'Ingresa un email válido.');
            isValid = false;
        } else hideError('emailError');

        if (!message) {
            showError('messageError', 'El mensaje es obligatorio.');
            isValid = false;
        } else hideError('messageError');

        if (isValid) {
            showMessage('Enviando...', '');
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showMessage('Mensaje enviado exitosamente. ¡Gracias!', 'success');
                    form.reset(); // Limpiar caché visualmente
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                showMessage('Error al enviar. Intenta de nuevo.', 'error');
            }
        }
    });
}

// Funciones auxiliares
function showError(id, message) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = message;
        el.style.display = 'block';
    }
}

function hideError(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

function showMessage(message, type) {
    const msgDiv = document.getElementById('formMessage');
    if (msgDiv) {
        msgDiv.textContent = message;
        msgDiv.className = type;
        msgDiv.style.display = 'block';
        if (type === 'success') {
            setTimeout(() => { msgDiv.style.display = 'none'; }, 5000);
        }
    }
}

// Animaciones scroll
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Limpieza agresiva de caché al navegar atrás
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const form = document.getElementById('contactForm');
        if (form) form.reset();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSmoothScroll();
    initFormValidation();
    initScrollAnimations();
});