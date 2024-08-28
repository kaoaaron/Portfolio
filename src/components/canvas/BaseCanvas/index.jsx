import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Avatar } from "@/components/canvas/Avatar";

export default function Home() {
  const bgColor = ({ gl }) => {
    gl.setClearColor("black");
  };

  return (
    <>
      <Canvas
        id="canvas"
        style={{ position: "relative", height: "90vh" }}
        camera={{ position: [5, 2, 5], fov: 30 }}
        onCreated={bgColor}
      >
        <ambientLight intensity={3.5} />
        <pointLight intensity={1} position={[10, 10, 10]} />
        <Text scale={0.5} color={"white"} position={[1, 1, 2]}>
          Hi! I&apos;m Aaron.
        </Text>
        <Avatar />
        <mesh scale={[0.7, 0.9, 0.7]}>
          <boxGeometry />
          <meshStandardMaterial color="grey" />
        </mesh>
        <mesh receiveShadow scale={2} rotation-x={-Math.PI * 0.5}>
          <circleGeometry />
          <meshStandardMaterial color="#D27D2D" />
        </mesh>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </>
  );
}
