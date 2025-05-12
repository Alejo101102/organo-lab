// src/lights/LightsSintomas.jsx
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

const LightsSintomas = () => {
  const targetRef = useRef();
  const spotLightRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
      scene.add(spotLightRef.current.target);
    }
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.8} />
      
      <directionalLight 
        position={[-4, 6, 4]}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <spotLight
        ref={spotLightRef}
        position={[2, 6, 6]}
        distance={20}
        intensity={35}
        angle={Math.PI / 4}
        penumbra={0.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-normalBias={0.03}
      />

      <object3D ref={targetRef} position={[0, 0, 0]} />

      <pointLight 
        position={[0, 1.5, -4]} 
        intensity={80} 
        color={"cyan"} 
      />
    </>
  );
};

export default LightsSintomas;
