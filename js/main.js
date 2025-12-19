// ============================================
// Tu Aliado Digital - JavaScript
// Smooth interactions and scroll animations
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. Mobile Menu Toggle
    // ============================================
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navbarToggle && navbarMenu) {
        // Toggle menu on button click
        navbarToggle.addEventListener('click', function () {
            const isActive = navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
            navbarToggle.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = '';
                navbarToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navbarMenu.contains(event.target) &&
                !navbarToggle.contains(event.target) &&
                navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = '';
                navbarToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ============================================
    // 2. Smooth Scroll for Anchor Links
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                return;
            }

            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 3. Scroll Reveal Animation
    // ============================================
    const revealElements = document.querySelectorAll('.benefit-card, .service-card, .portfolio-item, .pricing-card-modern, .faq-item-modern');

    // Add scroll-reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing after reveal
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // 3. Enhanced Button Interactions
    // ============================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ============================================
    // 4. Analytics Tracking (Placeholder)
    // ============================================
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-white');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            console.log('CTA Click:', buttonText);
            // Add Google Analytics or similar tracking here
            // Example: gtag('event', 'cta_click', { 'button_text': buttonText });
        });
    });

    // ============================================
    // 5. Performance: Lazy Load Images
    // ============================================
    // Native loading="lazy" is now used in HTML.
    // Previous JS implementation was removing src if data-src wasn't present.

    // ============================================
    // 6. Contact Form Logic (Formspree Integration)
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            // Show Loading State
            button.disabled = true;
            button.textContent = 'Enviando...';

            // Let the form submit naturally to Formspree
            // No need to prevent default - let it work natively
        });
    }

    // ============================================
    // 7. Google Tag Manager Events
    // ============================================

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .btn-primary-large, .btn-primary-full').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const targetHref = this.getAttribute('href');
            // Only track internal anchors, not external links
            if (targetHref && targetHref.startsWith('#')) {
                window.dataLayer.push({
                    'event': 'cta_click',
                    'cta_text': this.textContent.trim(),
                    'cta_location': this.closest('section')?.id || 'unknown',
                    'cta_target': targetHref
                });
            }
        });
    });

    // Track form submission
    const contactFormGTM = document.getElementById('contactForm');
    if (contactFormGTM) {
        contactFormGTM.addEventListener('submit', function () {
            window.dataLayer.push({
                'event': 'form_submit',
                'form_name': 'contact_form',
                'form_type': document.getElementById('project-type')?.value || 'unknown'
            });
        });
    }

    // Track scroll depth
    let scrollTracked = { 25: false, 50: false, 75: false, 100: false };
    let scrollTimeout;

    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

            Object.keys(scrollTracked).forEach(threshold => {
                if (scrollPercent >= parseInt(threshold) && !scrollTracked[threshold]) {
                    scrollTracked[threshold] = true;
                    window.dataLayer.push({
                        'event': 'scroll_depth',
                        'scroll_percentage': threshold
                    });
                }
            });
        }, 100);
    });

    // Track portfolio project views
    document.querySelectorAll('.portfolio-item .btn, .portfolio-item a').forEach(link => {
        link.addEventListener('click', function () {
            const projectTitle = this.closest('.portfolio-item')?.querySelector('.portfolio-title')?.textContent.trim();
            if (projectTitle) {
                window.dataLayer.push({
                    'event': 'portfolio_click',
                    'project_name': projectTitle
                });
            }
        });
    });

    // ============================================
    // 8. Lazy Loading Mejorado
    // ============================================

    // Añadir clases de loading a imágenes del portfolio
    const portfolioImages = document.querySelectorAll('.portfolio-image img');

    portfolioImages.forEach(img => {
        // Solo aplicar lazy loading avanzado a imágenes que aún no han cargado
        if (!img.complete) {
            img.classList.add('img-lazy', 'loading');

            img.addEventListener('load', function () {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
        }
    });

    // IntersectionObserver para lazy loading con pre-carga
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Track image view in GTM
                const projectTitle = img.closest('.portfolio-item')?.querySelector('.portfolio-title')?.textContent.trim();
                if (projectTitle) {
                    window.dataLayer.push({
                        'event': 'portfolio_image_view',
                        'project_name': projectTitle
                    });
                }

                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px' // Empezar a rastrear 100px antes
    });

    portfolioImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================
    // 9. Console Art (Easter Egg)
    // ============================================
    console.log('%c👋 Hola, developer curioso!', 'font-size: 20px; font-weight: bold; color: #1E3A8A;');
    console.log('%c¿Te gusta lo que ves? Trabajemos juntos.', 'font-size: 14px; color: #6B7280;');
    console.log('%cContacto: info@tualiadodigital.tech', 'font-size: 12px; color: #10B981;');

});

// ============================================
// 7. Add Ripple Effect Styling Dynamically
// ============================================
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
