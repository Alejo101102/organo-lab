import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

const LightsCatarataPrevencion = () => {
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
      {/* Luz ambiental suave, tono cálido */}
      <ambientLight intensity={0.6} color={"#ffebcc"} />

      {/* Luz direccional lateral cálida */}
      <directionalLight
        position={[4, 5, -4]}
        intensity={2.5}
        color={"#ffd9a0"}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Luz puntual desde arriba con tono dorado */}
      <spotLight
        ref={spotLightRef}
        position={[0, 6, 4]}
        distance={18}
        intensity={40}
        angle={Math.PI / 5}
        penumbra={0.6}
        color={"#ffcc88"}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-normalBias={0.04}
      />

      <object3D ref={targetRef} position={[0, 0, 0]} />

      {/* Luz de relleno lateral, tono cálido suave */}
      <pointLight 
        position={[-3, 2, -2]} 
        intensity={20} 
        color={"#ffbb88"} 
      />
    </>
  );
};

export default LightsCatarataPrevencion;
