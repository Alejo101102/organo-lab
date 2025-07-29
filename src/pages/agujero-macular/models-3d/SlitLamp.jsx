import { useGLTF } from "@react-three/drei";
import { useRef, useState } from 'react'
import { useFrame } from "@react-three/fiber";

const SlitLamp = ({rotate=false, ...props}) => {
    const {nodes, materials} = useGLTF('/models-3d/agujero-macular/slit-lamp.glb');
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
                geometry={nodes.SlitLamp_1.geometry}
                material={materials.lampColorBlack}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.SlitLamp_2.geometry}
                material={materials.lampEmissionWhite}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.SlitLamp_3.geometry}
                material={materials.lampColorWhite}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.SlitLamp_4.geometry}
                material={nodes.SlitLamp_4.material}
            />
        </group>
    )
}

  export default SlitLamp;

  useGLTF.preload('/models-3d/agujero-macular/slit-lamp.glb');