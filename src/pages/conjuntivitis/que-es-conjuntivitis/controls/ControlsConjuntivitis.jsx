// Importa los hooks de React
import { useEffect, useRef, useState } from "react";

// Importa controles de cámara y manejo de teclado de drei
import { OrbitControls, useKeyboardControls } from "@react-three/drei";

// Importa utilidades de React Three Fiber
import { useThree, useFrame } from "@react-three/fiber";

// Componente de controles personalizados
const Controls = () => {
  // Referencia para los controles de cámara
  const controlsRef = useRef();

  // Obtiene la cámara y el renderizador WebGL del contexto
  const { camera, gl } = useThree();

  // Estado para saber si el mouse está sobre el canvas
  const [isHovered, setIsHovered] = useState(false);

  // Obtiene el estado de las teclas de movimiento
  const forward = useKeyboardControls(state => state.forward);
  const backward = useKeyboardControls(state => state.backward);
  const left = useKeyboardControls(state => state.left);
  const right = useKeyboardControls(state => state.right);
  const up = useKeyboardControls(state => state.up);
  const down = useKeyboardControls(state => state.down);

  // Detecta si el mouse entra o sale del canvas
  useEffect(() => {
    if (!gl.domElement) return; // Verifica que el canvas exista

    const canvas = gl.domElement;
    const handleEnter = () => setIsHovered(true); // Activa estado al entrar
    const handleLeave = () => setIsHovered(false); // Desactiva estado al salir

    // Agrega eventos de mouse
    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    // Limpia los eventos al desmontar
    return () => {
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [gl]);

  // Maneja el movimiento de la cámara en cada frame
  useFrame(() => {
    if (!isHovered) return; // Solo mueve la cámara si el mouse está sobre el canvas

    const speed = 0.2; // Velocidad de movimiento
    const offset = [0, 0, 0]; // Vector de desplazamiento

    // Actualiza el desplazamiento según las teclas presionadas
    if (forward) offset[2] -= speed;
    if (backward) offset[2] += speed;
    if (left) offset[0] -= speed;
    if (right) offset[0] += speed;
    if (up) offset[1] += speed; // Movimiento hacia arriba
    if (down) offset[1] -= speed; // Movimiento hacia abajo

    // Actualiza la posición de la cámara
    camera.position.x += offset[0];
    camera.position.y += offset[1]; // Movimiento vertical
    camera.position.z += offset[2];

    // Si los controles están disponibles, actualiza el objetivo
    if (controlsRef.current) {
      controlsRef.current.target.x += offset[0];
      controlsRef.current.target.y += offset[1]; // Movimiento vertical del objetivo
      controlsRef.current.target.z += offset[2];
      controlsRef.current.update(); // Actualiza los controles
    }
  });

  // Renderiza los controles de cámara
  return (
    <OrbitControls
      ref={controlsRef} // Asocia la referencia
      enableZoom={true} // Habilita el zoom
      enablePan={true} // Habilita el paneo
      target={[0, 1, 0]} // Objetivo inicial de la cámara
      minDistance={2} // Distancia mínima de la cámara
      maxDistance={20} // Distancia máxima de la cámara
    />
  );
};

// Exporta el componente
export default Controls; 