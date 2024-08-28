import { useGLTF } from "@react-three/drei";

const AaronHead = () => {
  const reactLogo = useGLTF("./models/AaronHead/aaronmodel.gltf");

  return (
    <mesh>
      <primitive object={reactLogo.scene} rotation={[0, 0, 0]} scale={0.65} />
    </mesh>
  );
};

export default AaronHead;
