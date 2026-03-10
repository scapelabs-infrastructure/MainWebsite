import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

interface Node {
  position: THREE.Vector3;
  color: THREE.Color;
}

function NeuralNetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const { scrollYProgress } = useScroll();
  
  const nodes = useMemo(() => {
    const nodeArray: Node[] = [];
    const numNodes = 80;
    const rgbColors = [
      new THREE.Color(1, 0, 0),
      new THREE.Color(0, 1, 0),
      new THREE.Color(0, 0, 1),
      new THREE.Color(0, 1, 1),
      new THREE.Color(1, 0, 1),
      new THREE.Color(1, 1, 0),
    ];
    
    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      const radius = 4;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      const color = rgbColors[Math.floor(Math.random() * rgbColors.length)];
      nodeArray.push({ position: new THREE.Vector3(x, y, z), color });
    }
    return nodeArray;
  }, []);

  const { lineGeometry, particleGeometry, particleColors } = useMemo(() => {
    const linePositions: number[] = [];
    const particlePositions: number[] = [];
    const colors: number[] = [];
    
    nodes.forEach((node, i) => {
      particlePositions.push(node.position.x, node.position.y, node.position.z);
      colors.push(node.color.r, node.color.g, node.color.b);
      
      nodes.forEach((otherNode, j) => {
        if (i < j) {
          const distance = node.position.distanceTo(otherNode.position);
          if (distance < 3.5) {
            linePositions.push(
              node.position.x, node.position.y, node.position.z,
              otherNode.position.x, otherNode.position.y, otherNode.position.z
            );
          }
        }
      });
    });

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return { lineGeometry: lineGeo, particleGeometry: particleGeo, particleColors: colors };
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      const scroll = scrollYProgress.get();
      
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
      
      const scale = 1.2 + scroll * 3;
      groupRef.current.scale.set(scale, scale, scale);
    }

    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const idx = i / 3;
        const t = state.clock.elapsedTime * 2 + idx * 0.1;
        const pulse = Math.sin(t) * 0.5 + 0.5;
        
        colors[i] = particleColors[i] * (0.5 + pulse * 0.5);
        colors[i + 1] = particleColors[i + 1] * (0.5 + pulse * 0.5);
        colors[i + 2] = particleColors[i + 2] * (0.5 + pulse * 0.5);
      }
      
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial 
          color="#00F0FF" 
          transparent 
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          vertexColors
          size={0.2}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}

export function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#030303']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF003C" />
        <NeuralNetworkMesh />
      </Canvas>
      <div className="absolute inset-0 bg-[#030303]/40 pointer-events-none" />
    </div>
  );
}
