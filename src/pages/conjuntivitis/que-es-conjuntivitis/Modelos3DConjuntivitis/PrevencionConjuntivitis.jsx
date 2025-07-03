import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export function ModeloPrevencionConjuntivitis({ physics = false, rotate = false, ...props }) {
  const { nodes, materials } = useGLTF('/models-3d/prevencion_conjuntivitis.glb')
  const groupRef = useRef()
  const rigidBodyRef = useRef()
  const [isRotating, setIsRotating] = useState(rotate)

  useFrame(() => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  const handleClick = () => {
    setIsRotating(!isRotating)
  }

  useEffect(() => {
    if (physics && rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true)
    }
  }, [physics])

  const content = (
    <group ref={groupRef} {...props} dispose={null} onClick={handleClick}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tap.geometry}
        material={materials.MetalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor.geometry}
        material={materials.FloorMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall.geometry}
        material={materials.WallMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table_1.geometry}
        material={materials.TableBodyMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table_2.geometry}
        material={materials.BoardMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Basin_1.geometry}
        material={materials.BasinMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Basin_2.geometry}
        material={materials.MetalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SoapDispenser_1.geometry}
        material={materials.PlasticMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SoapDispenser_2.geometry}
        material={materials.MetalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.HandDryer_1.geometry}
        material={materials.PlasticMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.HandDryer_2.geometry}
        material={materials.MetalMaterial}
      />
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

useGLTF.preload('/models-3d/prevencion_conjuntivitis.glb')
