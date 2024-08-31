        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // const renderer = new THREE.WebGLRenderer();
        // resizeRendererToDisplaySize();
        // document.body.appendChild(renderer.domElement);
        // const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
        // const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0 }); // Transparent material
        // const player = new THREE.Mesh(playerGeometry, playerMaterial);
        // scene.add(player);
        // const environmentGeometry = new THREE.BoxGeometry(10, 10, 10);
        // const environmentMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, wireframe: true });
        // const environment = new THREE.Mesh(environmentGeometry, environmentMaterial);
        // scene.add(environment);
        // const keyboard = {};
        // document.addEventListener('keydown', (event) => {
        //     keyboard[event.key] = true;
        // });
        // document.addEventListener('keyup', (event) => {
        //     keyboard[event.key] = false;
        // });
        // const mouse = new THREE.Vector2();
        // const sensitivity = 0.01;
        // let isPointerLocked = false;

        // function handleMouseMove(event) {
        //     if (isPointerLocked) {
        //         mouse.x += event.movementX * sensitivity;
        //         mouse.y += event.movementY * sensitivity;
        //     }
        // }

        // document.addEventListener('mousemove', handleMouseMove);
        // const canvas = renderer.domElement;

        // canvas.addEventListener('click', () => {
        //     canvas.requestPointerLock();
        // });

        // document.addEventListener('pointerlockchange', () => {
        //     isPointerLocked = document.pointerLockElement === canvas;
        //     if (isPointerLocked) {
        //         mouse.x = 0;
        //         mouse.y = 0;
        //     }
        // });
        // function detectCollisions() {
        //     const playerPos = player.position;
        //     const envPos = environment.position;
        //     const envSize = environment.geometry.parameters;

        //     if (
        //         playerPos.x < envPos.x - envSize.width / 2 ||
        //         playerPos.x > envPos.x + envSize.width / 2 ||
        //         playerPos.y < envPos.y - envSize.height / 2 ||
        //         playerPos.y > envPos.y + envSize.height / 2 ||
        //         playerPos.z < envPos.z - envSize.depth / 2 ||
        //         playerPos.z > envPos.z + envSize.depth / 2
        //     ) {
        //         player.position.copy(player.prevPosition);
        //     }
        // }
        // function animate() {
        //     requestAnimationFrame(animate);
        //     const speed = 0.3;
        //     const jumpSpeed = 0.5;
        //     const gravity = 0.02;
        //     const direction = new THREE.Vector3();
        //     if (isPointerLocked) {
        //         if (keyboard['w']) {
        //             direction.x -= Math.sin(camera.rotation.y);
        //             direction.z -= Math.cos(camera.rotation.y);
        //         }
        //         if (keyboard['s']) {
        //             direction.x += Math.sin(camera.rotation.y);
        //             direction.z += Math.cos(camera.rotation.y);
        //         }
        //         if (keyboard['a']) {
        //             direction.x -= Math.sin(camera.rotation.y - Math.PI / -2);
        //             direction.y -= Math.cos(camera.rotation.y - Math.PI / 2);
        //         }
        //         if (keyboard['d']) {
        //             direction.x += Math.sin(camera.rotation.y - Math.PI / -2);
        //             direction.y += Math.cos(camera.rotation.y - Math.PI / -2);
        //         }

        //         direction.normalize().multiplyScalar(speed);
        //         player.position.add(direction);
        //         player.prevPosition = player.position.clone();
        //         camera.rotation.y -= mouse.x;
        //         camera.rotation.x -= mouse.y;
        //         camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
        //         detectCollisions();
        //         mouse.x = 0;
        //         mouse.y = 0;
        //         if (keyboard[' ']) {
        //             if (player.position.y <= 0.5) {
        //                 player.jumping = true;
        //             }
        //         }

        //         if (player.jumping) {
        //             player.position.y += jumpSpeed;
        //             if (player.position.y >= 2) {
        //                 player.jumping = false;
        //             }
        //         } else if (player.position.y > 0) {
        //             player.position.y -= gravity;
        //         }
        //     }

        //     camera.position.copy(player.position);
        //     camera.position.y += 1;

        //     renderer.render(scene, camera);
        // }

        // function resizeRendererToDisplaySize() {
        //     const canvas = renderer.domElement;
        //     const width = window.innerWidth;
        //     const height = window.innerHeight;
        //     const needResize = canvas.width !== width || canvas.height !== height;
        //     if (needResize) {
        //         renderer.setSize(width, height, false);
        //     }
        //     return needResize;
        // }

        // window.addEventListener('resize', resizeRendererToDisplaySize);

        // animate();
