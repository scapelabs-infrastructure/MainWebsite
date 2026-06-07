import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CityGridMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const COLS = 12;
  const ROWS = 12;
  const SPACING = 1.4;
  const HALF_C = (COLS - 1) * SPACING * 0.5;
  const HALF_R = (ROWS - 1) * SPACING * 0.5;

  const { gridGeometry, nodeGeometry, highlightIndices } = useMemo(() => {
    const linePositions: number[] = [];
    const nodePositions: number[] = [];
    const colors: number[] = [];

    const highlights = new Set<number>();
    const highlightSeeds = [14, 26, 38, 57, 72, 89, 103, 118];
    highlightSeeds.forEach(s => highlights.add(s % (COLS * ROWS)));

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * SPACING - HALF_C;
        const z = r * SPACING - HALF_R;
        const y = (Math.sin(c * 0.7) + Math.cos(r * 0.5)) * 0.15;
        nodePositions.push(x, y, z);

        const idx = r * COLS + c;
        const isHighlight = highlights.has(idx);
        if (isHighlight) {
          colors.push(0.17, 0.43, 1.0);
        } else {
          colors.push(0.25, 0.28, 0.42);
        }

        if (c < COLS - 1) {
          const nx = (c + 1) * SPACING - HALF_C;
          const ny = (Math.sin((c + 1) * 0.7) + Math.cos(r * 0.5)) * 0.15;
          linePositions.push(x, y, z, nx, ny, z);
        }
        if (r < ROWS - 1) {
          const nz = (r + 1) * SPACING - HALF_R;
          const ny2 = (Math.sin(c * 0.7) + Math.cos((r + 1) * 0.5)) * 0.15;
          linePositions.push(x, y, z, x, ny2, nz);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return { gridGeometry: lineGeo, nodeGeometry: nodeGeo, highlightIndices: highlights };
  }, []);

  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const targetRotX = mouseRef.current.y * 0.15 + 0.35;
    const targetRotY = mouseRef.current.x * 0.15 + t * 0.025;

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;

    const positions = nodeGeometry.attributes.position.array as Float32Array;
    const colors = nodeGeometry.attributes.color.array as Float32Array;
    for (let i = 0; i < COLS * ROWS; i++) {
      const idx = i * 3;
      const isHighlight = highlightIndices.has(i);
      if (isHighlight) {
        const pulse = Math.sin(t * 2.5 + i * 0.8) * 0.5 + 0.5;
        colors[idx] = 0.17 + pulse * 0.25;
        colors[idx + 1] = 0.43 + pulse * 0.2;
        colors[idx + 2] = 1.0;
        positions[idx + 1] = (Math.sin(t * 1.2 + i) * 0.5 + Math.cos(t * 0.7 + i * 0.5) * 0.3);
      }
    }
    nodeGeometry.attributes.position.needsUpdate = true;
    nodeGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#2D6EFF"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points geometry={nodeGeometry}>
        <pointsMaterial
          vertexColors
          size={0.22}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export function CityGrid3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#080810']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 10, 0]} intensity={1.5} color="#2D6EFF" />
        <pointLight position={[8, -4, 4]} intensity={0.6} color="#7B3FE4" />
        <CityGridMesh />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080810]/20 to-[#080810] pointer-events-none" />
    </div>
  );
}
