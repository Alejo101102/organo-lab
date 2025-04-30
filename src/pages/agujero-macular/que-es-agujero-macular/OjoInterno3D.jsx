import { Canvas } from '@react-three/fiber';
import Lights from './lights/Lights';
import Controls from './controls/Controls';
import InternEye from '../models-3d/InternEye'

const OjoInterno3D = () => {
  return (
    <div style={{ width: '200vh', height: '80vh' }}>
      <Canvas camera={{ position: [0, 2, 15] }} shadows={true}>
        < Lights />
        <Controls />
        <InternEye scale={35} physics={false} position={[-0.7, 0.5, 0.5]} 
        rotation={[0, Math.PI * 20 / 180, 0]} castshadow={true} />
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1.5, 0]} receiveShadow={true}>
          <circleGeometry args={[12, 64]} />
          <meshStandardMaterial color = "darkgray" />
        </mesh>

      </Canvas>
    </div>
  );
};

export default OjoInterno3D;