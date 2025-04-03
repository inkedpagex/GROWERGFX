// Initialize glitch text effect
const glitchText = document.querySelectorAll('.glitch-text span');
glitchText.forEach(text => {
    // Set data-text attribute for pseudo-elements
    text.setAttribute('data-text', text.textContent);
    
    // Add random glitch intensity on hover
    text.addEventListener('mouseover', () => {
        text.style.setProperty('--glitch-intensity', Math.random() * 10 + 5 + 'px');
    });
    
    // Reset glitch intensity on mouseout
    text.addEventListener('mouseout', () => {
        text.style.setProperty('--glitch-intensity', '2px');
    });
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Hamburger Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('menu-open');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-active');
});

// Handle navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Close mobile menu
        menuToggle.classList.remove('menu-open');
        navLinks.classList.remove('active');
        body.classList.remove('menu-active');
        
        // Smooth scroll to target
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

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('menu-open');
        navLinks.classList.remove('active');
        body.classList.remove('menu-active');
    }
});

// Number Animation
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number, .achievement-number');
    
    numbers.forEach(number => {
        const finalValue = parseInt(number.textContent);
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 30); // Adjust speed
        const duration = 1500; // Total animation duration in ms
        const interval = duration / (finalValue / increment);
        
        number.classList.add('animate-number');
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                number.textContent = finalValue + (number.textContent.includes('%') ? '%' : '+');
                clearInterval(counter);
            } else {
                number.textContent = currentValue + (number.textContent.includes('%') ? '%' : '+');
            }
        }, interval);
    });
}

// Initialize number animation when elements are in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number, .achievement-number');
            if (numbers.length > 0) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.about-stats, .achievements').forEach(section => {
    observer.observe(section);
});

// Initialize Swiper for testimonials
const testimonialsSwiper = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Glowing button hover effect enhancement
document.querySelectorAll('.glow-button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2), 0 0 30px rgba(0, 255, 255, 0.1)';
    });
});

// Glitch effect enhancement
const glitchTextEnhance = document.querySelector('.logo span');
let glitchInterval;

function startGlitchEffect() {
    clearInterval(glitchInterval);
    glitchInterval = setInterval(() => {
        glitchTextEnhance.style.animation = 'none';
        void glitchTextEnhance.offsetWidth; // Trigger reflow
        glitchTextEnhance.style.animation = 'glitch 3s infinite';
    }, 3000);
}

glitchTextEnhance.addEventListener('mouseover', startGlitchEffect);
glitchTextEnhance.addEventListener('mouseout', () => {
    clearInterval(glitchInterval);
    glitchTextEnhance.style.animation = 'glitch 3s infinite';
});

// Sample portfolio items
const portfolioItems = [
    {
        title: "Gaming Channel Thumbnail",
        image: "thumbnails/gaming.jpg",
        category: "Gaming"
    },
    {
        title: "Tech Review Thumbnail",
        image: "thumbnails/tech.jpg",
        category: "Technology"
    },
    {
        title: "Finance Tutorial",
        image: "thumbnails/finance.jpg",
        category: "Education"
    },
    {
        title: "Lifestyle Vlog",
        image: "thumbnails/lifestyle.jpg",
        category: "Lifestyle"
    },
    {
        title: "Product Review",
        image: "thumbnails/product.jpg",
        category: "Review"
    },
    {
        title: "Tutorial Series",
        image: "thumbnails/tutorial.jpg",
        category: "Education"
    }
];

// Sample testimonials
const testimonials = [
    {
        name: "Alex Turner",
        channel: "TechReviews",
        text: "Incredible thumbnails that increased my CTR by 40%! Professional and quick service.",
        image: "testimonials/alex.jpg"
    },
    {
        name: "Sarah Williams",
        channel: "Gaming Hub",
        text: "The best thumbnail designer I've worked with. My views doubled after switching to these designs!",
        image: "testimonials/sarah.jpg"
    },
    {
        name: "Mike Chen",
        channel: "Finance Tips",
        text: "Outstanding quality and creativity. Really understands what works for YouTube.",
        image: "testimonials/mike.jpg"
    }
];

// Function to create portfolio grid with animation
function createPortfolioGrid() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-aos', 'fade-up');
        portfolioItem.setAttribute('data-aos-delay', (index * 100).toString());
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <span>${item.category}</span>
            </div>
        `;
        
        // Add click event for lightbox preview
        portfolioItem.addEventListener('click', () => {
            openLightbox(item);
        });
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Function to create testimonials slider
function createTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    
    testimonials.forEach((testimonial, index) => {
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        slide.setAttribute('data-aos', 'fade-left');
        slide.setAttribute('data-aos-delay', (index * 100).toString());
        
        slide.innerHTML = `
            <div class="testimonial-content">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
                <div class="testimonial-text">
                    <p>"${testimonial.text}"</p>
                    <h4>${testimonial.name}</h4>
                    <span>${testimonial.channel}</span>
                </div>
            </div>
        `;
        
        slider.appendChild(slide);
    });
    
    initializeTestimonialSlider();
}

// Function to initialize testimonial slider
function initializeTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
            slide.style.opacity = i === index ? '1' : '0';
        });
    }
    
    // Show first slide
    showSlide(0);
    
    // Auto-advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Lightbox functionality
function openLightbox(item) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${item.image}" alt="${item.title}">
            <div class="lightbox-info">
                <h3>${item.title}</h3>
                <span>${item.category}</span>
            </div>
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Add close functionality
    lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) {
            lightbox.remove();
        }
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createPortfolioGrid();
    createTestimonialsSlider();
});

document.addEventListener("DOMContentLoaded", function() {
    // Get all portfolio items
    var portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach(function(item) {
        item.addEventListener("click", function() {
            // Remove the enlarged class from all items
            portfolioItems.forEach(function(i) {
                i.classList.remove("enlarged");
            });
            // Add the enlarged class to the clicked item
            this.classList.add("enlarged");
        });
    });
});