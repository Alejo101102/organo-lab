import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';

const MattSmith = ({rotate = true, ...props }) => {

  const groupRef = useRef();

    const { nodes, materials } = useGLTF("/models-3d/matt-smith.glb");
    
    return(
        <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bowtie.geometry}
        material={materials.Bowtie}
        position={[-0.017, -1.838, 0.019]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button.geometry}
        material={materials.Button}
        position={[0, -2.134, -0.085]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.HairBase.geometry}
        material={materials.Head}
        position={[0, 0.001, -0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Jacket.geometry}
        material={materials.Jacket}
        position={[0.002, -1.52, 0.486]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shirt.geometry}
        material={materials.ShirtFabric}
        position={[0.002, -1.517, 0.504]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MSBeardBase.geometry}
        material={materials.Head}
        position={[0, 0.001, -0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MSBrowsLashesBase.geometry}
        material={materials.Head}
        position={[0, 0.001, -0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MSHead.geometry}
        material={materials.Head}
        position={[0, 0.001, -0.048]}
      />
      <group position={[0, -0.386, -0.563]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SphereMSEyes.geometry}
          material={materials['EyeExternal.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SphereMSEyes_1.geometry}
          material={materials['EyeInternal.001']}
        />
      </group>
    </group>
    
    );
    
    
};
export default MattSmith;

useGLTF.preload("models-3d/matt-smith.glb");