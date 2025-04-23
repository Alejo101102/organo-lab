import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const EyeWithGlaucoma = (props) => {

    const { nodes, materials } = useGLTF("/models-3d/eye-with-glaucoma.glb");

     // Verifica si los nodos existen antes de acceder a ellos
     if (!nodes || !nodes.MeshIris || !nodes.MeshSclera) {
      return <p>Modelo no disponible o no cargado correctamente</p>;
      }
    
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
    
    
};
export default EyeWithGlaucoma;

useGLTF.preload("models-3d/eye-with-glaucoma.glb");