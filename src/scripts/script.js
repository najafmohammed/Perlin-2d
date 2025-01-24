import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { setupGUI } from "./gui.js";
import testVertexShader from "../shaders/perlin2D/vertex.glsl";
import testFragmentShader from "../shaders/perlin2D/fragment.glsl";

/**
 * Base
 */

const uniforms = {
  uTime: { value: 0.0 },
  uTimeMultiplier: { value: 1.0 },
  uAmplitudeMultiplier: { value: 5.0 },
  uNoiseScale: { value: 10.0 },
  uFreq: { value: 20.0 },
  uStrengthOffset: { value: 2.0 },
  uCol1: { value: new THREE.Color(0x0008ff) },
  uCol2: { value: new THREE.Color(0x7300ff) },
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Geometry
const geometry = new THREE.CircleGeometry(1, 10);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
  uniforms: uniforms,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 1.5);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Debug
/**
 * GUI Setup
 */
setupGUI(uniforms, camera);

/**
 * Animate
 */
const clock = new THREE.Clock(); // Create a clock to track elapsed time
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
