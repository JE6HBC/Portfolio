// Yuki Koyama Portfolio - Main JavaScript
// GitHub Pages Compatible

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeMatrixRain();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeCanvasObserver();
});

// Matrix Rain Effect
function initializeMatrixRain() {
    const container = document.getElementById('matrixRain');
    if (!container) return;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        column.innerHTML = text;
        container.appendChild(column);
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Canvas Observer for lazy initialization
function initializeCanvasObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'signalCanvas') {
                    window.initSignalCanvas();
                } else if (entry.target.id === 'circuitCanvas') {
                    window.initCircuitCanvas();
                } else if (entry.target.id === 'effectsCanvas') {
                    window.initEffectsCanvas();
                }
            }
        });
    });

    const canvases = ['signalCanvas', 'circuitCanvas', 'effectsCanvas'];
    canvases.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            observer.observe(canvas);
        }
    });
}