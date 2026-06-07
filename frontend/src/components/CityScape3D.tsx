import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BLUE = new THREE.Color('#2D6EFF');
const VIOLET = new THREE.Color('#7B3FE4');
const DARK = new THREE.Color('#0d0d20');

function Building({ x, z, height, width = 0.7, depth = 0.7, wireframe = false }: {
  x: number; z: number; height: number; width?: number; depth?: number; wireframe?: boolean;
}) {
  const geo = useMemo(() => new THREE.BoxGeometry(width, height, depth), [width, height, depth]);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  return (
    <group position={[x, height / 2, z]}>
      {!wireframe && (
        <mesh geometry={geo}>
          <meshStandardMaterial color={DARK} roughness={0.8} metalness={0.2} />
        </mesh>
      )}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          color={wireframe ? '#7B3FE4' : '#2D6EFF'}
          transparent
          opacity={wireframe ? 0.9 : 0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function Tree({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 6]} />
        <meshStandardMaterial color="#1a2a1a" roughness={1} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <coneGeometry args={[0.25, 0.7, 7]} />
        <meshStandardMaterial color="#0d2210" roughness={1} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <coneGeometry args={[0.18, 0.5, 7]} />
        <meshStandardMaterial color="#0a1d0d" roughness={1} />
      </mesh>
    </group>
  );
}

function ARPanel({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Group>(null);
  const startTime = useRef(delay);

  const planeGeo = useMemo(() => new THREE.PlaneGeometry(1.2, 0.7), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.2, 0.7, 0.01)), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + startTime.current;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.08;
  });

  return (
    <group ref={ref} position={position}>
      <mesh geometry={planeGeo}>
        <meshStandardMaterial
          color="#0a1535"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#2D6EFF" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <mesh position={[0, 0.12, 0.01]}>
        <planeGeometry args={[0.9, 0.08]} />
        <meshStandardMaterial color="#2D6EFF" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, -0.05, 0.01]}>
        <planeGeometry args={[0.5, 0.06]} />
        <meshStandardMaterial color="#7B3FE4" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, -0.18, 0.01]}>
        <planeGeometry args={[0.7, 0.05]} />
        <meshStandardMaterial color="#2D6EFF" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function GPSRing({ position, radius = 1.2, delay = 0 }: {
  position: [number, number, number]; radius?: number; delay?: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const pulse1Ref = useRef<THREE.Mesh>(null);
  const pulse2Ref = useRef<THREE.Mesh>(null);

  const ringGeo = useMemo(() => new THREE.RingGeometry(radius - 0.04, radius, 64), [radius]);
  const pulseGeo1 = useMemo(() => new THREE.RingGeometry(0.01, 0.08, 32), []);
  const pulseGeo2 = useMemo(() => new THREE.RingGeometry(0.01, 0.08, 32), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;

    if (pulse1Ref.current) {
      const scale1 = ((t * 0.5) % 1) * radius;
      pulse1Ref.current.scale.setScalar(scale1 * 14 + 1);
      (pulse1Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - ((t * 0.5) % 1));
    }
    if (pulse2Ref.current) {
      const scale2 = (((t * 0.5) + 0.5) % 1) * radius;
      pulse2Ref.current.scale.setScalar(scale2 * 14 + 1);
      (pulse2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - (((t * 0.5) + 0.5) % 1));
    }
    if (ringRef.current) {
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef} geometry={ringGeo}>
        <meshBasicMaterial color="#2D6EFF" transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={pulse1Ref} geometry={pulseGeo1} position={[0, 0, 0]}>
        <meshBasicMaterial color="#2D6EFF" transparent opacity={0.5} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={pulse2Ref} geometry={pulseGeo2} position={[0, 0, 0]}>
        <meshBasicMaterial color="#2D6EFF" transparent opacity={0.5} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function DataStream({ from, to, color = '#2D6EFF' }: {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 18;

  const positions = useMemo(() => {
    return new Float32Array(COUNT * 3);
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = geo.attributes.position.array as Float32Array;
    const mid: [number, number, number] = [
      (from[0] + to[0]) / 2,
      Math.max(from[1], to[1]) + 2.5,
      (from[2] + to[2]) / 2,
    ];

    for (let i = 0; i < COUNT; i++) {
      const progress = ((i / COUNT) + (t * 0.25)) % 1;
      const p = progress;
      const q = 1 - p;

      pos[i * 3] = q * q * from[0] + 2 * q * p * mid[0] + p * p * to[0];
      pos[i * 3 + 1] = q * q * from[1] + 2 * q * p * mid[1] + p * p * to[1];
      pos[i * 3 + 2] = q * q * from[2] + 2 * q * p * mid[2] + p * p * to[2];
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        color={color}
        size={0.09}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function GamificationBadge({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 1.2) * 0.12;
    ref.current.rotation.y = t * 0.6;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <octahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial
          color="#7B3FE4"
          emissive="#7B3FE4"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <pointLight color="#7B3FE4" intensity={0.4} distance={1.5} />
    </group>
  );
}

function CityScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = -0.38 + mouseRef.current.y * 0.05;
    const targetY = mouseRef.current.x * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
  });

  const groundGeo = useMemo(() => new THREE.PlaneGeometry(22, 22), []);
  const parkGeo = useMemo(() => new THREE.CircleGeometry(2.2, 32), []);

  const buildings = [
    { x: -3.5, z: -2, h: 3.5 },
    { x: -2.2, z: -2.5, h: 5.2 },
    { x: -1.0, z: -2, h: 2.8 },
    { x: 0.4,  z: -2.8, h: 4.0 },
    { x: 1.6,  z: -2,   h: 1.8 },
    { x: 2.8,  z: -2.5, h: 3.2 },
    { x: 3.8,  z: -1.5, h: 2.2 },
    { x: -3.8, z: 1.0,  h: 2.5, w: 0.8 },
    { x: -2.5, z: 1.0,  h: 1.6 },
    { x: 3.2,  z: 1.2,  h: 3.8 },
    { x: 4.2,  z: 1.0,  h: 1.5 },
  ];

  return (
    <group ref={groupRef} rotation={[-0.38, 0.3, 0]}>
      <mesh geometry={groundGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#06060e" roughness={1} />
      </mesh>

      <mesh geometry={parkGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.01, 1.5]}>
        <meshStandardMaterial color="#071a0a" roughness={1} />
      </mesh>

      {[
        [0.2, 1.0], [-0.5, 1.8], [1.0, 2.0], [1.3, 1.0], [-0.2, 2.5], [0.8, 2.8],
      ].map(([tx, tz], i) => (
        <Tree key={i} x={tx} z={tz} />
      ))}

      {buildings.map((b, i) => (
        <Building key={i} x={b.x} z={b.z} height={b.h} width={b.w} />
      ))}

      <Building x={-1.0} z={1.0} height={2.2} wireframe />

      <ARPanel position={[-2.2, 6.5, -2.5]} delay={0} />
      <ARPanel position={[0.4, 5.5, -2.8]} delay={2.1} />
      <ARPanel position={[3.2, 5.2, 1.2]} delay={1.0} />

      <GPSRing position={[0.5, 0.02, 1.5]} radius={2.2} delay={0} />
      <GPSRing position={[-2.2, 0.02, -2.5]} radius={1.0} delay={1.5} />

      <DataStream from={[-2.2, 5.5, -2.5]} to={[0.4, 4.8, -2.8]} color="#2D6EFF" />
      <DataStream from={[0.4, 4.8, -2.8]} to={[3.2, 4.5, 1.2]} color="#7B3FE4" />
      <DataStream from={[-2.2, 5.5, -2.5]} to={[-1.0, 2.3, 1.0]} color="#2D6EFF" />

      <GamificationBadge position={[1.6, 2.5, -2]} delay={0} />
      <GamificationBadge position={[-3.5, 4.3, -2]} delay={1.5} />
      <GamificationBadge position={[3.8, 3.0, -1.5]} delay={3.0} />

      <pointLight color="#2D6EFF" intensity={3} distance={12} position={[-2.2, 7, -2.5]} />
      <pointLight color="#2D6EFF" intensity={2} distance={10} position={[0.4, 6, -2.8]} />
      <pointLight color="#7B3FE4" intensity={2.5} distance={12} position={[3.2, 6, 1.2]} />
      <pointLight color="#7B3FE4" intensity={1.5} distance={6} position={[-1.0, 4, 1.0]} />
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#8888ff" />
    </group>
  );
}

export function CityScape3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 9, 14], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#080810']} />
        <CityScene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080810]/10 to-[#080810] pointer-events-none" />
    </div>
  );
}
