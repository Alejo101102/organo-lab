import { Html } from '@react-three/drei'

const BotonVideo = () => {
  return (
    <Html position={[0, -4, 8]} center distanceFactor={10} transform>
      <button
        onClick={() => window.open("https://www.youtube.com/watch?v=xRoPE5nF3GY", "_blank")}
        style={{
          padding: '10px 20px',
          fontSize: '25px',
          borderRadius: '8px',
          backgroundColor: '#e04e2e',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
        }}
      >
        Ver video explicativo
      </button>
    </Html>
  )
}

export default BotonVideo
