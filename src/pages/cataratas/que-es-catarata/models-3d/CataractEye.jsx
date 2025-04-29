import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export function CataractEye({ physics = true, rotate = true, ...props }) {
  const { nodes, materials } = useGLTF('/models-3d/cataratas/que-es/cataract-eye.glb')
  console.log(nodes);
  console.log(materials);

  const groupRef = useRef();
  const rigidBodyRef = useRef()

  useFrame(() => {
    if (rotate && groupRef.current) {
      groupRef.current.rotation.y += 0.003; 
    }
  });

  useEffect(() => {
    if (physics && rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true)
    }
  }, [physics])

  const content = (
    
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_1.geometry}
        material={materials.BonesMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_2.geometry}
        material={materials.SkinMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_3.geometry}
        material={materials.LensMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_4.geometry}
        material={materials.TarsalPlateUpperEyelidMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_5.geometry}
        material={materials.TarsalPlateLowerEyelidMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_6.geometry}
        material={materials.OpticPartOfRightRetinaMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_7.geometry}
        material={materials.ChoroidMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_8.geometry}
        material={materials.CorneaMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_9.geometry}
        material={materials.RightLacrimalCaniculusMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_10.geometry}
        material={materials.RightOpticNerve1Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_11.geometry}
        material={materials.RightOpticNerve2Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_12.geometry}
        material={materials.RetinalVeinsMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_13.geometry}
        material={materials.RetinalArteriesMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_14.geometry}
        material={materials.StraalvormigLichaamMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CataractEye_15.geometry}
        material={materials.Sclera}
      />
    </group>
  );

  if (physics) {
    return (
      <RigidBody ref={rigidBodyRef} colliders="trimesh" restitution={0.6} friction={0.4} {...props}>
        {content}
      </RigidBody>
    )
  } else {
    return content;
  }
}

useGLTF.preload('/models-3d/cataratas/que-es/cataract-eye.glb')