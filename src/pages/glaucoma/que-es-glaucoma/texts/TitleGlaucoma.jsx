import { Html } from '@react-three/drei'
import "./TitleGlaucoma.css/"

const TitleGlaucoma = ({ title }) => {
  return (
    <Html center position={[15, 6, 0]} distanceFactor={50} wrapperClass='title' occlude>
        <h1>{title}</h1>
    </Html>
  )
}

export default TitleGlaucoma