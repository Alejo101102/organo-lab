import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

const Lights = () => {
  const targetRef = useRef();
  const spotLightRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
      scene.add(spotLightRef.current.target); // ¡IMPORTANTE!
    }
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.5} />
      
      <directionalLight 
        position={[0, 5, 7]}
        intensity={1.2} // ligeramente más intensa
        color="#6f00ff"
        castShadow={true}
        shadow-mapSize-width={2048} // mejor resolución
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <spotLight
        ref={spotLightRef}
        position={[2, 6, 5]} // mueve un poco la posición
        distance={100}
        color="#6f00ff"
        intensity={120} // aún más fuerte
        angle={Math.PI / 2} // más enfocado
        penumbra={0.6}
        castShadow={true}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.005} // elimina artefactos de sombra
        shadow-normalBias={0.02}
      />
      {/* Target hacia el centro de la escena */}
      <object3D ref={targetRef} position={[0, 0, 0]} />

      <pointLight 
        position={[5, 2, -5]} 
        intensity={1.3} 
        color="#6f00ff"
        castShadow={false} 
      />
    </>
  );
};

export default Lights;
