import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// Luz
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff00c1, 1);
pointLight.position.set(12, 6, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLight1 = new THREE.PointLight(0x00fff7, 1);
pointLight1.position.set(-12, 6, 0);
pointLight1.castShadow = true;
scene.add(pointLight1);

const texture = new THREE.CubeTextureLoader()
    .setPath("/PRIMER CORTE/Ajedrez/SkyBox/")
    .load(["right.png", "left.png", "up.png", "down.png", "front.png", "back.png"]);
scene.background = texture;

const textureLoader = new THREE.TextureLoader(); // Crear la instancia de TextureLoader




const ambientOcclusionTexture = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Base Ajedrez/Tiles_040_ambientOcclusion.jpg');
const baseColorTexture = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Base Ajedrez/Tiles_040_basecolor.jpg');
const normalTexture = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Base Ajedrez/Tiles_040_normal.jpg');
const roughnessTexture = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Base Ajedrez/Tiles_040_roughness.jpg');
const heightTexture = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Base Ajedrez/Tiles_040_height.png');

const material = new THREE.MeshPhysicalMaterial({
    map: baseColorTexture,
    normalMap: normalTexture,
    displacementMap: heightTexture,
    displacementScale: 0,
    roughnessMap: roughnessTexture,
    roughness: 1.0,
    alphaTest: 0.1,
    aoMap: ambientOcclusionTexture,
    aoMapIntensity: 1.0


});
const geometry = new THREE.BoxGeometry(10, 0.5, 10);
const mesh = new THREE.Mesh(geometry, material);
mesh.receiveShadow = true;
mesh.castShadow = true;
mesh.position.z = -0.5;
scene.add(mesh);


const baseColorTextureV = textureLoader.load('/PRIMER CORTE/Navidad/TEXTURAS/AdobeStock_155136020/glass_clear/glass_clear_basecolor.png');
const heightTextureV = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Base Ajedrez/Tiles_040_height.png');
const metallicTextureV = textureLoader.load('/PRIMER CORTE/Navidad/TEXTURAS/AdobeStock_155136020/glass_clear/glass_clear_metallic.png');
const normalTextureV = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Base Ajedrez/Tiles_040_normal.jpg');
const opacityTextureV = textureLoader.load('/PRIMER CORTE/Navidad/TEXTURAS/AdobeStock_155136020/glass_clear/glass_clear_opacity.png');
const roughnessTextureV = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Base Ajedrez/Tiles_040_roughness.jpg');

// Crear el material con las texturas aplicadas
const materialM = new THREE.MeshPhysicalMaterial({
    map: baseColorTextureV,
    emissive: new THREE.Color(0x5900FF),
    emissiveIntensity: 0.3,
    normalMap: normalTextureV,
    roughnessMap: roughnessTextureV,
    metalnessMap: metallicTextureV,
    transparent: 0.5,
    opacityMap: opacityTextureV,
    displacementMap: heightTextureV,
    displacementScale: 0.1,
    transmission: 1,
    thickness: 0.5,
    ior: 1.5,
    reflectivity: 0.9,
    roughness: 0.05,
    metalness: 1,
    envMap: texture,
    envMapIntensity: 2
});



const ambientOcclusionTexture1 = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Fichas/Plastic_003_ambientOcclusion.jpg');
const baseColorTexture1 = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Fichas/Plastic_003_basecolor.jpg');
const baseColorTexture4 = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Fichas/Plastic_003_basecolor2.jpg');
const normalTexture1 = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Fichas/Plastic_003_normal.jpg');
const roughnessTexture1 = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Fichas/Plastic_003_metallic.jpg');
const heightTexture1 = textureLoader.load('/PRIMER CORTE/Ajedrez/Imagenes/Fichas/Plastic_003_height.jpg');

const materialN = new THREE.MeshPhysicalMaterial({
    map: baseColorTexture1,
    normalMap: normalTexture1,
    emissive: new THREE.Color(0x0046FF),
    emissiveIntensity: 0.5, // Aumentar la intensidad del brillo
    metalness: 1,
    roughness: 0.3, // Suave para reflejos suaves
    reflectivity: 0.2, // Muy reflectivo
    displacementMap: heightTexture1,
    displacementScale: 0,
    alphaTest: 0.1,
    aoMap: ambientOcclusionTexture1,
    aoMapIntensity: 1.0
});

const materialB = new THREE.MeshPhysicalMaterial({
    map: baseColorTexture1,
    normalMap: normalTexture1,
    emissive: new THREE.Color(0xAA00FF),
    emissiveIntensity: 0.5, // Aumentar la intensidad del brillo
    metalness: 1,
    roughness: 0.3, // Suave para reflejos suaves
    reflectivity: 0.2, // Muy reflectivo
    displacementMap: heightTexture1,
    displacementScale: 0,
    alphaTest: 0.1,
    aoMap: ambientOcclusionTexture1,
    aoMapIntensity: 1.0
});

const loader = new FBXLoader();

function loadFBXModel(url, scale, position, rotation, material) {
    loader.load(url, function (object) {
        if (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material = material;
                    child.castShadow = true;  // Habilitar proyección de sombras
                    child.receiveShadow = true;
                }
            });
        }
        object.scale.set(scale.x, scale.y, scale.z);
        object.position.set(position.x, position.y, position.z);
        object.rotation.set(rotation.x, rotation.y, rotation.z);
        scene.add(object);
    });
}

// Uso de la función para cargar modelos
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Rook.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: -6, y: 0.5, z: 0.2 }, { x: 0, y: 0, z: 0 }, materialB);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Knight.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: -2.4, y: 0.5, z: 0.6 }, { x: 0, y: Math.PI * 1.5, z: 0 }, materialB);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Bishop.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: -6, y: 0.5, z: -1.5 }, { x: 0, y: 0, z: 0 }, materialB);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/King.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: -6, y: 0.5, z: -5.5 }, { x: 0, y: 0, z: 0 }, materialB);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Queen.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: -6, y: 0.5, z: -5.8 }, { x: 0, y: 0, z: 0 }, materialB);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Bishop.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: -6, y: 0.5, z: -5.2 }, { x: 0, y: 0, z: 0 }, materialB);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Knight.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: -2.4, y: 0.5, z: -5.5 }, { x: 0, y: Math.PI * 1.5, z: 0 }, materialB);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Rook.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: -6, y: 0.5, z: -8.7 }, { x: 0, y: 0, z: 0 }, materialB);

loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Rook.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: 2.65, y: 0.5, z: 0.2 }, { x: 0, y: 0, z: 0 }, materialN);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Knight.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: 2.4, y: 0.5, z: 4.5 }, { x: 0, y: (Math.PI * 1.5) * 3, z: 0 }, materialN);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Bishop.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: 2.65, y: 0.5, z: -1.5 }, { x: 0, y: 0, z: 0 }, materialN);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/King.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: 2.65, y: 0.5, z: -5.5 }, { x: 0, y: 0, z: 0 }, materialN);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Queen.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: 2.65, y: 0.5, z: -5.8 }, { x: 0, y: 0, z: 0 }, materialN);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Bishop.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: 2.65, y: 0.5, z: -5.2 }, { x: 0, y: 0, z: 0 }, materialN);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Knight.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: 2.4, y: 0.5, z: -1.7 }, { x: 0, y: (Math.PI * 1.5) * 3, z: 0 }, materialN);
loadFBXModel('/PRIMER CORTE/Ajedrez/FBX/Rook.fbx', { x: 0.6, y: 0.6, z: 0.6 }, { x: 2.65, y: 0.5, z: -8.7 }, { x: 0, y: 0, z: 0 }, materialN);

const geometry1 = new THREE.BoxGeometry(11, 1, 11);
const mesh1 = new THREE.Mesh(geometry1, materialM);
mesh1.receiveShadow = true;
mesh1.castShadow = true;
mesh1.position.z = -0.5;
scene.add(mesh1);

function createPawn(position, material, scene) {
    const scaleFactor = 0.4; // Factor de escala para reducir la altura a la mitad
    const points = [];

    points.push(new THREE.Vector2(0, 0));                                // Centro de la base
    points.push(new THREE.Vector2(0.6 * scaleFactor, 0 * scaleFactor));  // Borde de la base
    points.push(new THREE.Vector2(0.6 * scaleFactor, 0.2 * scaleFactor)); // Subida desde la base
    points.push(new THREE.Vector2(0.4 * scaleFactor, 0.2 * scaleFactor)); // Parte inferior del cuerpo
    points.push(new THREE.Vector2(0.3 * scaleFactor, 0.25 * scaleFactor));// Subida hacia la parte media
    points.push(new THREE.Vector2(0.4 * scaleFactor, 0.3 * scaleFactor));// Parte media
    points.push(new THREE.Vector2(0.5 * scaleFactor, 0.6 * scaleFactor));// Cuello
    points.push(new THREE.Vector2(0.45 * scaleFactor, 0.8 * scaleFactor));// Parte superior del cuello
    points.push(new THREE.Vector2(0.3 * scaleFactor, 1 * scaleFactor));  // Final del cuello
    points.push(new THREE.Vector2(0.1 * scaleFactor, 2 * scaleFactor));  // Inicio de la esfera superior
    points.push(new THREE.Vector2(0.2 * scaleFactor, 2.2 * scaleFactor));// Esfera superior del peón
    points.push(new THREE.Vector2(0.4 * scaleFactor, 2.4 * scaleFactor));// Esfera superior del peón
    points.push(new THREE.Vector2(0.4 * scaleFactor, 2.6 * scaleFactor));// Esfera superior del peón
    points.push(new THREE.Vector2(0.2 * scaleFactor, 2.8 * scaleFactor));// Esfera superior del peón
    points.push(new THREE.Vector2(0 * scaleFactor, 2.81 * scaleFactor)); // Esfera superior del peón

    // Crear la geometría del peón usando LatheGeometry
    const geometryP = new THREE.LatheGeometry(points, 32);
    const pawn = new THREE.Mesh(geometryP, material);
    pawn.receiveShadow = true;
    pawn.castShadow = true;

    // Ajustes de rotación y posición
    pawn.position.set(position.x, position.y, position.z);

    // Añadir el peón a la escena
    scene.add(pawn);

    return pawn;
}

// Uso de la función
createPawn(new THREE.Vector3(3, 0.6, 3.8), materialN, scene);
createPawn(new THREE.Vector3(3, 0.6, 2.55), materialN, scene);
createPawn(new THREE.Vector3(3, 0.6, 1.3), materialN, scene);
createPawn(new THREE.Vector3(3, 0.6, 0.05), materialN, scene);
createPawn(new THREE.Vector3(3, 0.6, -1.2), materialN, scene);
createPawn(new THREE.Vector3(3, 0.6, -2.45), materialN, scene);
createPawn(new THREE.Vector3(3, 0.6, -3.7), materialN, scene);
createPawn(new THREE.Vector3(3, 0.6, -4.95), materialN, scene);

createPawn(new THREE.Vector3(-3, 0.6, 3.8), materialB, scene);
createPawn(new THREE.Vector3(-3, 0.6, 2.55), materialB, scene);
createPawn(new THREE.Vector3(-3, 0.6, 1.3), materialB, scene);
createPawn(new THREE.Vector3(-3, 0.6, 0.05), materialB, scene);
createPawn(new THREE.Vector3(-3, 0.6, -1.2), materialB, scene);
createPawn(new THREE.Vector3(-3, 0.6, -2.45), materialB, scene);
createPawn(new THREE.Vector3(-3, 0.6, -3.7), materialB, scene);
createPawn(new THREE.Vector3(-3, 0.6, -4.95), materialB, scene);

camera.position.z = 4;
camera.position.y = 2;
camera.position.x = 10;


function animate() {

    controls.update(); // Asegúrate de actualizar los controles

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
