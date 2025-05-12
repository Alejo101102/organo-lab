import { useGLTF } from "@react-three/drei";
import { useRef } from 'react'
import { useFrame } from "@react-three/fiber";

const Forest = ({rotate=true, ...props}) => {
    const {nodes, materials} = useGLTF('/models-3d/agujero-macular/forest.glb');
    const groupRef = useRef();

    useFrame(() => {
      if (rotate && groupRef.current) {
        groupRef.current.rotation.y += 0.01;
      }
    });

    return (
    <group ref={groupRef} {...props} dispose={null}>
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
  
  