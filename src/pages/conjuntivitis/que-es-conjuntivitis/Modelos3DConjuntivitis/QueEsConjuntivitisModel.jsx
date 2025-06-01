import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export function ModeloQueEsConjuntivitis({ physics = false, rotate = false, ...props }) {
  const { nodes, materials } = useGLTF('/models-3d/que_es_conjuntivitis.glb')
  const groupRef = useRef();
  const rigidBodyRef = useRef();

  // Estado para controlar si el modelo está rotando
  const [isRotating, setIsRotating] = useState(rotate);

  // Usar useFrame para aplicar la rotación en cada frame si isRotating es true
  useFrame(() => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += 0.01; 
    }
  });



  // Función para manejar el clic y alternar la rotación
  const handleClick = () => {
    setIsRotating(!isRotating);
  };
  
  useEffect(() => {
    if (physics && rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true)
    }
  }, [physics])



  const content = (
    <group ref={groupRef} {...props} onClick={handleClick} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_1.geometry}
        material={materials.Bones}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_2.geometry}
        material={materials.Skin}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_3.geometry}
        material={materials.Lens}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_4.geometry}
        material={materials.TarsalPlateUpperEyelid}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_5.geometry}
        material={materials.TarsalPlateLowerEyelid}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_6.geometry}
        material={materials.OpticPartOfRightRetina}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_7.geometry}
        material={materials.Choroid}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_8.geometry}
        material={materials.Cornea}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_9.geometry}
        material={materials.RightLacrimalCaniculus}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_10.geometry}
        material={materials.RightOpticNerveInternal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_11.geometry}
        material={materials.RightOpticNerveExternal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_12.geometry}
        material={materials.RetinalVeins}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_13.geometry}
        material={materials.RetinalArteries}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_14.geometry}
        material={materials.Sclera}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SickEye101_15.geometry}
        material={materials.MucousMembrane}
      />
    </group>
  );

  if (physics) {
      return (
        <RigidBody ref={rigidBodyRef} colliders="trimesh" restitution={0.6} friction={0.4}>
          {content}
        </RigidBody>
      )
  } else {
    return content;
  }
}

useGLTF.preload('/models-3d/que_es_conjuntivitis.glb')
