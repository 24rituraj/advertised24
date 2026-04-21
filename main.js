// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Theme Toggle Logic
window.toggleTheme = () => {
    const body = document.body;
    const btn = document.getElementById('theme-toggle');
    const menuSpans = document.querySelectorAll('.menu-btn span');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        btn.innerText = '☀️';
        menuSpans.forEach(span => span.style.background = '#0f172a');
        gsap.to([".logo", ".nav-item"], { color: '#0f172a', duration: 0.4 });
    } else {
        btn.innerText = '🌙';
        menuSpans.forEach(span => span.style.background = 'white');
        gsap.to([".logo", ".nav-item"], { color: 'white', duration: 0.4 });
    }
};

// 1. Liquid Logo Animation
const liquidFilter = document.querySelector('#liquid feTurbulence');
if (liquidFilter) {
    gsap.to(liquidFilter, {
        duration: 8,
        attr: { baseFrequency: "0.015 0.04" },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Animate displacement scale for "splashing" effect
const liquidMap = document.querySelector('#liquid feDisplacementMap');
if (liquidMap) {
    gsap.to(liquidMap, {
        duration: 4,
        attr: { scale: 50 },
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

// 2. Scroll Animations
const sections = ['lime', 'berry', 'orange'];
const colors = {
    lime: '#ccff00',
    berry: '#9d00ff',
    orange: '#ff9100'
};

// Hero to Flavors Transition
gsap.to("#liquid-logo", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    },
    scale: 0.5,
    y: -100,
    opacity: 0.2,
    filter: "blur(20px)"
});

// Background Color Shift on Scroll
sections.forEach((section) => {
    gsap.to("body", {
        scrollTrigger: {
            trigger: `#flavor-${section}`,
            start: "top center",
            end: "bottom center",
            scrub: 2,
            onEnter: () => updateNavColor(colors[section]),
            onEnterBack: () => updateNavColor(colors[section])
        },
        backgroundColor: colors[section] + "22" // Add some transparency
    });

    // Animate text and can in each section
    gsap.from(`#flavor-${section} .text-area`, {
        scrollTrigger: {
            trigger: `#flavor-${section}`,
            start: "top 80%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(`#flavor-${section} .can`, {
        scrollTrigger: {
            trigger: `#flavor-${section}`,
            start: "top 80%",
        },
        y: 100,
        rotation: 15,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
    });
});

function updateNavColor(color) {
    gsap.to(".logo", { color: color, duration: 0.5 });
    gsap.to(".nav-item", { color: color, duration: 0.5 });
    gsap.to(".region-section h4", { color: color, duration: 0.5 });
}

// 3. Bubble System
function createBubbles() {
    const container = document.getElementById('hero-bubbles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 20 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = `-20px`;
        container.appendChild(bubble);

        gsap.to(bubble, {
            y: -window.innerHeight - 100,
            x: `+=${Math.random() * 100 - 50}`,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            delay: Math.random() * 5,
            ease: "none",
            opacity: 0
        });
    }
}
createBubbles();

// 4. Mouse Parallax for Cans
document.addEventListener('mousemove', (e) => {
    const cans = document.querySelectorAll('.can');
    const x = (e.clientX - window.innerWidth / 2) / 20;
    const y = (e.clientY - window.innerHeight / 2) / 20;

    cans.forEach(can => {
        gsap.to(can, {
            rotationY: x,
            rotationX: -y,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// 5. Logo Transformation on Scroll
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const logo = document.querySelector('.logo');
    if (!logo) return;
    if (scroll > 100) {
        logo.style.fontSize = '1.5rem';
        logo.style.letterSpacing = '5px';
    } else {
        logo.style.fontSize = '2rem';
        logo.style.letterSpacing = '-2px';
    }
});

// 6. Soft Drink Section Animations
gsap.from("#soft-drink .text-area", {
    scrollTrigger: {
        trigger: "#soft-drink",
        start: "top 80%",
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Animate Hazards appearing
gsap.to(".hazard", {
    scrollTrigger: {
        trigger: "#soft-drink",
        start: "top 60%",
    },
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)"
});

// Animate Background Circles
gsap.to(".bg-circle", {
    scrollTrigger: {
        trigger: "#soft-drink",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    scale: 1.2,
    opacity: 0.15,
    stagger: 0.1
});

// Continuous SVG Bubbles Animation
gsap.to(".svg-bubbles circle", {
    y: -20,
    opacity: 0,
    duration: "random(1, 2)",
    repeat: -1,
    delay: "random(0, 2)",
    ease: "power1.inOut",
    stagger: {
        each: 0.2,
        repeat: -1
    }
});

// Floating Can Effect for SVG
gsap.to("#health-svg", {
    y: -10,
    rotation: 1,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

console.log("DRIX Experience Loaded");
