// src/components/shared/KeyboardWrapper.jsx
import React from 'react';
import { KeyboardControls } from '@react-three/drei';

/**
 * Componente que envuelve a Canvas y sus hijos con un mapeo de controles de teclado predeterminado.
 * 
 * @param {React.ReactNode} children - Contenido (por lo general <Canvas>)
 * @returns {JSX.Element}
 */
const KeyboardWrapper = ({ children }) => {
  const keyMap = [
    { name: "forward", keys: ["w", "ArrowUp"] },
    { name: "backward", keys: ["s", "ArrowDown"] },
    { name: "left", keys: ["a", "ArrowLeft"] },
    { name: "right", keys: ["d", "ArrowRight"] },
    { name: "up", keys: ["e", "PageUp"] },
    { name: "down", keys: ["q", "PageDown"] }
  ];

  return (
    <KeyboardControls map={keyMap}>
      {children}
    </KeyboardControls>
  );
};

export default KeyboardWrapper;
