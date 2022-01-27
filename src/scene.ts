import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { bounceEaseInOutCubic } from './renderLogic/bouceFunctions';
import Distribution from './renderLogic/distribution';

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let controls: TrackballControls;
let light1: THREE.PointLight;
let light2: THREE.PointLight;
let light3: THREE.PointLight;
let light4: THREE.PointLight;
let light5: THREE.PointLight;
let light6: THREE.PointLight;
let clock = new THREE.Clock();
let stats: Stats;


export function init(container: HTMLElement) {
  const rect = container.getBoundingClientRect();

  // CAMERA

  camera = new THREE.PerspectiveCamera(50, rect.width / rect.height, 1, 300);
  camera.position.set(0, 15, 150);
  camera.lookAt(0, 0, 0);

  // SCENE

  scene = new THREE.Scene();
  //scene.background = new THREE.Color(0x040306);
  scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
  //scene.fog = new THREE.Fog(0x040306, 10, 300);

  // TEXTURES

  /*
  var textureLoader = new THREE.TextureLoader();

  var texture = textureLoader.load("textures/disturb.jpg");
  texture.repeat.set(20, 10);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.format = THREE.RGBFormat;
  texture.encoding = THREE.sRGBEncoding;

  */

  // MATERIALS

  //var groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
  var objectMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 1.0 });

  // GROUND
  /*
  var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(800, 400, 2, 2), groundMaterial);
  mesh.position.y = - 5;
  mesh.rotation.x = - Math.PI / 2;
  scene.add(mesh);

  */
  // OBJECTS

  var objectGeometry = new THREE.BoxBufferGeometry(3, 3, 3);
  const distribution = new Distribution(bounceEaseInOutCubic);

  for (var i = 0; i < 5000; i++) {
    var mesh = new THREE.Mesh(objectGeometry, objectMaterial);

    var pos = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);

    pos.normalize().multiplyScalar(50 + distribution.random() * 100);

    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = pos.z;

    //mesh.rotation.y = 3.14 * (0.5 - Math.random());
    //mesh.rotation.x = 3.14 * (0.5 - Math.random());

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    scene.add(mesh);

  }

  // LIGHTS

  /*
  var intensity = 2.5;
  var distance = 100;
  var decay = 2.0;

  var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;

  var sphere = new THREE.SphereBufferGeometry(0.25, 16, 8);
  */

  /*
  light1 = new THREE.PointLight(c1, intensity, distance, decay);
  light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c1 })));
  scene.add(light1);

  light2 = new THREE.PointLight(c2, intensity, distance, decay);
  light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c2 })));
  scene.add(light2);

  light3 = new THREE.PointLight(c3, intensity, distance, decay);
  light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c3 })));
  scene.add(light3);

  light4 = new THREE.PointLight(c4, intensity, distance, decay);
  light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c4 })));
  scene.add(light4);

  light5 = new THREE.PointLight(c5, intensity, distance, decay);
  light5.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c5 })));
  scene.add(light5);

  light6 = new THREE.PointLight(c6, intensity, distance, decay);
  light6.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c6 })));
  scene.add(light6);
  */

  /*
  var dlight = new THREE.DirectionalLight(0xffffff, 10.05);
  dlight.position.set(0.5, 1, 0).normalize();
  scene.add(dlight);
  */

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 10);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 0, 0);
  scene.add(hemiLight);

  // RENDERER

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(rect.width / rect.height);
  renderer.setSize(rect.width, rect.height);
  container.appendChild(renderer.domElement);
  renderer.outputEncoding = THREE.sRGBEncoding;

  // CONTROLS

  controls = new TrackballControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.dynamicDampingFactor = 0.15;

  controls.keys = [65, 83, 68];

  // STATS

  stats = Stats.apply({});
  container.appendChild(stats.dom);

  //

  window.addEventListener('resize', onWindowResize(container), false);
}

function onWindowResize(container: HTMLElement) {
  return function () {
    const rect = container.getBoundingClientRect();

    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();

    renderer.setSize(rect.width, rect.height);

    controls.handleResize();
  }
}

//

export function animate() {

  requestAnimationFrame(animate);

  render();
  stats.update();

}

function render() {

  /*
  var time = Date.now() * 0.00025;
  var d = 150;

  light1.position.x = Math.sin(time * 0.7) * d;
  light1.position.z = Math.cos(time * 0.3) * d;

  light2.position.x = Math.cos(time * 0.3) * d;
  light2.position.z = Math.sin(time * 0.7) * d;

  light3.position.x = Math.sin(time * 0.7) * d;
  light3.position.z = Math.sin(time * 0.5) * d;

  light4.position.x = Math.sin(time * 0.3) * d;
  light4.position.z = Math.sin(time * 0.5) * d;

  light5.position.x = Math.cos(time * 0.3) * d;
  light5.position.z = Math.sin(time * 0.5) * d;

  light6.position.x = Math.cos(time * 0.7) * d;
  light6.position.z = Math.cos(time * 0.5) * d;

  */

  controls.update();

  renderer.render(scene, camera);

}