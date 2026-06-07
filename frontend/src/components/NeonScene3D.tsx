import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BLUE = '#2D6EFF';
const VIOLET = '#7B3FE4';
const CYAN = '#00E5FF';
const PINK = '#FF3D8B';

/* ---------- shared additive glow texture (one canvas, reused) ---------- */
let _glowTex: THREE.CanvasTexture | null = null;
function glowTexture(): THREE.CanvasTexture {
  if (_glowTex) return _glowTex;
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.2, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.16)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  _glowTex = new THREE.CanvasTexture(c);
  return _glowTex;
}

function Halo({ color, scale = 3, position = [0, 0, 0], opacity = 0.6 }: {
  color: string; scale?: number; position?: [number, number, number]; opacity?: number;
}) {
  const tex = useMemo(() => glowTexture(), []);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={tex}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

/* ---------- neon wireframe solid (glassy body + bright edges + halo) ---------- */
function NeonSolid({ geometry, color, halo = 1.6, haloOpacity = 0.5 }: {
  geometry: THREE.BufferGeometry; color: string; halo?: number; haloOpacity?: number;
}) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  return (
    <group>
      <Halo color={color} scale={halo} opacity={haloOpacity} />
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#0a0c18"
          emissive={color}
          emissiveIntensity={0.35}
          transparent
          opacity={0.28}
          roughness={0.35}
          metalness={0.7}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.95} />
      </lineSegments>
    </group>
  );
}

/* ---------- central glowing core ---------- */
function Core() {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.15, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.18;
      ref.current.rotation.x = Math.sin(t * 0.25) * 0.25;
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.9 + Math.sin(t * 1.4) * 0.35;
    }
  });

  return (
    <group ref={ref}>
      <Halo color={CYAN} scale={6.5} opacity={0.45} />
      <Halo color={VIOLET} scale={4.2} opacity={0.4} />
      <mesh geometry={geo}>
        <meshStandardMaterial
          ref={matRef}
          color="#0b1024"
          emissive={BLUE}
          emissiveIntensity={1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.95} />
      </lineSegments>
    </group>
  );
}

/* ---------- tilted neon ring ---------- */
function NeonRing({ radius, tube, color, rotation, speed, axis = 'z' }: {
  radius: number; tube: number; color: string; rotation: [number, number, number];
  speed: number; axis?: 'x' | 'y' | 'z';
}) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.TorusGeometry(radius, tube, 14, 120), [radius, tube]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation[axis] += delta * speed;
  });
  return (
    <mesh ref={ref} geometry={geo} rotation={rotation}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} roughness={0.3} metalness={0.5} />
    </mesh>
  );
}

/* ---------- orbiting constellation of solids ---------- */
type OrbitItem = { geometry: THREE.BufferGeometry; color: string; radius: number; angle: number; y: number; spin: number; size: number };

function Orbit() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  const items = useMemo<OrbitItem[]>(() => {
    const defs: { g: THREE.BufferGeometry; c: string }[] = [
      { g: new THREE.OctahedronGeometry(1), c: CYAN },
      { g: new THREE.TetrahedronGeometry(1), c: VIOLET },
      { g: new THREE.DodecahedronGeometry(1), c: BLUE },
      { g: new THREE.IcosahedronGeometry(1), c: PINK },
      { g: new THREE.OctahedronGeometry(1), c: BLUE },
      { g: new THREE.TetrahedronGeometry(1), c: CYAN },
    ];
    return defs.map((d, i) => ({
      geometry: d.g,
      color: d.c,
      radius: 3.2 + (i % 2) * 0.7,
      angle: (i / defs.length) * Math.PI * 2,
      y: Math.sin(i * 1.7) * 0.9,
      spin: 0.3 + (i % 3) * 0.15,
      size: 0.38 + (i % 3) * 0.12,
    }));
  }, []);

  return (
    <group ref={ref}>
      {items.map((it, i) => (
        <OrbitNode key={i} item={it} />
      ))}
    </group>
  );
}

function OrbitNode({ item }: { item: OrbitItem }) {
  const ref = useRef<THREE.Group>(null);
  const x = Math.cos(item.angle) * item.radius;
  const z = Math.sin(item.angle) * item.radius;
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * item.spin;
    ref.current.rotation.y += delta * item.spin * 0.7;
    ref.current.position.y = item.y + Math.sin(state.clock.elapsedTime * 0.8 + item.angle) * 0.18;
  });
  return (
    <group ref={ref} position={[x, item.y, z]} scale={item.size}>
      <NeonSolid geometry={item.geometry} color={item.color} halo={item.size * 9} haloOpacity={0.45} />
    </group>
  );
}

/* ---------- faint depth field (sparse glowing points) ---------- */
function DepthField({ count = 110 }: { count?: number }) {
  const tex = useMemo(() => glowTexture(), []);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 7;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = Math.sin(ph) * Math.cos(th) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * r - 2;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        size={0.16}
        color="#7da6ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- root rig: parallax + responsive scaling ---------- */
function Rig({ mouse, scale }: {
  mouse: React.MutableRefObject<{ x: number; y: number }>; scale: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const tx = mouse.current.x * 0.25;
    const ty = -mouse.current.y * 0.18;
    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.05;
  });

  return (
    <group scale={scale}>
      <group ref={ref}>
        <Core />
        <NeonRing radius={1.9} tube={0.022} color={CYAN} rotation={[Math.PI / 2.3, 0, 0]} speed={0.25} axis="z" />
        <NeonRing radius={2.5} tube={0.02} color={VIOLET} rotation={[Math.PI / 1.7, Math.PI / 5, 0]} speed={-0.18} axis="z" />
        <NeonRing radius={3.15} tube={0.018} color={BLUE} rotation={[Math.PI / 3, -Math.PI / 6, 0]} speed={0.14} axis="z" />
        <Orbit />
        <DepthField />
      </group>
    </group>
  );
}

export function NeonScene3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const [layout, setLayout] = useState({ scale: 1, z: 7.2 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) setLayout({ scale: 0.72, z: 8.6 });
      else if (w < 1024) setLayout({ scale: 0.86, z: 7.8 });
      else setLayout({ scale: 1, z: 7.2 });
    };
    onResize();
    window.addEventListener('pointermove', onMove);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, layout.z], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#06060f']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 2]} intensity={2.2} color={BLUE} distance={14} />
        <pointLight position={[4, 3, 4]} intensity={1.2} color={VIOLET} distance={16} />
        <Rig mouse={mouse} scale={layout.scale} />
      </Canvas>
      {/* soft vignette for depth + text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 42%, transparent 45%, rgba(6,6,15,0.55) 100%)',
        }}
      />
    </div>
  );
}
