import { Text } from '@react-three/drei'
import "./TitleConjuntivits.css"

const Text2D = ({ text }) => {
  return (
    <Text
      center
      position={[15, 7, 0]}
      color="#1b1b2f"
      distanceFactor={50}
      wrapperClass="title"
      occlude
      fontSize={5}
      font="/fonts/alice.ttf"
    >
      {text}
    </Text>
  )
}

export default Text2D
