import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export function ModeloTratamientosConjuntivitis({ physics = false, rotate = false, ...props }) {
  const { nodes, materials } = useGLTF('/models-3d/tratamientos_conjuntivitis.glb')
  const groupRef = useRef()
  const rigidBodyRef = useRef()
  const [isRotating, setIsRotating] = useState(rotate)

  // Animación de rotación
  useFrame(() => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  // Alternar rotación al hacer clic
  const handleClick = () => {
    setIsRotating(!isRotating)
  }

  // Aplicar impulso si `physics` está activado
  useEffect(() => {
    if (physics && rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true)
    }
  }, [physics])

  const content = (
    <group ref={groupRef} {...props} onDoubleClick={handleClick} dispose={null} scale={[900, 900, 900]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cork.geometry}
        material={materials.PlasticCorkMaterial}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CorkElements.geometry}
          material={materials.PlasticCorkMaterial}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bottle.geometry}
        material={materials.PlasticBottleMaterial}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Label.geometry}
          material={materials.LabelLogoMaterial}
        />
      </mesh>
    </group>
  )

  if (physics) {
    return (
      <RigidBody ref={rigidBodyRef} colliders="trimesh" restitution={0.6} friction={0.4}>
        {content}
      </RigidBody>
    )
  } else {
    return content
  }
}

useGLTF.preload('/models-3d/tratamientos_conjuntivitis.glb')
