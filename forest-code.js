const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.2);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
resizeRendererToDisplaySize();
document.body.appendChild(renderer.domElement);

const player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0 })
);
player.position.y = 0.5;
scene.add(player);

const flashlight = new THREE.SpotLight(0xffffff, 1);
flashlight.position.set(0, 1, 0);
flashlight.target.position.set(0, 0, -1);
flashlight.angle = Math.PI / 6;
flashlight.penumbra = 0.5;
flashlight.castShadow = true;
flashlight.shadow.mapSize.set(1024, 1024);
flashlight.shadow.camera.near = 0.1;
flashlight.shadow.camera.far = 25;
scene.add(flashlight);
scene.add(flashlight.target);

function resizeRendererToDisplaySize() {
    const canvas = renderer.domElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', resizeRendererToDisplaySize);

const environment = new THREE.Mesh(
    new THREE.BoxGeometry(100, 0.1, 100),
    new THREE.MeshBasicMaterial({ color: 0x555555 })
);
const textureLoader = new THREE.TextureLoader();
environment.material.map = textureLoader.load('https://t4.ftcdn.net/jpg/00/74/04/43/360_F_74044371_fHXDQ9UrOTRkZffoef1QXtuYX7suMNXr.jpg');
scene.add(environment);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const trunkTexture = textureLoader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONIy6utWh10QE0OhE33D7kslxNFYERhDTmdiumwgAnQ&s');
const foliageTexture = textureLoader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSmLw5r1AtO8xhvHTQwR4BpcCdHIYcDOkXpBMpiQJrog&s');

const numRandomTrees = 420;
const minRandomTreeX = -40;
const maxRandomTreeX = 40;
const minRandomTreeZ = -40;
const maxRandomTreeZ = 40;

for (let i = 0; i < numRandomTrees; i++) {
    const x = randomInRange(minRandomTreeX, maxRandomTreeX);
    const z = randomInRange(minRandomTreeZ, maxRandomTreeZ);
    createTree(x, z);
}

const wallTreeSpacing = 1;

for (let i = -50; i <= 50; i += wallTreeSpacing) {
    createTree(-50, i);
    createTree(50, i);
    createTree(i, -50);
    createTree(i, 50);
}

function createTree(x, z) {
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.2, 2, 8),
        new THREE.MeshBasicMaterial({ map: trunkTexture })
    );
    const foliage1 = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 8),
        new THREE.MeshBasicMaterial({ map: foliageTexture })
    );
    const foliage2 = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 8),
        new THREE.MeshBasicMaterial({ map: foliageTexture })
    );

    trunk.position.set(x, 1, z);
    foliage1.position.set(x, 2, z);
    foliage2.position.set(x, 3, z);

    foliage1.position.x += Math.random() * 0.2 - 0.1;
    foliage1.position.z += Math.random() * 0.2 - 0.1;
    foliage2.position.x += Math.random() * 0.2 - 0.1;
    foliage2.position.z += Math.random() * 0.2 - 0.1;

    scene.add(trunk, foliage1, foliage2);
}

function detectCollisions() {
    const playerPos = player.position;
    const minX = -50 + 0.5;
    const maxX = 50 - 0.5;
    const minZ = -50 + 0.5;
    const maxZ = 50 - 0.5;

    if (playerPos.x < minX || playerPos.x > maxX || playerPos.z < minZ || playerPos.z > maxZ) {
        player.position.copy(player.prevPosition);
    }
}

const house = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    new THREE.MeshBasicMaterial({ color: 0x8B4513 })
);
const roof = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 2.8, 2, 4),
    new THREE.MeshBasicMaterial({ color: 0xA52A2A })
);

house.position.set(randomInRange(-30, 30), 2, randomInRange(-30, 30));
roof.position.set(house.position.x, house.position.y + 2.5, house.position.z);
roof.rotation.y = Math.PI / 4;

scene.add(house);
scene.add(roof);

const keyboard = {};
document.addEventListener('keydown', (event) => {
    keyboard[event.key] = true;
    if (event.key === 'Shift') isSprinting = true;
    if (event.key === 'f') flashlight.visible = !flashlight.visible;
});
document.addEventListener('keyup', (event) => {
    keyboard[event.key] = false;
    if (event.key === 'Shift') isSprinting = false;
});

const mouse = new THREE.Vector2();
const sensitivity = 0.01;
let isPointerLocked = false;

function handleMouseMove(event) {
    if (isPointerLocked) {
        mouse.x += event.movementX * sensitivity;
        mouse.y += event.movementY * sensitivity;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x + event.movementY * sensitivity));
        camera.rotation.y -= event.movementX * sensitivity;
    }
}

document.addEventListener('mousemove', handleMouseMove);

const canvas = renderer.domElement;

canvas.addEventListener('click', () => canvas.requestPointerLock());

document.addEventListener('pointerlockchange', () => {
    isPointerLocked = document.pointerLockElement === canvas;
    if (isPointerLocked) {
        mouse.set(0, 0);
    }
});

let isSprinting = false;
let stamina = 100;
let health = 100;
const sprintSpeed = 0.1;
const baseSpeed = 0.03;
const staminaDecreaseRate = 50;
const staminaIncreaseRate = 5;
const maxStamina = 100;
const healthRegenRate = 1;

function animate() {
    requestAnimationFrame(animate);

    const speed = isSprinting ? sprintSpeed : baseSpeed;
    const direction = new THREE.Vector3();

    if (isPointerLocked) {
        if (keyboard['w']) {
            direction.x -= Math.sin(camera.rotation.y);
            direction.z -= Math.cos(camera.rotation.y);
        }
        if (keyboard['s']) {
            direction.x += Math.sin(camera.rotation.y);
            direction.z += Math.cos(camera.rotation.y);
        }
        if (keyboard['d']) {
            direction.x -= Math.sin(camera.rotation.y - Math.PI / 2);
            direction.z -= Math.cos(camera.rotation.y - Math.PI / 2);
        }
        if (keyboard['a']) {
            direction.x += Math.sin(camera.rotation.y - Math.PI / 2);
            direction.z += Math.cos(camera.rotation.y - Math.PI / 2);
        }

        direction.normalize().multiplyScalar(speed);
        player.position.add(direction);
        player.prevPosition = player.position.clone();

        detectCollisions();

        if (isSprinting) {
            stamina -= staminaDecreaseRate / 60;
            if (stamina <= 0) {
                stamina = 0;
                isSprinting = false;
                if (health > 0) {
                    health -= 10;
                    takeDamage();
                }
            }
        } else {
            stamina = Math.min(stamina + staminaIncreaseRate / 60, maxStamina);
        }

        if (health <= 0) {
            endGame();
        } else if (health < 100) {
            health = Math.min(health + healthRegenRate / 60, 100);
            updateHealthBar();
        }

        updateStaminaBar();
    }

    flashlight.position.copy(player.position).add(new THREE.Vector3(0, 0.75, 0));
    flashlight.target.position.copy(player.position).add(camera.getWorldDirection(new THREE.Vector3()));

    camera.position.copy(player.position).add(new THREE.Vector3(0, 1, 0));

    renderer.render(scene, camera);
}

function updateStaminaBar() {
    document.getElementById('stamina-bar').style.width = `${stamina}%`;
}

function updateHealthBar() {
    document.getElementById('health-bar').style.width = `${health}%`;
}

function takeDamage() {
    console.log(`Health: ${health}`);
}

function endGame() {
    console.log('Game Over');
}

animate();
