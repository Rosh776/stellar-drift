// Custom Cursor Effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 3D Background with Three.js
const canvas = document.getElementById('3d-background');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Add Stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

const starsVertices = [];
for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Text Animation
gsap.to(".hero-title", { 
    opacity: 1, 
    y: 0, 
    duration: 1, 
    ease: "power3.out" 
});

gsap.to(".hero-subtitle", { 
    opacity: 1, 
    y: 0, 
    duration: 1, 
    delay: 0.3, 
    ease: "power3.out" 
});

gsap.to(".cta-button", { 
    opacity: 1, 
    y: 0, 
    duration: 1, 
    delay: 0.6, 
    ease: "power3.out" 
});

// Card Animations
gsap.utils.toArray(".card").forEach((card, i) => {
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.2,
        scrollTrigger: {
            trigger: ".cards-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// Parallax Effect
gsap.to(".parallax-image", {
    y: "-30%",
    scrollTrigger: {
        trigger: ".parallax-section",
        scrub: true
    }
});
