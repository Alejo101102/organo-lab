import { useGLTF } from "@react-three/drei";
import { useRef, useState } from 'react'
import { useFrame } from "@react-three/fiber";

const SnellenTable = ({rotate=false, ...props}) => {
    const {nodes, materials} = useGLTF('/models-3d/agujero-macular/snellen-table.glb');
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
        geometry={nodes.FramePlane.geometry}
        material={materials.FrameMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FramePlane_1.geometry}
        material={materials.SnellenTableMaterial}
      />
    </group>
  )
}

  export default SnellenTable;

  useGLTF.preload('/models-3d/agujero-macular/snellen-table.glb');
  
  