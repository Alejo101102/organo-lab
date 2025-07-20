import { Text3D } from '@react-three/drei'

const Text3DAgujeroMacular = ({ title, position }) => {
  return (
    <Text3D
      center
      position={position}
      rotation={[0, -Math.PI/90, 0]} 
      distanceFactor={50}
      wrapperClass="title"
      font="/fonts/roboto.json"
      occlude
      bevelEnabled
      bevelSize={0.1}
      bevelThickness={0.1}
      height={0.5}
      lineHeight={0.8}
      letterSpacing={0.01}
      size={1.3}
    >
      {title}
      <meshStandardMaterial
        color="#7179ec"
        emissive="#000000"
        roughness={10}

        flatShading={true}
      />

    </Text3D>
  )
}

export default Text3DAgujeroMacular
