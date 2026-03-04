/* ===================================================================
   FERIENHOF BRÜGGA – Main Scripts
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const nav = document.getElementById('main-nav');

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // --- Scroll-based nav styling ---
    let lastScroll = 0;
    const onScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-images, .about-content, .apartment-card, ' +
        '.experience-card, .gallery-item, .booking-info, .booking-form-wrap, ' +
        '.direct-booking-hint, .more-activities'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for sibling elements
                const siblings = entry.target.parentElement.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
                let delay = 0;
                siblings.forEach(sib => {
                    if (sib === entry.target) return;
                });

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el, i) => {
        // Assign animation classes based on element type
        if (el.classList.contains('about-images')) {
            el.classList.add('fade-in-left');
        } else if (el.classList.contains('about-content') || el.classList.contains('booking-info')) {
            el.classList.add('fade-in-right');
        } else {
            el.classList.add('fade-in');
        }

        // Stagger delay for grid items
        const parent = el.parentElement;
        const siblings = Array.from(parent.children).filter(c =>
            c.classList.contains('fade-in') ||
            c.classList.contains('fade-in-left') ||
            c.classList.contains('fade-in-right')
        );
        const sibIndex = siblings.indexOf(el);
        if (sibIndex > 0) {
            el.style.transitionDelay = `${sibIndex * 0.1}s`;
        }

        observer.observe(el);
    });

    // --- Apartment Sliders ---
    const sliders = document.querySelectorAll('.slider-container');

    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const slides = Array.from(track.children);
        const nextBtn = slider.querySelector('.slider-next');
        const prevBtn = slider.querySelector('.slider-prev');
        const dotContainer = slider.querySelector('.slider-dots');

        let currentIndex = 0;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotContainer.appendChild(dot);
        });

        const dots = dotContainer.querySelectorAll('.slider-dot');

        const updateDots = () => {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        };

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        }, { passive: true });

        const handleGesture = () => {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) {
                // Swipe left -> next
                currentIndex = (currentIndex + 1) % slides.length;
                goToSlide(currentIndex);
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right -> prev
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                goToSlide(currentIndex);
            }
        };
    });

    // --- Gallery Lightbox (simple) ---
    const galleryItems = document.querySelectorAll('.gallery-item');

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <img src="" alt="">
            <button class="lightbox-close" aria-label="Schließen">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Add lightbox styles dynamically
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .lightbox.active {
            opacity: 1;
            pointer-events: all;
        }
        .lightbox-overlay {
            position: absolute;
            inset: 0;
            background: rgba(26, 46, 43, 0.92);
            backdrop-filter: blur(8px);
        }
        .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            z-index: 1;
            transform: scale(0.95);
            transition: transform 0.3s ease;
        }
        .lightbox.active .lightbox-content {
            transform: scale(1);
        }
        .lightbox-content img {
            max-width: 90vw;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 24px 80px rgba(0,0,0,0.4);
        }
        .lightbox-close {
            position: absolute;
            top: -48px;
            right: 0;
            background: none;
            border: none;
            color: rgba(255,255,255,0.7);
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
        }
        .lightbox-close:hover {
            color: white;
        }
    `;
    document.head.appendChild(lightboxStyles);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // --- Form Handling ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());

            // Simple validation
            if (!data.name || !data.email || !data.checkin || !data.checkout) {
                showNotification('Bitte füllt alle Pflichtfelder aus.', 'error');
                return;
            }

            // Check dates
            const checkin = new Date(data.checkin);
            const checkout = new Date(data.checkout);
            if (checkout <= checkin) {
                showNotification('Das Abreisedatum muss nach dem Anreisedatum liegen.', 'error');
                return;
            }

            // Build mailto
            const subject = encodeURIComponent(`Buchungsanfrage – Ferienhof Brügga`);
            const body = encodeURIComponent(
                `Hallo Familie Meyer!\n\n` +
                `Ich möchte gerne eine unverbindliche Anfrage stellen:\n\n` +
                `Name: ${data.name}\n` +
                `E-Mail: ${data.email}\n` +
                `Anreise: ${data.checkin}\n` +
                `Abreise: ${data.checkout}\n` +
                `Gäste: ${data.guests}\n` +
                `Wohnung: ${data.apartment || 'Keine Präferenz'}\n` +
                `Nachricht: ${data.message || '—'}\n\n` +
                `Vielen Dank!`
            );

            window.location.href = `mailto:meyer.werner@aon.at?subject=${subject}&body=${body}`;
            showNotification('Eure Anfrage wird vorbereitet – euer E-Mail-Programm öffnet sich gleich!', 'success');
        });
    }

    // --- Notification System ---
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const notifStyles = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            padding: 1rem 2rem;
            border-radius: 8px;
            font-family: var(--ff-body);
            font-size: 0.9rem;
            z-index: 11000;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            max-width: 90vw;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        `;

        if (type === 'success') {
            notification.setAttribute('style', notifStyles + 'background: #2D423F; color: white;');
        } else if (type === 'error') {
            notification.setAttribute('style', notifStyles + 'background: #A4694A; color: white;');
        } else {
            notification.setAttribute('style', notifStyles + 'background: white; color: #2C2C2C; border: 1px solid #D6D2C4;');
        }

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }

    // --- Smooth anchor scroll offset for fixed nav ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || targetId === '#impressum' || targetId === '#datenschutz') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl && !targetEl.classList.contains('legal-modal')) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Legal Modal Scroll Lock ---
    const handleLegalHash = () => {
        const hash = window.location.hash;
        if (hash === '#impressum' || hash === '#datenschutz') {
            document.body.style.overflow = 'hidden';
        } else {
            // Only restore if not already locked by something else (like mobile menu)
            if (!navLinks.classList.contains('open')) {
                document.body.style.overflow = '';
            }
        }
    };
    window.addEventListener('hashchange', handleLegalHash);
    handleLegalHash(); // initial check

    // --- Parallax effect on hero image ---
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrollY * 0.2}px) scale(1.05)`;
            }
        }, { passive: true });
        heroImage.style.transform = 'scale(1.05)';
    }

    // --- Set minimum dates for booking form ---
    const checkinInput = document.getElementById('form-checkin');
    const checkoutInput = document.getElementById('form-checkout');

    if (checkinInput && checkoutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', today);

        checkinInput.addEventListener('change', () => {
            const checkinDate = new Date(checkinInput.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            checkoutInput.setAttribute('min', checkinDate.toISOString().split('T')[0]);

            if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
                checkoutInput.value = '';
            }
        });
    }

    // --- Back to Top ---
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
