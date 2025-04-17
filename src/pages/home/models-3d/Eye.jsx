import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const Eye = (props) => {

    const { nodes, materials } = useGLTF("models-3d/eye.glb");

    
    return(
        <group {...props} dispose={null}>
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
      </group>
    
    );
    
    
};
export default Eye;

useGLTF.preload("models-3d/eye.glb");