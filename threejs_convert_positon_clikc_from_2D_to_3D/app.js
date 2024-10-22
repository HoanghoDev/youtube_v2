import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { gsap } from 'https://cdn.skypack.dev/gsap';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);
// light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
const hemisphereLight = new THREE.HemisphereLight(0xaaaaff, 0xffaaaa, 0.5);
scene.add(hemisphereLight);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// controls camera
const camera = new THREE.PerspectiveCamera(
    15,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.target.set(0, 0, 0);
controls.update();

// auto render
const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  controls.update(); // Cập nhật controls
  renderer.render(scene, camera);
};
reRender3D();
// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const loader = new GLTFLoader();
let landscape;
// load landscape
loader.load(
    "/badlands_with_erosion_and_desert_sand_landscape.glb",
    function (gltf) {
        gltf.castShadow = true;
        gltf.receiveShadow = true;
        landscape = gltf.scene;
        landscape.rotation.y = 1.6;
        landscape.scale.set(10, 10, 10);
        scene.add(landscape);
    }
);

camera.position.set(0, 0, 8);

document.addEventListener('click', (event) => {
    let mouse = new THREE.Vector2();
    mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      - (event.clientY / window.innerHeight) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const direction = raycaster.ray.direction.clone();

const pointClick = raycaster.ray.origin.clone().add(direction.multiplyScalar(4));
    createTree(pointClick);
});

let tree;
function createTree(pointClick) {
    loader.load("/stylized_tree.glb", function (gltf) {
        tree = gltf.scene;
        tree.position.copy(pointClick);
        scene.add(tree);
        gsap.to(tree.position, {
            y: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
}

