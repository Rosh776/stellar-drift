import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// Game State
const gameState = {
    started: false,
    speed: 0,
    lap: 0,
    maxLaps: 3,
    checkpoints: []
};

// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// Post-processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 1.5;
bloomPass.radius = 0.5;
composer.addPass(bloomPass);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

const hemiLight = new THREE.HemisphereLight(0x00ffff, 0xff00ff, 0.6);
scene.add(hemiLight);

// Stars
const createStars = () => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true
    });

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
};

// Nebula Background
const createNebula = () => {
    const nebulaGeometry = new THREE.SphereGeometry(500, 32, 32);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('assets/textures/nebula.jpg'),
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.8
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);
};

// Player Ship
let playerShip;
const loadShip = () => {
    const loader = new GLTFLoader();
    loader.load('assets/models/ship.glb', (gltf) => {
        playerShip = gltf.scene;
        playerShip.position.set(0, 0, 0);
        playerShip.scale.set(0.5, 0.5, 0.5);
        scene.add(playerShip);
        
        // Set camera position relative to ship
        camera.position.set(0, 3, -10);
        camera.lookAt(playerShip.position);
    });
};

// Race Track
const createTrack = () => {
    const trackGeometry = new THREE.TorusGeometry(20, 5, 16, 100);
    const trackMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.7,
        roughness: 0.3
    });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = Math.PI / 2;
    scene.add(track);

    // Checkpoints
    const checkpointGeometry = new THREE.BoxGeometry(2, 5, 0.5);
    const checkpointMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.5
    });

    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const checkpoint = new THREE.Mesh(checkpointGeometry, checkpointMaterial);
        checkpoint.position.set(Math.cos(angle) * 20, 0, Math.sin(angle) * 20);
        checkpoint.rotation.y = -angle;
        scene.add(checkpoint);
        gameState.checkpoints.push(checkpoint);
    }
};

// Game Controls
const setupControls = () => {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        gameState.started = true;
        document.getElementById('start-screen').style.display = 'none';
    });

    window.addEventListener('keydown', (e) => {
        if (!gameState.started) return;
        
        if (e.key === 'ArrowUp') {
            gameState.speed = Math.min(gameState.speed + 0.1, 1);
        }
        if (e.key === 'ArrowDown') {
            gameState.speed = Math.max(gameState.speed - 0.1, 0);
        }
        if (e.key === 'ArrowLeft') {
            if (playerShip) playerShip.rotation.z = 0.2;
        }
        if (e.key === 'ArrowRight') {
            if (playerShip) playerShip.rotation.z = -0.2;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            if (playerShip) playerShip.rotation.z = 0;
        }
    });
};

// Game Loop
const animate = () => {
    requestAnimationFrame(animate);

    if (gameState.started && playerShip) {
        // Move ship along track
        playerShip.position.x += Math.sin(playerShip.rotation.y) * gameState.speed;
        playerShip.position.z += Math.cos(playerShip.rotation.y) * gameState.speed;
        
        // Rotate ship based on controls
        if (playerShip.rotation.z !== 0) {
            playerShip.rotation.y += playerShip.rotation.z * 0.05;
        }
        
        // Update camera position
        camera.position.x = playerShip.position.x + Math.sin(playerShip.rotation.y) * -10;
        camera.position.z = playerShip.position.z + Math.cos(playerShip.rotation.y) * -10;
        camera.position.y = playerShip.position.y + 3;
        camera.lookAt(playerShip.position);
        
        // Update UI
        document.getElementById('speedometer').textContent = `SPEED: ${Math.round(gameState.speed * 100)}`;
    }

    composer.render();
};

// Initialize Game
const init = () => {
    createStars();
    createNebula();
    loadShip();
    createTrack();
    setupControls();
    animate();
};

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Start Game
init();
