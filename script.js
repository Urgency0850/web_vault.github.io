// Función para modo oscuro persistente
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Cargar tema guardado o por defecto claro
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(savedTheme);
    updateToggleIcon(savedTheme);
    
    // Evento para cambiar tema
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', currentTheme);
        updateToggleIcon(currentTheme);
        console.log(`Tema cambiado a: ${currentTheme}`); // Log para QA
    });
    
    // Función auxiliar para actualizar ícono
    function updateToggleIcon(theme) {
        themeToggle.innerHTML = theme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Función para scroll suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,  // Ajuste para header fijo si lo agregas
                    behavior: 'smooth'
                });
                console.log(`Scroll suave a: ${targetId}`); // Log para QA
            } else {
                console.warn(`Sección no encontrada: ${targetId}`); // Log para debugging
            }
        });
    });
}

// Función para validación y envío del formulario (CORREGIDO: Validación robusta con feedback visual)
function initFormValidation() {
    const form = document.getElementById('contactForm'); // Cambiado a 'contactForm' para coincidir con HTML
    if (!form) {
        console.error('Formulario no encontrado. Verifica el ID en HTML.');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Formulario enviado, iniciando validación...'); // Log para QA
        
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        let isValid = true;

        // Validaciones con feedback visual
        if (!name) {
            showError('nameError', 'El nombre es obligatorio.');
            isValid = false;
        } else {
            hideError('nameError');
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('emailError', 'Ingresa un email válido.');
            isValid = false;
        } else {
            hideError('emailError');
        }

        if (!message) {
            showError('messageError', 'El mensaje es obligatorio.');
            isValid = false;
        } else {
            hideError('messageError');
        }

        if (isValid) {
            try {
                // Envío real vía Formspree (o simulado si no configuras)
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    showMessage('Mensaje enviado exitosamente. ¡Gracias!', 'success');
                    form.reset();
                    console.log('Mensaje enviado correctamente.'); // Log para QA
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                showMessage('Error al enviar. Verifica tu conexión e intenta de nuevo.', 'error');
                console.error('Error en envío:', error); // Log para debugging
            }
        } else {
            console.log('Validación fallida. Corrige los errores.'); // Log para QA
        }
    });

    // Funciones auxiliares para feedback
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function hideError(id) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    function showMessage(message, type) {
        const msgDiv = document.getElementById('formMessage');
        if (msgDiv) {
            msgDiv.textContent = message;
            msgDiv.className = type; // 'success' o 'error' (definido en CSS)
            msgDiv.style.display = 'block';
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                msgDiv.style.display = 'none';
            }, 5000);
        }
    }
}

// Función para animaciones de entrada al hacer scroll (mejorada)
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) {
        console.warn('No se encontraron secciones para animar.');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                console.log(`Animación activada para: ${entry.target.id}`); // Log para QA
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Inicializar todas las funcionalidades al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada, inicializando funciones...'); // Log inicial para QA
    try {
        initThemeToggle();
        initSmoothScroll();
        initFormValidation();
        initScrollAnimations();
        console.log('Todas las funciones inicializadas correctamente.');
    } catch (error) {
        console.error('Error al inicializar funciones:', error);
    }
});