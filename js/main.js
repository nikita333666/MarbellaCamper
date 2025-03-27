// Mobile menu functionality
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const body = document.body;
let isMobile = window.innerWidth <= 991;

function handleMobileMenu() {
    const isNowMobile = window.innerWidth <= 991;
    
    // Only update if the state has changed
    if (isMobile !== isNowMobile) {
        isMobile = isNowMobile;
        
        // Reset menu state when switching between mobile and desktop
        if (!isNowMobile) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }
}

// Initialize and handle resize
handleMobileMenu();
window.addEventListener('resize', handleMobileMenu);

// Handle mobile menu toggle
navbarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile) {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMobile && !navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMobile) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Navbar scroll effect with debounce
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let scrollTimeout;

function handleScroll() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background change
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Smooth scroll for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Google Maps initialization
function initMap() {
    const marbellaLocation = { lat: 36.50520100591127, lng: -4.765758971164947 };
    const mapOptions = {
        zoom: 17,
        center: marbellaLocation,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [
                    { saturation: -20 }
                ]
            }
        ]
    };
    
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    const marker = new google.maps.Marker({
        position: marbellaLocation,
        map: map,
        title: 'Marbella Camper',
        animation: google.maps.Animation.DROP,
        icon: {
            url: 'images/logo/logo.png',
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    // Create info window content based on page language
    const isSpanish = document.documentElement.lang === 'es';
    const infoContent = isSpanish ? 
        '<div style="padding: 15px; max-width: 300px;">' +
            '<h3 style="margin-bottom: 10px; color: #FFB800;">Marbella Camper</h3>' +
            '<p style="margin-bottom: 8px;"><strong>Dirección:</strong><br>C. Liria, 14, 29604 Marbella, Málaga, España</p>' +
            '<p style="margin-bottom: 8px;"><strong>Teléfono:</strong><br><a href="tel:+34642727021" style="color: #333;">+34 642 727 021</a></p>' +
            '<p style="margin-bottom: 8px;"><strong>Horario:</strong><br>Lunes - Domingo: 9:00 - 20:00</p>' +
            '<p style="margin-bottom: 8px;"><strong>Email:</strong><br><a href="mailto:marbellacamper@gmail.com" style="color: #333;">marbellacamper@gmail.com</a></p>' +
            '<p><a href="https://maps.app.goo.gl/SRHE9VQncz8eWTNa8" target="_blank" style="color: #FFB800; text-decoration: underline;">Ver en Google Maps</a></p>' +
        '</div>' :
        '<div style="padding: 15px; max-width: 300px;">' +
            '<h3 style="margin-bottom: 10px; color: #FFB800;">Marbella Camper</h3>' +
            '<p style="margin-bottom: 8px;"><strong>Address:</strong><br>C. Liria, 14, 29604 Marbella, Málaga, Spain</p>' +
            '<p style="margin-bottom: 8px;"><strong>Phone:</strong><br><a href="tel:+34642727021" style="color: #333;">+34 642 727 021</a></p>' +
            '<p style="margin-bottom: 8px;"><strong>Hours:</strong><br>Monday - Sunday: 9:00 AM - 8:00 PM</p>' +
            '<p style="margin-bottom: 8px;"><strong>Email:</strong><br><a href="mailto:marbellacamper@gmail.com" style="color: #333;">marbellacamper@gmail.com</a></p>' +
            '<p><a href="https://maps.app.goo.gl/SRHE9VQncz8eWTNa8" target="_blank" style="color: #FFB800; text-decoration: underline;">View on Google Maps</a></p>' +
        '</div>';

    const infoWindow = new google.maps.InfoWindow({
        content: infoContent,
        maxWidth: 350
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });

    // Открываем информационное окно при загрузке карты
    infoWindow.open(map, marker);
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic form validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }

                // Additional validation for email
                if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }

                // Additional validation for phone
                if (field.type === 'tel' && field.value.trim()) {
                    const phonePattern = /^\+?[\d\s-()]{10,}$/;
                    if (!phonePattern.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
            });

            if (!isValid) {
                const message = document.documentElement.lang === 'es' ?
                    'Por favor, complete todos los campos correctamente.' :
                    'Please fill in all fields correctly.';
                alert(message);
                return;
            }

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };

            try {
                // Submit form to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const message = document.documentElement.lang === 'es' ?
                        '¡Gracias por su mensaje! Nos pondremos en contacto pronto.' :
                        'Thank you for your message! We will get back to you soon.';
                    alert(message);
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                const message = document.documentElement.lang === 'es' ?
                    'Lo sentimos, hubo un error. Por favor, inténtelo de nuevo.' :
                    'Sorry, there was an error. Please try again.';
                alert(message);
                console.error('Form submission error:', error);
            }
        });
    }
});

// Date picker validation
document.addEventListener('DOMContentLoaded', () => {
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');

    if (pickupDate && returnDate) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        pickupDate.min = today;
        returnDate.min = today;

        // Update return date minimum when pickup date changes
        pickupDate.addEventListener('change', () => {
            returnDate.min = pickupDate.value;
            if (returnDate.value && returnDate.value < pickupDate.value) {
                returnDate.value = pickupDate.value;
            }
        });
    }
});

// Language switching functionality
function changeLanguage(lang) {
    // Update active state of language buttons
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Hide all language elements
    document.querySelectorAll('[class*="lang-"]').forEach(el => {
        el.style.display = 'none';
    });

    // Show elements for selected language
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.style.display = '';
    });

    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize language based on stored preference or default to English
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(storedLang);
});

// Initialize all sliders
document.addEventListener('DOMContentLoaded', () => {
    // Motorhome sliders
    const motorhomeSliders = document.querySelectorAll('.motorhome-slider');
    motorhomeSliders.forEach(slider => {
        new Swiper(slider, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    });

    // Testimonial slider
    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Suspension slider
    const suspensionSwiper = new Swiper('.suspension-swiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

// Gallery Slider
const gallerySwiper = new Swiper('.gallery-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2.2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 30,
        }
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-box, .motorhome-card, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Price toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const priceButtons = document.querySelectorAll('.view-prices');
    
    priceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Находим ближайший price-info внутри той же карточки
            const priceInfo = button.closest('.motorhome-footer').querySelector('.price-info');
            
            // Если информация о ценах скрыта, показываем её
            if (priceInfo.style.display === 'none') {
                // Сначала скрываем все открытые price-info
                document.querySelectorAll('.price-info').forEach(info => {
                    info.style.display = 'none';
                });
                
                // Затем показываем текущий price-info
                priceInfo.style.display = 'block';
                button.textContent = 'Hide Prices';
            } else {
                // Если информация о ценах показана, скрываем её
                priceInfo.style.display = 'none';
                button.textContent = 'View Prices';
            }
        });
    });
});

// Contact form handling
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formStatus = document.getElementById('formStatus');
    const formData = new FormData(form);

    // Basic validation
    let isValid = true;
    form.querySelectorAll('input, textarea').forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
        }
    });

    if (!isValid) {
        formStatus.textContent = document.documentElement.lang === 'es' 
            ? 'Por favor, rellene todos los campos.'
            : 'Please fill in all fields.';
        formStatus.className = 'form-status error';
        return false;
    }

    // Prepare data for sending
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Here you would typically send the data to your server
    // For now, we'll just simulate a successful submission
    formStatus.textContent = document.documentElement.lang === 'es'
        ? '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'
        : 'Message sent successfully! We will contact you soon.';
    formStatus.className = 'form-status success';
    form.reset();

    return false;
}

// Add floating labels behavior
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.querySelector('label').classList.add('active');
    });

    field.addEventListener('blur', () => {
        if (!field.value) {
            field.parentElement.querySelector('label').classList.remove('active');
        }
    });
});

// Video Play Button
document.querySelector('.play-button')?.addEventListener('click', function() {
    // Здесь можно добавить код для открытия модального окна с видео
    // или перенаправления на страницу с видео
    console.log('Video play button clicked');
});

// Air Suspension Details Toggle
const showDetailsBtn = document.querySelector('.show-details');
const suspensionDetails = document.querySelector('.suspension-details');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (showDetailsBtn) {
    const textShow = showDetailsBtn.dataset.textShow || 'View Details';
    const textHide = showDetailsBtn.dataset.textHide || 'Hide Details';

    showDetailsBtn.addEventListener('click', () => {
        suspensionDetails.style.display = suspensionDetails.style.display === 'none' ? 'block' : 'none';
        showDetailsBtn.textContent = suspensionDetails.style.display === 'none' ? textShow : textHide;
    });
}


tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Плавно скрываем текущий активный контент
        const activeContent = document.querySelector('.tab-content.active');
        if (activeContent) {
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translateY(10px)';
        }

        // Убираем активный класс у всех кнопок и контента
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Добавляем активный класс кнопке и соответствующему контенту
        btn.classList.add('active');
        const newContent = document.getElementById(btn.dataset.tab);
        newContent.classList.add('active');

        // Анимируем появление нового контента
        setTimeout(() => {
            newContent.style.opacity = '1';
            newContent.style.transform = 'translateY(0)';
        }, 50);

        // Анимация подчеркивания
        const underline = btn.querySelector('.tab-underline');
        if (!underline) {
            const line = document.createElement('div');
            line.className = 'tab-underline';
            btn.appendChild(line);
        }
    });

    // Эффект при наведении
    btn.addEventListener('mouseenter', () => {
        if (!btn.classList.contains('active')) {
            btn.style.color = 'var(--primary-color)';
        }
    });

    btn.addEventListener('mouseleave', () => {
        if (!btn.classList.contains('active')) {
            btn.style.color = 'var(--text-light)';
        }
    });
});

// Устанавливаем начальную позицию скролла при первой загрузке (только для ПК)
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем ширину экрана (только для ПК > 991px)
    if (window.innerWidth > 991) {
        // Проверяем, было ли уже посещение
        if (!sessionStorage.getItem('visited')) {
            // Задержка для гарантии загрузки изображения
            setTimeout(() => {
                // Прокручиваем на 40% высоты окна
                window.scrollTo({
                    top: window.innerHeight * 0.2,
                    behavior: 'instant' // Мгновенная прокрутка без анимации
                });
                // Отмечаем, что страница была посещена
                sessionStorage.setItem('visited', 'true');
            }, 100);
        }
    }
});
