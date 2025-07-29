import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

const LightsTratamiento = () => {
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
      {/* Luz ambiental suave en púrpura claro */}
      <ambientLight intensity={0.8} color={"#e0ccff"} />

      {/* Luz direccional en púrpura medio */}
      <directionalLight
        position={[5, 7, -5]}
        intensity={3}
        color={"#b266ff"}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Luz puntual con púrpura intenso */}
      <spotLight
        ref={spotLightRef}
        position={[0, 6, 5]}
        distance={22}
        intensity={60}
        angle={Math.PI / 5}
        penumbra={0.5}
        color={"#9933ff"}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-normalBias={0.04}
      />

      <object3D ref={targetRef} position={[0, 0, 0]} />

      {/* Luz secundaria púrpura brillante */}
      <pointLight
        position={[-3, 2, -2]}
        intensity={18}
        color={"#cc66ff"}
      />
    </>
  );
};

export default LightsTratamiento;