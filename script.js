<script>
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
                }
            });
        });
    }

    // Función para validación y envío del formulario
    function initFormValidation() {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validaciones básicas
            if (!nombre) {
                alert('Por favor, ingresa tu nombre.');
                return;
            }
            if (!email || !email.includes('@')) {
                alert('Por favor, ingresa un email válido.');
                return;
            }
            if (!mensaje) {
                alert('Por favor, ingresa un mensaje.');
                return;
            }
            
            // Simulación de envío (puedes reemplazar con Formspree o similar)
            alert(`¡Gracias, ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto.`);
            
            // Limpiar formulario
            form.reset();
        });
    }

    // Función para animaciones de entrada al hacer scroll (opcional)
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
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
    }

    // Inicializar todas las funcionalidades al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        initSmoothScroll();
        initFormValidation();
        initScrollAnimations();
    });
</script>