import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';

const SnellenTable = ({rotate = true, ...props }) => {

  const groupRef = useRef();

    const { nodes, materials } = useGLTF("/models-3d/snellen-table.glb");
    
    return(
        <group {...props} dispose={null}>
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
    
    
};
export default SnellenTable;

useGLTF.preload("models-3d/snellen-table.glb");