// ==================== DARK MODE TOGGLE ==================== 
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.documentElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark-mode') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark-mode');
            document.documentElement.setAttribute('data-theme', 'dark-mode');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light-mode');
            document.documentElement.setAttribute('data-theme', 'light-mode');
        }
    });
}

// ==================== NAVIGATION ACTIVE LINK ====================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle smooth scrolling and active link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let currentSection = '#top';
        
        const sections = document.querySelectorAll('.meal-section, .categories, .hero');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = '#' + section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
});

// ==================== CAROUSEL FUNCTIONALITY ==================== 
let currentCarouselIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel');
const totalCarouselItems = carouselItems.length;
const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    if (carousel) {
        const translateValue = -currentCarouselIndex * 100;
        carousel.style.transform = `translateX(${translateValue}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentCarouselIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
}

function nextCarousel() {
    currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselItems;
    updateCarousel();
}

function prevCarousel() {
    currentCarouselIndex = (currentCarouselIndex - 1 + totalCarouselItems) % totalCarouselItems;
    updateCarousel();
}

// Carousel navigation buttons
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn) {
    nextBtn.addEventListener('click', nextCarousel);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevCarousel);
}

// Indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentCarouselIndex = index;
        updateCarousel();
    });
});

// Auto-slide carousel every 8 seconds
let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(nextCarousel, 8000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Start auto-slide on page load
if (carousel) {
    startAutoSlide();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
}

// ==================== MOBILE MENU TOGGLE ==================== 
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
}

// ==================== SUBSCRIBE FORM ==================== 
function handleSubscribe(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        // Show success message
        const originalText = event.target.querySelector('button').textContent;
        const button = event.target.querySelector('button');
        
        button.textContent = '✓ Subscribed!';
        button.style.background = '#10b981';
        
        // Reset after 3 seconds
        setTimeout(function() {
            event.target.reset();
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
        
        console.log('Subscribed with email:', email);
    }
}

// ==================== RECIPE CARD INTERACTIONS ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// ==================== SCROLL TO TOP ==================== 
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        // Could add scroll-to-top button here
    }
});

// ==================== PAGE LOAD ANIMATION ==================== 
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Animate recipe cards on load
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
