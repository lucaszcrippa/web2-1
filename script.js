// script.js - EcoTech Solar

// 1. Menu fixo + efeito ao scroll
const header = document.querySelector('header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Highlight do link ativo no menu ao scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 3. Validação e feedback do formulário (sem backend - apenas front-end)
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset mensagens anteriores
        formMessage.className = '';
        formMessage.textContent = '';
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validações simples
        if (nome.length < 2) {
            showFormError('Por favor, informe um nome válido.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Por favor, informe um e-mail válido.');
            return;
        }
        
        if (mensagem.length < 10) {
            showFormError('A mensagem deve ter pelo menos 10 caracteres.');
            return;
        }
        
        // Simulação de envio bem-sucedido
        formMessage.classList.add('success');
        formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato. ☀️';
        form.reset();
        
        // Remove mensagem após 6 segundos
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 6000);
    });
}

function showFormError(msg) {
    formMessage.classList.add('error');
    formMessage.textContent = msg;
    
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = '';
    }, 5000);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 4. Smooth scroll para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 5. Animação de entrada suave dos elementos ao scroll (opcional mas bonito)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Elementos que queremos animar
document.querySelectorAll('.hero-content, .benefits-list li, .contact form').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Adicione isso no CSS também (se ainda não tiver):
/*
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
}
*/