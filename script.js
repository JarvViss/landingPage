// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Theme Toggler
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Prevent multiple rapid clicks
        themeToggle.style.pointerEvents = 'none';
        
        // Animate icon transition
        themeIcon.style.animation = 'rotateOut 0.15s ease-in';
        
        setTimeout(() => {
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            themeIcon.style.animation = 'rotateIn 0.3s ease-out';
            
            // Re-enable clicks after animation
            setTimeout(() => {
                themeToggle.style.pointerEvents = 'auto';
            }, 300);
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            const theme = document.body.getAttribute('data-theme');
            if (theme === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(255, 0, 102, 0.2)';
            }
        } else {
            const theme = document.body.getAttribute('data-theme');
            if (theme === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('platform-card') || 
                    entry.target.classList.contains('industry-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation with staggered delays
    const animateElements = document.querySelectorAll('.feature-card, .platform-card, .industry-card, .testimonial-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.dataset.delay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Enhanced Counter animation for stats
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isTime = finalValue.includes('Hrs');
                const isPlus = finalValue.includes('+');
                const isCountries = finalValue === '6';
                
                let startValue = 0;
                const duration = 2000;
                const increment = isTime ? 1 : isCountries ? 1 : 1000;
                const finalNum = parseInt(finalValue.replace(/\D/g, ''));
                
                const timer = setInterval(() => {
                    startValue += increment;
                    if (startValue >= finalNum) {
                        target.textContent = finalValue;
                        clearInterval(timer);
                        // Add celebration effect
                        target.style.animation = 'celebration 0.6s ease-out';
                        setTimeout(() => {
                            target.style.animation = '';
                        }, 600);
                    } else {
                        if (isPlus) {
                            target.textContent = startValue.toLocaleString() + '+';
                        } else if (isTime) {
                            target.textContent = startValue + ' Hrs';
                        } else {
                            target.textContent = startValue.toLocaleString();
                        }
                    }
                }, duration / (finalNum / increment));
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // Parallax effect for hero elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Enhanced Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    });

    // Ripple effect function
    function createRipple(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Modal dialogs for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta .btn-primary, .cta .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(this.textContent);
        });
    });

    function showModal(action) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h3>${action}</h3>
                    <p>Thank you for your interest! Our team will contact you soon.</p>
                    <button class="modal-close">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add animation classes
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }

    // Enhanced Loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            const loadingElements = document.querySelectorAll('.hero-title, .hero-description, .hero-cta');
            loadingElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 500);
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Enhanced Particle effect
    createEnhancedParticles();
});

// Enhanced particle creation
function createEnhancedParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    const particleCount = 80;
    const colors = ['#ff0066', '#00ffff', '#ff6600', '#00ff66'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: ${opacity};
            box-shadow: 0 0 ${size * 2}px ${color};
            animation: enhancedFloat ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes celebration {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal.show {
        opacity: 1;
    }
    
    .modal-content {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 0, 102, 0.3);
        border-radius: 20px;
        padding: 3rem;
        text-align: center;
        max-width: 500px;
        width: 90%;
        transform: translateY(50px);
        transition: transform 0.3s ease;
    }
    
    .modal.show .modal-content {
        transform: translateY(0);
    }
    
    .modal-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #ff0066 0%, #00ffff 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 2rem;
        box-shadow: 0 10px 30px rgba(255, 0, 102, 0.3);
    }
    
    .modal-icon i {
        font-size: 2rem;
        color: white;
    }
    
    .modal-content h3 {
        color: white;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: 700;
    }
    
    .modal-content p {
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .modal-close {
        background: linear-gradient(135deg, #ff0066 0%, #ff3366 100%);
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 0, 102, 0.4);
    }
    
    @keyframes enhancedFloat {
        0% { 
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.1;
        }
        25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.3;
        }
        50% { 
            transform: translateY(-40px) translateX(20px) rotate(180deg);
            opacity: 0.5;
        }
        75% { 
            transform: translateY(-20px) translateX(10px) rotate(270deg);
            opacity: 0.3;
        }
        100% { 
            transform: translateY(0) translateX(0) rotate(360deg);
            opacity: 0.1;
        }
    }
    
    body.loaded .hero-title,
    body.loaded .hero-description,
    body.loaded .hero-cta {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    /* Red Revolving Element Interactions */
    .revolving-element {
        transition: all 0.3s ease;
    }
    
    .revolving-element:hover {
        transform: translateY(-50%) scale(1.1);
    }
    
    .revolving-element:hover .center-dot {
        animation: pulse 1s ease-in-out infinite;
    }
    
    .revolving-element:hover .orbit {
        animation-duration: 4s;
    }
    
    .revolving-element:hover .particle {
        animation-duration: 3s;
    }
    
    /* Responsive adjustments for revolving element */
    @media (max-width: 768px) {
        .revolving-element {
            top: 80px;
            right: 10px;
            width: 100px;
            height: 100px;
        }
        
        .orbit-1 {
            width: 40px;
            height: 40px;
            top: 30px;
            left: 30px;
        }
        
        .orbit-2 {
            width: 55px;
            height: 55px;
            top: 22.5px;
            left: 22.5px;
        }
        
        .orbit-3 {
            width: 70px;
            height: 70px;
            top: 15px;
            left: 15px;
        }
        
        .center-dot {
            width: 4px;
            height: 4px;
        }
        
        .particle {
            width: 2px;
            height: 2px;
        }
    }
    
    @media (max-width: 480px) {
        .revolving-element {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Interactive revolving element
document.addEventListener('DOMContentLoaded', function() {
    const revolvingElement = document.querySelector('.revolving-element');
    
    if (revolvingElement) {
        // Click effect only
        revolvingElement.addEventListener('click', () => {
            revolvingElement.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                revolvingElement.style.animation = '';
            }, 500);
        });
    }
}); 