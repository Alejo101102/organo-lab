import { Html } from '@react-three/drei'
import "./TitleGlaucoma.css/"

const TitleGlaucomaModelo = ({ title }) => {
  return (
    <Html center position={[15, 6, 0]} distanceFactor={1} wrapperClass='title' occlude>
        <h1>{title}</h1>
    </Html>
  )
}

export default TitleGlaucomaModelo