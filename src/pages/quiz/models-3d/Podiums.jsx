import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';



export function Podiums ({physics = true, rotate = false, ...props }) {
  const { nodes, materials } = useGLTF("/models-3d/podiums.glb");

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
      <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Podium}
        position={[2.715, -2.899, -30.598]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.Material}
        position={[2.715, -3.282, -23.015]}
        scale={20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials['Podium.001']}
        position={[-5.369, -2.899, -33.482]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials['Podium.002']}
        position={[10.616, -2.899, -33.482]}
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

useGLTF.preload("/models-3d/podiums.glb");