import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

const Lights = () => {
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
      <ambientLight intensity={1.5} />
      
      <directionalLight 
        position={[5, 10, 5]}
        intensity={1}
        castShadow={true}
        shadow-mapSize={[1024, 1024]}
      />

      <spotLight
        color = "yellow"
        ref={spotLightRef}
        position={[0, 5, 9]}
        distance={75}
        intensity={50}
        angle={Math.PI / 3}
        penumbra={0.4}
        castShadow={true}
        shadow-mapSize={[1024, 1024]}
        shadow-normalBias={0.05}
      />
      {/* Target hacia el centro de la escena */}
      <object3D ref={targetRef} position={[0, 0, 0]} />
    </>
  );
};

export default Lights;