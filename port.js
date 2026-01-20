// ============================================
// AASHUTOSH PATIL - PORTFOLIO JAVASCRIPT
// ============================================

// Data
const skills = [
    { name: 'HTML', level: 90, icon: '🌐' },
    { name: 'CSS', level: 85, icon: '🎨' },
    { name: 'JavaScript', level: 80, icon: '⚡' },
    { name: 'C Programming', level: 85, icon: '💻' },
    { name: 'C++ Programming', level: 80, icon: '🔧' },
    { name: 'Python', level: 75, icon: '🐍' },
    { name: 'DBMS', level: 70, icon: '🗄️' },
    { name: 'DSA', level: 75, icon: '📊' },
    { name: 'AWS', level: 65, icon: '☁️' }
];

const projects = [
    {
        title: 'Tic Tac Toe Game',
        description: 'A classic Tic Tac Toe game built with HTML, CSS, and JavaScript. Features include player vs player mode, win detection, and responsive design.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        liveLink: 'https://phenomenal-torte-8f3508.netlify.app/', // Add your Netlify link
        githubLink: 'https://github.com/Aashutoshpatil/TIC-TAC-TOE.git' // Add your GitHub link
    },
    {
        title: 'Rock Paper Scissors',
        description: 'An interactive Rock Paper Scissors game with smooth animations and score tracking. Play against the computer with a modern UI.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        liveLink: '', // Add your Netlify link
        githubLink: 'https://github.com/Aashutoshpatil/-Rock-Paper-Scissors-Game' // Add your GitHub link
    },
    {
        title: 'Amazon Clone',
        description: 'A front-end clone of Amazon featuring product listings, navigation, and responsive design. Showcases modern CSS layouts and JavaScript functionality.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        liveLink: '#', // Add your Netlify link
        githubLink: '#' // Add your GitHub link
    },
    {
        title: 'Currency Converter',
        description: 'A real-time currency converter application that fetches live exchange rates and allows conversion between multiple currencies.',
        tech: ['HTML', 'CSS', 'JavaScript', 'API'],
        liveLink: 'https://currencyconverter4545.netlify.app/', // Add your Netlify link
        githubLink: 'https://github.com/Aashutoshpatil/Currency-Converter' // Add your GitHub link
    }
];

const roles = ['Web Developer', 'Programmer', 'Problem Solver', 'Tech Enthusiast'];

// ============================================
// TYPING EFFECT
// ============================================
class TypingEffect {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, pauseDuration = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseDuration = pauseDuration;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
            delay = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            delay = 500;
        }

        setTimeout(() => this.type(), delay);
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// SKILLS SECTION
// ============================================
function initSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    
    skills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.style.transitionDelay = `${index * 0.1}s`;
        
        skillCard.innerHTML = `
            <div class="skill-header">
                <div class="skill-info">
                    <span class="skill-icon">${skill.icon}</span>
                    <span class="skill-name">${skill.name}</span>
                </div>
                <span class="skill-percentage">0%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-fill" data-level="${skill.level}"></div>
            </div>
        `;
        
        skillsGrid.appendChild(skillCard);
    });

    // Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsGrid);
}

function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
            
            const fill = card.querySelector('.skill-fill');
            const percentage = card.querySelector('.skill-percentage');
            const level = parseInt(fill.dataset.level);
            
            // Animate the bar
            setTimeout(() => {
                fill.style.width = `${level}%`;
            }, 100);
            
            // Animate the percentage
            animateValue(percentage, 0, level, 1000);
        }, index * 100);
    });
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOut);
        
        element.textContent = `${current}%`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// PROJECTS SECTION
// ============================================
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-header">
                <svg class="project-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
                </svg>
                <div class="project-links">
                    <a href="${project.githubLink}" target="_blank" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </a>
                    <a href="${project.liveLink}" target="_blank" aria-label="Live Demo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                    </a>
                </div>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        new TypingEffect(typingElement, roles);
    }

    // Initialize components
    initNavbar();
    initSkills();
    initProjects();
    initSmoothScroll();

    console.log('Portfolio loaded successfully! 🚀');
});