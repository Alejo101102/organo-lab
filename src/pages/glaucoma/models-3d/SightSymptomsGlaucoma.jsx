import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';


const SightSymptomsGlaucoma = ({rotate = true, ...props }) => {

  const groupRef = useRef();

    const { nodes, materials } = useGLTF("/models-3d/room.glb");

      useFrame(() => {
        if (rotate && groupRef.current) {
          groupRef.current.rotation.y += 0.003; 
        }
      });
    
    return(
      <group {...props} dispose={null}>
      <group
        position={[-1.663, 1.488, 1.627]}
        rotation={[-Math.PI / 2, -1.496, -Math.PI / 2]}
        scale={[0.404, 0.527, 0.527]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PlaneChair.geometry}
          material={materials.MaterialGrey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PlaneChair_1.geometry}
          material={materials.MaterialChair}
        />
      </group>
      <group position={[0, 4.125, 0]} scale={4.154}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeRoom.geometry}
          material={materials.MaterialCubeRoom}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeRoom_1.geometry}
          material={materials.MaterialFloor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeRoom_2.geometry}
          material={materials.MaterialGrey}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BedBase.geometry}
        material={materials.MaterialWood}
        position={[-1.658, 0.199, -2.805]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mattress_.geometry}
        material={nodes.Mattress_.material}
        position={[-1.658, 0.101, -2.805]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Blanket.geometry}
        material={materials.MaterialGrey}
        position={[-0.245, 2.114, -2.802]}
        scale={[1.542, 1, 1.783]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillow_.geometry}
        material={nodes.Pillow_.material}
        position={[-3.464, 0.898, -2.733]}
        rotation={[Math.PI / 2, 1.425, -Math.PI / 2]}
        scale={1.349}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Door.geometry}
        material={nodes.Door.material}
        position={[2.767, 1.665, -4.206]}
      />
      <group position={[-3.309, 1.428, 1.495]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeDesk.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeDesk_1.geometry}
          material={materials.MaterialWood}
        />
      </group>
      <group position={[-2.994, 0.472, 3.316]} scale={1.168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeMonitor.geometry}
          material={materials.MaterialMonitor1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeMonitor_1.geometry}
          material={materials.MaterialGlass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeMonitor_2.geometry}
          material={materials.MaterialMonitor2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeMonitor_3.geometry}
          material={materials.MaterialMonitor3}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SecondScreen_.geometry}
        material={materials.MaterialBlack}
        position={[-3.587, 2.025, 0.873]}
        rotation={[0, -0.052, 0]}
        scale={[0.437, 0.804, 0.804]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FirstScreen.geometry}
        material={materials.MaterialBlack}
        position={[-3.593, 2.025, 2.112]}
        rotation={[0, 0.052, 0]}
        scale={[0.437, 0.804, 0.804]}
      />
      <group
        position={[-3.353, 2.125, 3.185]}
        rotation={[0, 0.262, -0.079]}
        scale={[0.233, 0.281, 0.197]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeFirstSpeaker.geometry}
          material={materials.MaterialWhite}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeFirstSpeaker_1.geometry}
          material={materials.MaterialBlack}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_.geometry}
        material={materials.MaterialKeyboard}
        position={[-3.061, 1.478, 1.508]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Angles.geometry}
        material={nodes.Angles.material}
        position={[-3.061, 1.497, 1.78]}
        scale={[0.439, 3.318, 0.352]}
      />
      <group position={[-3.824, 3.961, 1.993]} scale={[0.329, 0.021, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_First_Shelf.geometry}
          material={materials.MaterialWood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_First_Shelf_1.geometry}
          material={materials['MaterialShelf ']}
        />
      </group>
      <group
        position={[-3.353, 2.125, -0.168]}
        rotation={[0, -0.262, -0.079]}
        scale={[0.233, 0.281, 0.197]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeSecondSpeaker.geometry}
          material={materials.MaterialWhite}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeSecondSpeaker_1.geometry}
          material={materials.MaterialBlack}
        />
      </group>
      <group position={[-3.824, 3.521, 0.134]} scale={[0.329, 0.021, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeSecondShelf_.geometry}
          material={materials.MaterialWood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeSecondShelf__1.geometry}
          material={materials['MaterialShelf ']}
        />
      </group>
      <group position={[-3.824, 3.14, -1.335]} scale={[0.329, 0.021, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeThirdShelf_.geometry}
          material={materials.MaterialWood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CubeThirdShelf__1.geometry}
          material={materials['MaterialShelf ']}
        />
      </group>
    </group>

    );
    
    
};
export default SightSymptomsGlaucoma;

useGLTF.preload("models-3d/room.glb");