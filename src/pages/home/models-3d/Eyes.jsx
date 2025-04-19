import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const EyesModel = () => {
  const { nodes, materials } = useGLTF("/models-3d/eyes.glb");

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RightEye.geometry}
        material={materials.RightEyeMaterial}
        position={[0, 0, -2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RightIris.geometry}
        material={materials.RightIrisMaterial}
        position={[0, 0, -2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LeftIris.geometry}
        material={materials.LeftIrisMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LeftEye.geometry}
        material={materials.LeftEyeMaterial}
      />
    </group>
  );
};

const Eyes = () => {
  return (
    <Canvas style={{ width: '200', height: '180' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <OrbitControls />
      <EyesModel position={[-5, 1, 0]} />
    </Canvas>
  );
};

useGLTF.preload("/models-3d/eyes.glb");

export default Eyes;
