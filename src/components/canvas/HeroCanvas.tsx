import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#C6A969"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

function FloatingIcons() {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <Float key={i} speed={0.5} rotationIntensity={1} floatIntensity={1} position={[
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4
        ]}>
          <mesh>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color="#C6A969" roughness={0.1} metalness={1} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#F7F7F5]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#C6A969" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <AnimatedSphere />
        <FloatingIcons />
      </Canvas>
    </div>
  );
}
