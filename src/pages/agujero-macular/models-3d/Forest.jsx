import { useGLTF } from "@react-three/drei";
import { useRef, useState } from 'react'
import { useFrame } from "@react-three/fiber";

const Forest = ({rotate=false, ...props}) => {
    const {nodes, materials} = useGLTF('/models-3d/agujero-macular/forest.glb');
    const groupRef = useRef();

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

    return (
    <group ref={groupRef} {...props} onClick={handleClick} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Leaves.geometry}
        material={materials.LeavesMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Vegetation.geometry}
        material={materials.VegetationMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rocks.geometry}
        material={materials.RocksMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dirt.geometry}
        material={materials.DirtMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Grass.geometry}
        material={materials.GrassMaterial}
      />
    </group>
  )
}

  export default Forest;

  useGLTF.preload('/models-3d/agujero-macular/forest.glb');
  
  