import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Car from './Car.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#000000')

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 5, 10)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(5, 5, 5)
directionalLight.castShadow = true
scene.add(directionalLight)

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: '#444444', roughness: 0.8 })
)
ground.rotation.x = -Math.PI * 0.5
ground.receiveShadow = true
scene.add(ground)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const car = new Car()
car.castShadow = true
scene.add(car)

let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false
let currentSpeed = 0
const maxSpeed = 0.5
const acceleration = 0.02
const deceleration = 0.01
const turnSpeed = 0.04

document.addEventListener('keydown', (event) => {
  switch(event.key) {
      case 'ArrowUp': moveForward = true; break
      case 'ArrowDown': moveBackward = true; break
      case 'ArrowLeft': moveLeft = true; break
      case 'ArrowRight': moveRight = true;break
  }
})

document.addEventListener('keyup', (event) => {
  switch(event.key) {
      case 'ArrowUp': moveForward = false; break
      case 'ArrowDown': moveBackward = false; break
      case 'ArrowLeft': moveLeft = false; break
      case 'ArrowRight': moveRight = false; break
  }
})



function animate() {

  if(moveForward && currentSpeed < maxSpeed){
    currentSpeed += acceleration
  }
  if(moveBackward && currentSpeed > -maxSpeed/2){
    currentSpeed -= acceleration
  }

  if(!moveForward && !moveBackward) {
    currentSpeed *= (1 - deceleration)
  }

  car.position.x += Math.sin(car.rotation.y) * currentSpeed
  car.position.z += Math.cos(car.rotation.y) * currentSpeed

  if(moveLeft) car.rotation.y += turnSpeed * Math.abs(currentSpeed/maxSpeed)
  if(moveRight) car.rotation.y -= turnSpeed * Math.abs(currentSpeed/maxSpeed)

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})