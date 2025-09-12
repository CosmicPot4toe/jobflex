document.addEventListener('DOMContentLoaded', function () {
    const companySwiper = new Swiper('.company-carousel', {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 25,
            },
        },
    });

    const testimonialsSwiper = new Swiper('.testimonials-carousel', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
    });

    // Dynamic Navbar on Scroll for index.html
    const mainNav = document.getElementById('main-nav');
    if (mainNav) { // Only run if this navbar exists (i.e., on index.html)
        const navLogo = document.getElementById('nav-logo');
        const navRegister = document.getElementById('nav-register');
        const navLogin = document.getElementById('nav-login');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Scroll threshold
                // Change navbar background to primary green
                mainNav.classList.remove('bg-white');
                mainNav.classList.add('bg-primary', 'shadow-lg');

                // Change logo text to white
                navLogo.classList.remove('text-primary');
                navLogo.classList.add('text-white');

                // Change "Registrate" link to white text
                navRegister.classList.remove('text-dark');
                navRegister.classList.add('text-white');

                // Change "Iniciar Sesión" button to white background, dark text
                navLogin.classList.remove('bg-primary', 'text-white');
                navLogin.classList.add('bg-white', 'text-dark');
            } else {
                // Revert to initial state
                mainNav.classList.add('bg-white');
                mainNav.classList.remove('bg-primary', 'shadow-lg');

                navLogo.classList.add('text-primary');
                navLogo.classList.remove('text-white');

                navRegister.classList.add('text-dark');
                navRegister.classList.remove('text-white');

                navLogin.classList.add('bg-primary', 'text-white');
                navLogin.classList.remove('bg-white', 'text-dark');
            }
        });
    }

    // Parallax effect for Hero Image on index.html
    const heroParallaxImg = document.getElementById('hero-parallax-img');
    const jobParallaxImg = document.getElementById('job-parallax-img'); // Get the new image

    if (heroParallaxImg || jobParallaxImg) { // Only run if at least one parallax image exists
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (heroParallaxImg) {
                heroParallaxImg.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
            if (jobParallaxImg) {
                jobParallaxImg.style.transform = `translateY(${-scrollPosition * 0.1}px)`; // Opposite direction, slower speed
            }
        });
    }

    // Form Micro-interactions (Login/Register pages)
    const formInputs = document.querySelectorAll('.w-full.p-3.border');
    formInputs.forEach(input => {
        const label = input.previousElementSibling; // Assumes label is sibling before input
        if (label && label.classList.contains('input-label')) {
            // Initial check for pre-filled fields
            if (input.value !== '') {
                label.classList.add('active');
            }

            input.addEventListener('focus', () => {
                label.classList.add('active');
            });

            input.addEventListener('blur', () => {
                if (input.value === '') {
                    label.classList.remove('active');
                }
            });
        }
    });

    // Show/Hide Password Toggle
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling; // Assumes input is sibling before toggle
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle eye icon (you'd need two SVG paths or change the SVG itself)
            // For simplicity, we'll just change color or add a class if you have different icons
            this.querySelector('svg').classList.toggle('text-primary'); // Example: change color
        });
    }

    // Button Loading Spinner and Disabled State
    const loginForm = document.querySelector('form'); // Assuming one form per page
    const submitButton = document.getElementById('login-button') || document.getElementById('register-button');
    const spinner = document.getElementById('login-spinner') || document.getElementById('register-spinner');

    if (loginForm && submitButton && spinner) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent actual form submission

            submitButton.disabled = true;
            spinner.classList.remove('hidden');
            submitButton.querySelector('span:not(.spinner)').classList.add('opacity-0'); // Hide text

            // Simulate API call
            setTimeout(() => {
                submitButton.disabled = false;
                spinner.classList.add('hidden');
                submitButton.querySelector('span:not(.spinner)').classList.remove('opacity-0'); // Show text
                alert('Formulario enviado (simulado)!');
            }, 2000);
        });
    }
});
