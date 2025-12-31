/**
 * New Year 2026 Greeting Website
 * Optimized animations with performance focus
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get URL parameter value by name
 */
function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/**
 * Capitalize first letter of a string
 */
function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Check if device is low-end (reduced animations)
 */
function isLowEndDevice() {
    return window.innerWidth < 768 && window.innerHeight < 600;
}

// ============================================
// PERSONALIZATION
// ============================================

/**
 * Initialize personalized content based on URL parameters
 */
function initializePersonalization() {
    const friendName = getURLParameter('name');
    const friendNameElement = document.getElementById('friendName');
    
    if (friendName && friendName.trim()) {
        const capitalizedName = capitalizeFirst(friendName.trim());
        friendNameElement.textContent = capitalizedName;
        document.title = `Happy New Year 2026 ${capitalizedName}`;
    } else {
        friendNameElement.textContent = 'Friend';
        document.title = 'Happy New Year 2026';
    }
}

// ============================================
// STARS ANIMATION (Subtle, Lightweight)
// ============================================

/**
 * Create subtle animated starfield background
 */
function initStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const stars = [];
    const starCount = isLowEndDevice() ? 50 : 100; // Limit particles for performance
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.01 + 0.005
        });
    }
    
    // Animate stars (slow, subtle)
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Slow twinkling effect
            star.twinkle += star.twinkleSpeed;
            star.opacity = 0.3 + Math.sin(star.twinkle) * 0.3;
            
            // Draw star (low opacity)
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
}

// ============================================
// FLOATING PARTICLES (Subtle)
// ============================================

/**
 * Create subtle floating particles
 */
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = isLowEndDevice() ? 20 : 40; // Limit for performance
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const colors = [
        'rgba(255, 0, 110, 0.3)',   // neon pink - low opacity
        'rgba(0, 245, 255, 0.3)',   // neon cyan - low opacity
        'rgba(131, 56, 236, 0.3)',  // neon purple - low opacity
        'rgba(255, 190, 11, 0.3)'   // neon orange - low opacity
    ];
    
    /**
     * Particle class for floating particles
     */
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.4 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// FIREWORKS ANIMATION (Slow, Random, Low Opacity)
// ============================================

/**
 * Optimized slow fireworks with low opacity
 */
function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    // Disable on low-end devices
    if (isLowEndDevice()) {
        canvas.style.display = 'none';
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const fireworks = [];
    const particles = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Color palette (low opacity colors)
    const colors = [
        'rgba(255, 0, 110, 0.4)',   // neon pink - low opacity
        'rgba(0, 245, 255, 0.4)',   // neon cyan - low opacity
        'rgba(131, 56, 236, 0.4)',  // neon purple - low opacity
        'rgba(255, 190, 11, 0.4)'   // neon orange - low opacity
    ];
    
    /**
     * Particle class for fireworks
     */
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 6,
                y: (Math.random() - 0.5) * 6
            };
            this.gravity = 0.08;
            this.friction = 0.98;
            this.life = 1;
            this.decay = Math.random() * 0.015 + 0.01; // Slower decay
            this.size = Math.random() * 2.5 + 1.5;
        }
        
        update() {
            this.velocity.y += this.gravity;
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.life -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.life * 0.6; // Low opacity
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    /**
     * Firework class
     */
    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.4 + canvas.height * 0.2;
            this.velocity = {
                x: (Math.random() - 0.5) * 1.5,
                y: -Math.random() * 2 - 1.5 // Slower
            };
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.exploded = false;
        }
        
        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            if (this.y <= this.targetY && !this.exploded) {
                this.explode();
            }
        }
        
        explode() {
            this.exploded = true;
            const particleCount = 30; // Reduced particle count
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
        
        draw() {
            if (!this.exploded) {
                ctx.save();
                ctx.globalAlpha = 0.7;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
    }
    
    // Create fireworks randomly (slow, random intervals)
    function createFirework() {
        fireworks.push(new Firework());
        // Random interval between 4-8 seconds
        const nextInterval = Math.random() * 4000 + 4000;
        setTimeout(createFirework, nextInterval);
    }
    
    // Animation loop
    function animate() {
        // Clear with low opacity for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            
            if (fireworks[i].exploded) {
                fireworks.splice(i, 1);
            }
        }
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start fireworks after delay
    setTimeout(() => {
        createFirework();
    }, 2000);
    
    animate();
}

// ============================================
// ROCKETS AND CRACKERS ANIMATION
// ============================================

/**
 * Rockets launching and cracker blasts
 */
function initRocketsAndCrackers() {
    const canvas = document.getElementById('rocketsCanvas');
    if (!canvas) return;
    
    // Disable on low-end devices
    if (isLowEndDevice()) {
        canvas.style.display = 'none';
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const rockets = [];
    const explosions = [];
    const crackerBlasts = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Color palette (low opacity for background effect)
    const colors = [
        'rgba(255, 0, 110, 0.5)',   // neon pink
        'rgba(0, 245, 255, 0.5)',   // neon cyan
        'rgba(131, 56, 236, 0.5)',  // neon purple
        'rgba(255, 190, 11, 0.5)'   // neon orange
    ];
    
    /**
     * Explosion particle class
     */
    class ExplosionParticle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.gravity = 0.1;
            this.friction = 0.97;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            this.size = Math.random() * 3 + 2;
        }
        
        update() {
            this.velocity.y += this.gravity;
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.life -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.life * 0.7;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            // Add glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    /**
     * Rocket class - launches from bottom, goes up, then explodes
     */
    class Rocket {
        constructor() {
            this.startX = Math.random() * canvas.width;
            this.x = this.startX;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.3 + canvas.height * 0.15;
            this.velocity = {
                x: (Math.random() - 0.5) * 0.5,
                y: -Math.random() * 3 - 2.5
            };
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.exploded = false;
            this.trail = [];
        }
        
        update() {
            if (!this.exploded) {
                // Add trail point
                this.trail.push({ x: this.x, y: this.y, life: 1 });
                if (this.trail.length > 5) {
                    this.trail.shift();
                }
                
                // Update position
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                
                // Fade trail
                this.trail.forEach(point => {
                    point.life -= 0.2;
                });
                
                // Check if reached target height
                if (this.y <= this.targetY) {
                    this.explode();
                }
            }
        }
        
        explode() {
            this.exploded = true;
            const particleCount = 25;
            
            for (let i = 0; i < particleCount; i++) {
                explosions.push(new ExplosionParticle(this.x, this.y, this.color));
            }
        }
        
        draw() {
            if (!this.exploded) {
                // Draw trail
                this.trail.forEach((point, index) => {
                    if (point.life > 0) {
                        ctx.save();
                        ctx.globalAlpha = point.life * 0.6;
                        ctx.strokeStyle = this.color;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        if (index > 0) {
                            ctx.moveTo(this.trail[index - 1].x, this.trail[index - 1].y);
                            ctx.lineTo(point.x, point.y);
                        }
                        ctx.stroke();
                        ctx.restore();
                    }
                });
                
                // Draw rocket body
                ctx.save();
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.restore();
            }
        }
    }
    
    /**
     * Cracker blast class - quick burst from bottom
     */
    class CrackerBlast {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height - 20;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.particles = [];
            this.life = 1;
            this.decay = 0.03;
            
            // Create burst particles
            const particleCount = 20;
            for (let i = 0; i < particleCount; i++) {
                this.particles.push({
                    x: this.x,
                    y: this.y,
                    velocity: {
                        x: (Math.random() - 0.5) * 6,
                        y: -Math.random() * 8 - 2
                    },
                    size: Math.random() * 2 + 1,
                    life: 1,
                    decay: Math.random() * 0.03 + 0.02
                });
            }
        }
        
        update() {
            this.life -= this.decay;
            
            this.particles.forEach(particle => {
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.velocity.y += 0.15; // gravity
                particle.life -= particle.decay;
            });
            
            // Remove dead particles
            this.particles = this.particles.filter(p => p.life > 0);
        }
        
        draw() {
            ctx.save();
            this.particles.forEach(particle => {
                if (particle.life > 0) {
                    ctx.globalAlpha = particle.life * 0.6;
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = this.color;
                    ctx.fill();
                }
            });
            ctx.restore();
        }
        
        isDead() {
            return this.life <= 0 || this.particles.length === 0;
        }
    }
    
    // Create rocket randomly (10x density - much faster)
    function createRocket() {
        rockets.push(new Rocket());
        // Random interval between 0.3-0.6 seconds (10x faster than before)
        const nextInterval = Math.random() * 300 + 300;
        setTimeout(createRocket, nextInterval);
    }
    
    // Create cracker blast randomly (10x density - much faster)
    function createCrackerBlast() {
        crackerBlasts.push(new CrackerBlast());
        // Random interval between 0.2-0.4 seconds (10x faster than before)
        const nextInterval = Math.random() * 200 + 200;
        setTimeout(createCrackerBlast, nextInterval);
    }
    
    // Animation loop
    function animate() {
        // Clear with fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw rockets
        for (let i = rockets.length - 1; i >= 0; i--) {
            rockets[i].update();
            rockets[i].draw();
            
            if (rockets[i].exploded) {
                rockets.splice(i, 1);
            }
        }
        
        // Update and draw explosions
        for (let i = explosions.length - 1; i >= 0; i--) {
            explosions[i].update();
            explosions[i].draw();
            
            if (explosions[i].life <= 0) {
                explosions.splice(i, 1);
            }
        }
        
        // Update and draw cracker blasts
        for (let i = crackerBlasts.length - 1; i >= 0; i--) {
            crackerBlasts[i].update();
            crackerBlasts[i].draw();
            
            if (crackerBlasts[i].isDead()) {
                crackerBlasts.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animations after delay
    setTimeout(() => {
        createRocket();
        createCrackerBlast();
    }, 1500);
    
    animate();
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all features when DOM is ready
 */
function init() {
    // Initialize personalization first
    initializePersonalization();
    
    // Initialize animations (optimized)
    initStars();
    initParticles();
    initFireworks();
    initRocketsAndCrackers();
    
    // Add loaded class to body
    document.body.classList.add('loaded');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
