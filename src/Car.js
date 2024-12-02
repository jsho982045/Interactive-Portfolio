// src/Car.js

import * as THREE from 'three'

class Car extends THREE.Group {
    constructor() {
        super()

        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.5, 3),
            new THREE.MeshStandardMaterial({ color: '#ff0000' })
        )

        body.position.y = 0.5
        body.castShadow = true
        this.add(body)

        const cabin = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.6, 1.2),
            new THREE.MeshStandardMaterial({ color: '#ffffff' })
        )

        cabin.position.y = 1
        cabin.position.z = -0.3
        cabin.castShadow = true
        this.add(cabin)

        const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2)
        const wheelMaterial = new THREE.MeshStandardMaterial({ color: '#333333' })
        const wheelPositions = [
            { x: 0.8, z: 1 },
            { x: -0.8, z: 1 },
            {x: 0.8, z: -1 },
            { x: -0.8, z: -1 }
        ]

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
            wheel.position.set(pos.x, 0.3, pos.z)
            wheel.rotation.z = Math.PI / 2
            wheel.castShadow = true
            this.add(wheel)
        })
        this.position.y = 0.3
        
    }
}

export default Car