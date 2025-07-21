import React, { useRef, useState, useEffect  } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export function EyeTreatment({ physics = true, rotate = false, ...props }) {
    const { nodes, materials } = useGLTF('/models-3d/cataratas/eye-treatment.glb')

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
            geometry={nodes.EyeTreatment.geometry}
            material={materials.EyeTreatmentMaterial}
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
        return content;
    }
}

useGLTF.preload('/models-3d/cataratas/eye-treatment.glb')