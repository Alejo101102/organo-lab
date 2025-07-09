import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';



export function EyeWithGlaucoma ({physics = true, rotate = false, ...props }) {
  const { nodes, materials } = useGLTF("/models-3d/eye-with-glaucoma.glb");

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
      <group rotation={[-Math.PI, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MeshIris.geometry}
            material={materials.IrisMaterial}
            position={[0, 0, -2.824]}
            scale={123.881}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MeshSclera.geometry}
            material={materials.ScleraMaterial}
            scale={120.464}
          />
        </group>
      </group>
      <group position={[281.849, 0, 0]} rotation={[-Math.PI, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.HealthyMeshIris.geometry}
            material={materials.HealthyIrisMaterial}
            position={[0, 0, -2.824]}
            scale={123.881}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MeshHealthySclera.geometry}
            material={materials.ScleraMaterial}
            scale={120.464}
          />
        </group>
      </group>
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

useGLTF.preload("/models-3d/eye-with-glaucoma.glb");