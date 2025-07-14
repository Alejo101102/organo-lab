import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

export function SnellenTable ({physics = true, rotate = false, ...props }) {
  const { nodes, materials } = useGLTF("/models-3d/snellen-table.glb");

  const groupRef = useRef();
  const rigidBodyRef = useRef()

      // Estado para controlar si el modelo está rotando
      const [isRotating, setIsRotating] = useState(rotate);
  
      // Usar useFrame para aplicar la rotación en cada frame si isRotating es true
      useFrame(() => {
          if (isRotating && groupRef.current) {
          groupRef.current.rotation.z += 0.01; 
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
        geometry={nodes.Frame.geometry}
        material={materials.FrameMaterial}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-1.688, -4.053, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SnellenTable.geometry}
        material={materials.SnellenTableMaterial}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-1.688, -4.053, -1]}
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
        
};

useGLTF.preload("/models-3d/snellen-table.glb");