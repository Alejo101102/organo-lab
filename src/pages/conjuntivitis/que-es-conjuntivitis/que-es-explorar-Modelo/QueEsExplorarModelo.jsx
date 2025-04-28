import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import Lights from './lights/Lights';  // Importa el componente Lights
import Controls from './controls/Controls';
import { Model } from '../../ModelosConjuntivitis/QueEsConjuntivitisModel';

const QueEsExplorarModelo = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0.7, 7], fov: 50 }} shadows={true}>
        {/* Usa el componente Lights aquí */}
        <Lights />
        
        {/* Controles */}
        <Controls />

        {/* Configuración de Física */}
        <Physics gravity={[0, -9.81, 0]}>
          {/* Piso para que el modelo caiga sobre él */}
          <RigidBody type="fixed" colliders="trimesh">
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}  
              position={[0, -0.5, 0]} 
              receiveShadow={true}
            >
              <circleGeometry args={[5, 64]} />
              <meshStandardMaterial color="darkgray" />
            </mesh>
          </RigidBody>

          {/* El modelo con física de caída */}
          <RigidBody type="dynamic" colliders="trimesh">
            <Model
              scale={40}               // Tamaño del modelo
              position={[0, 5, 0]}     // Comienza desde una altura de 5 unidades
              rotation={[0, 0, 0]}    
              castShadow={true}        
            />
          </RigidBody>

        </Physics>
      </Canvas>
    </div>
  );
};

export default QueEsExplorarModelo;
