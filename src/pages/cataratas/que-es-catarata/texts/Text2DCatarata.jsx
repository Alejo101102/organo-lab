import { Text } from '@react-three/drei'

const Text2DCatarata = ({ title }) => {
  return (
    <Text
      center
      position={[15, 3, 0]}
      rotation={[0, -Math.PI/45, 0]} 
      color="#1b1b2f"
      distanceFactor={50}
      wrapperClass="title"
      occlude
      fontSize={1.3}
      font="/fonts/roboto.ttf"
    >
      {title}
    </Text>
  )
}

export default Text2DCatarata
