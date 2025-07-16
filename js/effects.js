// Visual Effects and Animations for Yuki Koyama Portfolio
// GitHub Pages Compatible

// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(56, 189, 248, ${particle.opacity})`;
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Glitch Text Effect
class GlitchText {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.isGlitching = false;
    }

    glitch() {
        if (this.isGlitching) return;
        this.isGlitching = true;

        const iterations = 10;
        let counter = 0;

        const interval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((char, index) => {
                    if (index < counter) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');

            if (counter >= this.originalText.length) {
                clearInterval(interval);
                this.isGlitching = false;
            }

            counter += 1 / 3;
        }, 30);
    }
}

// Circuit Animation
class CircuitAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.init();
    }

    init() {
        // Create nodes
        for (let i = 0; i < 20; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                pulse: Math.random() * Math.PI * 2
            });
        }

        // Create connections
        this.nodes.forEach((node, i) => {
            const nearbyNodes = this.nodes.filter((otherNode, j) => {
                if (i === j) return false;
                const distance = Math.sqrt(
                    Math.pow(node.x - otherNode.x, 2) + 
                    Math.pow(node.y - otherNode.y, 2)
                );
                return distance < 150;
            });

            nearbyNodes.forEach(nearbyNode => {
                this.connections.push({
                    from: node,
                    to: nearbyNode,
                    signal: Math.random()
                });
            });
        });
    }

    update() {
        this.nodes.forEach(node => {
            node.pulse += 0.1;
        });

        this.connections.forEach(connection => {
            connection.signal += 0.02;
            if (connection.signal > 1) connection.signal = 0;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        this.connections.forEach(connection => {
            const gradient = this.ctx.createLinearGradient(
                connection.from.x, connection.from.y,
                connection.to.x, connection.to.y
            );
            
            const signalPos = connection.signal;
            gradient.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
            gradient.addColorStop(signalPos - 0.1, 'rgba(56, 189, 248, 0.1)');
            gradient.addColorStop(signalPos, 'rgba(56, 189, 248, 0.8)');
            gradient.addColorStop(signalPos + 0.1, 'rgba(56, 189, 248, 0.1)');
            gradient.addColorStop(1, 'rgba(56, 189, 248, 0.1)');

            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(connection.from.x, connection.from.y);
            this.ctx.lineTo(connection.to.x, connection.to.y);
            this.ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            const pulseIntensity = (Math.sin(node.pulse) + 1) / 2;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 4 + pulseIntensity * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(56, 189, 248, ${0.5 + pulseIntensity * 0.5})`;
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize glitch text effects
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        const glitchText = new GlitchText(element);
        
        // Trigger glitch effect periodically
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                glitchText.glitch();
            }
        }, 2000);
    });

    // Add hover effects to interactive buttons
    const buttons = document.querySelectorAll('.interactive-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.5)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Fullscreen functionality for Visual Effects Playground
let isFullscreen = false;

window.toggleFullscreen = function() {
    const container = document.getElementById('effectsContainer');
    const button = document.getElementById('fullscreenBtn');
    const canvas = document.getElementById('effectsCanvas');
    
    if (!container || !button || !canvas) return;
    
    isFullscreen = !isFullscreen;
    
    if (isFullscreen) {
        container.classList.add('fullscreen');
        button.innerHTML = '<i class="fas fa-compress mr-1"></i>終了';
        
        // Resize canvas for fullscreen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    } else {
        container.classList.remove('fullscreen');
        button.innerHTML = '<i class="fas fa-expand mr-1"></i>フルスクリーン';
        
        // Resize canvas back to normal
        setTimeout(() => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }, 300);
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleEscapeKey);
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
};

function handleEscapeKey(event) {
    if (event.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
    }
}

// Handle window resize for fullscreen mode
window.addEventListener('resize', function() {
    if (isFullscreen) {
        const canvas = document.getElementById('effectsCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
});

// Export for use in other modules
window.ParticleSystem = ParticleSystem;
window.GlitchText = GlitchText;
window.CircuitAnimation = CircuitAnimation;