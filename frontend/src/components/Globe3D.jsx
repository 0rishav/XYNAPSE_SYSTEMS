import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CharWithBg({ char, angle, radius, fontSize }) {
  const textRef = useRef();
  const bgRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    const px = Math.sin(angle) * radius;
    const pz = Math.cos(angle) * radius;
    const pos = new THREE.Vector3(px, 0, pz);

    const dirToCamera = camera.position.clone().sub(pos).normalize();
    const bgOffset = dirToCamera.clone().multiplyScalar(0.01)

    if (textRef.current) {
      textRef.current.position.set(pos.x, pos.y, pos.z);
    }
    if (bgRef.current) {
      bgRef.current.position.set(pos.x + bgOffset.x, pos.y + bgOffset.y, pos.z + bgOffset.z);

      bgRef.current.lookAt(camera.position);
    }
  });

  const bgWidth = fontSize * 0.9;   
  const bgHeight = fontSize * 1.2;  

  return (
    <>
      <mesh ref={bgRef}>
        <planeGeometry args={[bgWidth, bgHeight]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>

      <Text
        ref={textRef}
        rotation={[0, angle, 0]}
        fontSize={fontSize}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        billboard
        letterSpacing={-0.02}
      >
        {char}
      </Text>
    </>
  );
}

function TextRing() {
  const ringRef = useRef();

  const text = "XYNAPSESYSTEM"; 
  const radius = 1.45;
  const fontSize = 0.24;
  const yOffset = 0.25;
  const spread = Math.PI * 1.6; 

  useFrame(() => {
    if (ringRef.current) ringRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={ringRef} position={[0, yOffset, 0]}>
      {[...text].map((char, i) => {
        const angle = -spread / 2 + (i / (text.length - 1)) * spread;

        return (
          <CharWithBg
            key={i}
            char={char}
            angle={angle}
            radius={radius}
            fontSize={fontSize}
          />
        );
      })}
    </group>
  );
}

function Globe() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 4.5], fov: 45 }}
      style={{ width: 96, height: 96 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <Globe />
      <TextRing />
    </Canvas>
  );
}
