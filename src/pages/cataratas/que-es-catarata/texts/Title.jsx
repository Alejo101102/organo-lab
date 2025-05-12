import { Html } from '@react-three/drei'
import "./Title.css/"

const Title = ({ title }) => {
  return (
    <Html center position={[15, 5, 0]} distanceFactor={50} wrapperClass='title'>
        <h1>{title}</h1>
    </Html>
  )
}

export default Title