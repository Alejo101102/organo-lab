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
      <ambientLight intensity={2} />
      
      <directionalLight 
        position={[0, 5, 7]}
        intensity={5}
        castShadow={true}
        shadow-mapSize={[1024, 1024]}
      />

      <spotLight
        ref={spotLightRef}
        position={[0, 5, 9]}
        distance={25}
        intensity={100}
        angle={Math.PI / 3}
        penumbra={0.5}
        castShadow={true}
        shadow-mapSize={[2048, 2048]}
        shadow-normalBias={0.05}
      />
      {/* Target hacia el centro de la escena */}
      <object3D ref={targetRef} position={[0, 0, 0]} />

      <pointLight 
        position={[5, 2, -5]} 
        intensity={25} 
        castShadow={false} 
      />
    </>
  );
};

export default Lights;
