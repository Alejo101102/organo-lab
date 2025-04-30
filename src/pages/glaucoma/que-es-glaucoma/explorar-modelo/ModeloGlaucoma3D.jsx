import { Canvas } from '@react-three/fiber';
import Lights from './lights/Lights';
import Controls from './controls/Controls';
import EyeWithGlaucoma from "../../models-3d/EyeWithGlaucoma";



import { Physics, RigidBody } from '@react-three/rapier';

const ModeloGlaucoma3D = () => {
  return (
    <div style={{ width: '200vh', height: '80vh'}}>
      <Canvas camera={{ position: [0, 2, 15]}} shadows={true}>
        <Lights />  
        <Controls />

        <Physics>

          <RigidBody type="fixed" colliders="trimesh">
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow={true}>
              <circleGeometry args={[12, 64]} />
              <meshStandardMaterial color="darkgray" />
            </mesh>
          </RigidBody>

          <EyeWithGlaucoma scale={150} physics={false} position={[-0.7, 3, 1]} rotation={[0, Math.PI*20/180 , 0]} castshadow={true} /> {/*scale={7} position={[0, 1.2, 0]}*/}
        </Physics>
      </Canvas>
    </div>
  );
};

export default ModeloGlaucoma3D;
