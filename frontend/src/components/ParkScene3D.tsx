import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const BLUE = '#2D6EFF';
const VIOLET = '#7B3FE4';
const GOLD = '#C9912F';
const LAMP = '#ffe6ad';

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- Camera: wide top-down landscape -> ease down the alley ---------- */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  const start = useRef(0);

  useFrame((state) => {
    if (start.current === 0) start.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - start.current;
    const t = easeInOutCubic(Math.min(elapsed / 6.5, 1));

    const px = THREE.MathUtils.lerp(0, 0, t) + mouse.current.x * 1.0;
    const py = THREE.MathUtils.lerp(30, 7.5, t);
    const pz = THREE.MathUtils.lerp(0.3, 14, t);
    camera.position.set(px, py, pz);

    const lookY = THREE.MathUtils.lerp(0, 1.0, t);
    const lookZ = THREE.MathUtils.lerp(0, -2.0, t);
    camera.lookAt(mouse.current.x * 0.5, lookY - mouse.current.y * 0.3, lookZ);
  });

  return null;
}

/* ---------- Continuous grassy ground (fades into fog) ---------- */
function Ground() {
  const baseGeo = useMemo(() => new THREE.PlaneGeometry(80, 80), []);
  // a few large overlapping grass patches for tonal variation
  const patches = useMemo(() => {
    const rng = mulberry32(7);
    const greens = ['#0a1f0f', '#0c2614', '#081a0c', '#0e2a16'];
    return Array.from({ length: 14 }, () => ({
      x: (rng() - 0.5) * 30,
      z: (rng() - 0.5) * 30,
      r: 3 + rng() * 6,
      c: greens[Math.floor(rng() * greens.length)],
    }));
  }, []);

  return (
    <group>
      <mesh geometry={baseGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#091d0e" roughness={1} />
      </mesh>
      {patches.map((p, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[p.x, 0.004 + i * 0.0008, p.z]}>
          <circleGeometry args={[p.r, 24]} />
          <meshStandardMaterial color={p.c} roughness={1} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Stone alley / path ribbon ---------- */
function Path({ x, z, w, l, rotation = 0 }: { x: number; z: number; w: number; l: number; rotation?: number }) {
  const geo = useMemo(() => new THREE.PlaneGeometry(w, l), [w, l]);
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, rotation]} position={[x, 0.02, z]}>
      <meshStandardMaterial color="#1b1b24" roughness={0.95} />
    </mesh>
  );
}

/* ---------- Central plaza ---------- */
function Plaza({ radius = 3.2 }: { radius?: number }) {
  const geo = useMemo(() => new THREE.CircleGeometry(radius, 64), [radius]);
  const ringGeo = useMemo(() => new THREE.RingGeometry(radius - 0.12, radius, 64), [radius]);
  const innerRing = useMemo(() => new THREE.RingGeometry(radius * 0.5, radius * 0.5 + 0.06, 64), [radius]);
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
      <mesh geometry={geo}>
        <meshStandardMaterial color="#1d1d27" roughness={0.9} />
      </mesh>
      <mesh geometry={ringGeo} position={[0, 0, 0.001]}>
        <meshBasicMaterial color={BLUE} transparent opacity={0.16} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh geometry={innerRing} position={[0, 0, 0.001]}>
        <meshBasicMaterial color={VIOLET} transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ---------- Trees: instanced for performance (2 draw calls total) ---------- */
const TREE_GREENS = ['#123320', '#0e2a18', '#163a24', '#0c2414', '#15351f'];
const FOLIAGE_BASE_R = 0.42;
const FOLIAGE_OFFSETS = [
  { dx: 0, dy: 0.82, dz: 0, r: 0.42 },
  { dx: 0.16, dy: 1.02, dz: 0.1, r: 0.3 },
  { dx: -0.17, dy: 0.96, dz: -0.06, r: 0.26 },
  { dx: 0.02, dy: 1.2, dz: -0.02, r: 0.2 },
];
type TreeData = { x: number; z: number; s: number; tone: number };

function InstancedTrees({ data }: { data: TreeData[] }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const foliageRef = useRef<THREE.InstancedMesh>(null);
  const greens = useMemo(() => TREE_GREENS.map((c) => new THREE.Color(c)), []);
  const foliageCount = data.length * FOLIAGE_OFFSETS.length;

  useEffect(() => {
    if (!trunkRef.current || !foliageRef.current) return;
    const m = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const scl = new THREE.Vector3();

    data.forEach((t, i) => {
      pos.set(t.x, 0.32 * t.s, t.z);
      scl.set(t.s, t.s, t.s);
      m.compose(pos, quat, scl);
      trunkRef.current!.setMatrixAt(i, m);
    });
    trunkRef.current.instanceMatrix.needsUpdate = true;

    let idx = 0;
    data.forEach((t) => {
      FOLIAGE_OFFSETS.forEach((o, oi) => {
        pos.set(t.x + o.dx * t.s, o.dy * t.s, t.z + o.dz * t.s);
        const sf = (o.r / FOLIAGE_BASE_R) * t.s;
        scl.set(sf, sf, sf);
        m.compose(pos, quat, scl);
        foliageRef.current!.setMatrixAt(idx, m);
        foliageRef.current!.setColorAt(idx, greens[(t.tone + oi * 2) % greens.length]);
        idx++;
      });
    });
    foliageRef.current.instanceMatrix.needsUpdate = true;
    if (foliageRef.current.instanceColor) foliageRef.current.instanceColor.needsUpdate = true;
  }, [data, greens]);

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, data.length]}>
        <cylinderGeometry args={[0.06, 0.11, 0.64, 7]} />
        <meshStandardMaterial color="#241910" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={foliageRef} args={[undefined, undefined, foliageCount]}>
        <sphereGeometry args={[FOLIAGE_BASE_R, 12, 12]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </>
  );
}

/* ---------- Park lamp post (warm, classic) ---------- */
function LampPost({ x, z, light = false }: { x: number; z: number; light?: boolean }) {
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!glowRef.current) return;
    const t = state.clock.elapsedTime;
    (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      1.4 + Math.sin(t * 2 + x) * 0.12;
  });
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.035, 0.06, 1.9, 8]} />
        <meshStandardMaterial color="#14141b" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.92, 0]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <meshStandardMaterial color={LAMP} emissive={LAMP} emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={glowRef} position={[0, 1.92, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color={LAMP} emissive={LAMP} emissiveIntensity={1.4} transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {light && <pointLight position={[0, 1.9, 0]} color={LAMP} intensity={0.55} distance={4.5} />}
    </group>
  );
}

/* ---------- Interactive screen kiosk (refined) ---------- */
function Kiosk({ position, rotation = 0, accent = BLUE }: {
  position: [number, number, number]; rotation?: number; accent?: string;
}) {
  const barsRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (barsRef.current) {
      barsRef.current.children.forEach((c: THREE.Object3D, i: number) => {
        c.scale.y = 0.35 + (Math.sin(t * 2.2 + i * 1.3) * 0.5 + 0.5) * 0.65;
      });
    }
    if (screenRef.current) {
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.55 + Math.sin(t * 3) * 0.12;
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.1, 1.1, 0.1]} />
        <meshStandardMaterial color="#16161f" roughness={0.6} metalness={0.5} />
      </mesh>
      <group position={[0, 1.3, 0]} rotation={[-0.22, 0, 0]}>
        <mesh ref={screenRef}>
          <boxGeometry args={[0.86, 0.56, 0.05]} />
          <meshStandardMaterial color="#070b18" emissive={accent} emissiveIntensity={0.55} roughness={0.4} />
        </mesh>
        <group ref={barsRef} position={[-0.27, -0.1, 0.04]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[i * 0.14, 0, 0]}>
              <planeGeometry args={[0.08, 0.26]} />
              <meshBasicMaterial color={i % 2 === 0 ? BLUE : VIOLET} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
            </mesh>
          ))}
        </group>
        <mesh position={[0, 0.2, 0.04]}>
          <planeGeometry args={[0.62, 0.04]} />
          <meshBasicMaterial color={accent} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Robot rover (sleek, matte) ---------- */
function Robot({ offset, speed = 1, lane = 0, accent = BLUE }: {
  offset: number; speed?: number; lane?: number; accent?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const cycle = (t * speed * 0.05 + offset) % 1;
    ref.current.position.z = THREE.MathUtils.lerp(8, -3, cycle);
    ref.current.position.x = lane + Math.sin(t * 1.3 + offset * 8) * 0.05;
    ref.current.position.y = 0.24 + Math.sin(t * 6 + offset * 5) * 0.012;
    ref.current.rotation.y = Math.PI;
    if (wheelsRef.current) {
      wheelsRef.current.children.forEach((w: THREE.Object3D) => {
        (w as THREE.Mesh).rotation.x = t * 6;
      });
    }
  });

  return (
    <group ref={ref} scale={0.85}>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.46, 0.26, 0.66]} />
        <meshStandardMaterial color="#3a3e4d" roughness={0.5} metalness={0.55} />
      </mesh>
      <mesh position={[0, 0.25, -0.14]}>
        <boxGeometry args={[0.3, 0.18, 0.26]} />
        <meshStandardMaterial color="#4a4f60" roughness={0.4} metalness={0.55} />
      </mesh>
      <mesh position={[0, 0.26, -0.28]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0.1, 0.42, -0.04]}>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 6]} />
        <meshStandardMaterial color="#777" metalness={0.6} />
      </mesh>
      <mesh position={[0.1, 0.53, -0.04]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={1.8} />
      </mesh>
      <group ref={wheelsRef}>
        {[[-0.25, -0.2], [0.25, -0.2], [-0.25, 0.2], [0.25, 0.2]].map(([wx, wz], i) => (
          <mesh key={i} position={[wx, -0.08, wz]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 0.05, 12]} />
            <meshStandardMaterial color="#101016" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ---------- Projection mapping (subtle) ---------- */
function ProjectionMapping({ position }: { position: [number, number, number] }) {
  const targetRef = useRef<THREE.Mesh>(null);
  const coneRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  const c1 = useMemo(() => new THREE.Color(BLUE), []);
  const c2 = useMemo(() => new THREE.Color(VIOLET), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (targetRef.current) {
      tmp.copy(c1).lerp(c2, Math.sin(t * 0.8) * 0.5 + 0.5);
      const mat = targetRef.current.material as THREE.MeshBasicMaterial;
      mat.color.copy(tmp);
      mat.opacity = 0.22 + Math.sin(t * 1.5) * 0.1;
    }
    if (coneRef.current) {
      (coneRef.current.material as THREE.MeshBasicMaterial).opacity = 0.07 + Math.sin(t * 2) * 0.03;
    }
    if (ringARef.current) ringARef.current.rotation.z = t * 0.35;
    if (ringBRef.current) ringBRef.current.rotation.z = -t * 0.25;
  });

  const projH = 2.6;
  return (
    <group position={position}>
      <mesh position={[1.6, 1.2, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 2.4, 8]} />
        <meshStandardMaterial color="#16161f" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[1.3, projH, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.36, 0.22, 0.28]} />
        <meshStandardMaterial color="#1e1e2a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[1.06, projH - 0.13, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={BLUE} />
      </mesh>
      <mesh ref={coneRef} position={[0.4, projH / 2 + 0.1, 0]} rotation={[0, 0, Math.PI + 0.35]}>
        <coneGeometry args={[1.3, projH + 0.4, 24, 1, true]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.08} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={targetRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[1.5, 48]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.25} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringARef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[0.9, 0.97, 6]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.35} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringBRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.065, 0]}>
        <ringGeometry args={[0.45, 0.5, 3]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color={BLUE} intensity={0.8} distance={4} position={[0, 1, 0]} />
    </group>
  );
}

/* ---------- Treasure hunt trail + chest (muted) ---------- */
function TreasureMarker({ position, index }: { position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const phase = (t * 1.2 - index * 0.35) % 3;
    const lit = phase > 0 && phase < 0.6;
    ref.current.position.y = position[1] + 0.12 + Math.sin(t * 2 + index) * 0.03;
    ref.current.rotation.y = t * 1.4;
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = lit ? 2.4 : 0.9;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.09, 0]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} metalness={0.6} roughness={0.35} />
    </mesh>
  );
}

function TreasureChest({ position }: { position: [number, number, number] }) {
  const beaconRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lidRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (beaconRef.current) {
      (beaconRef.current.material as THREE.MeshBasicMaterial).opacity = 0.16 + Math.sin(t * 2) * 0.08;
    }
    if (ringRef.current) {
      const s = 1 + ((t * 0.6) % 1) * 2;
      ringRef.current.scale.setScalar(s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.45 - ((t * 0.6) % 1) * 0.45);
    }
    if (lidRef.current) {
      lidRef.current.rotation.x = -0.3 - Math.sin(t * 1.2) * 0.12;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.46, 0.28, 0.34]} />
        <meshStandardMaterial color="#4a3018" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.48, 0.05, 0.36]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.4} metalness={0.8} roughness={0.35} />
      </mesh>
      <group ref={lidRef} position={[0, 0.28, -0.17]}>
        <mesh position={[0, 0.05, 0.17]}>
          <boxGeometry args={[0.46, 0.13, 0.34]} />
          <meshStandardMaterial color="#583a1e" roughness={0.7} metalness={0.3} />
        </mesh>
      </group>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.8} />
      </mesh>
      <mesh ref={beaconRef} position={[0, 2, 0]}>
        <cylinderGeometry args={[0.07, 0.14, 3.6, 16, 1, true]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.18} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.28, 0.33, 32]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color={GOLD} intensity={0.9} distance={3.5} position={[0, 0.6, 0]} />
    </group>
  );
}

/* ---------- Cultural corner: stage + art panels + sculpture ---------- */
function CulturalCorner({ position }: { position: [number, number, number] }) {
  const sculptureRef = useRef<THREE.Mesh>(null);
  const spotRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sculptureRef.current) {
      sculptureRef.current.rotation.y = t * 0.35;
      sculptureRef.current.rotation.x = Math.sin(t * 0.3) * 0.18;
    }
  });

  useEffect(() => {
    if (spotRef.current && targetRef.current) spotRef.current.target = targetRef.current;
  }, []);

  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.16, 40]} />
        <meshStandardMaterial color="#15121d" roughness={0.85} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.5, 48]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={sculptureRef} position={[0, 0.95, 0]}>
        <torusKnotGeometry args={[0.28, 0.09, 100, 14]} />
        <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.5} metalness={0.7} roughness={0.3} />
      </mesh>
      <object3D ref={targetRef} position={[0, 0.9, 0]} />

      {[
        { x: -1.3, z: -0.6, ry: 0.6, c: BLUE },
        { x: 1.3, z: -0.6, ry: -0.6, c: VIOLET },
        { x: 0, z: -1.4, ry: 0, c: GOLD },
      ].map((p, i) => (
        <group key={i} position={[p.x, 0.9, p.z]} rotation={[0, p.ry, 0]}>
          <mesh>
            <boxGeometry args={[0.6, 0.8, 0.05]} />
            <meshStandardMaterial color="#0a0a12" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.48, 0.68]} />
            <meshStandardMaterial color={p.c} emissive={p.c} emissiveIntensity={0.35} />
          </mesh>
          <mesh position={[0, -0.85, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.9, 6]} />
            <meshStandardMaterial color="#16161f" metalness={0.4} />
          </mesh>
        </group>
      ))}

      <spotLight ref={spotRef} position={[0, 3.2, 0.5]} angle={0.55} penumbra={0.5} intensity={2.2} distance={8} color={VIOLET} />
    </group>
  );
}

function Bench({ x, z, rotation = 0 }: { x: number; z: number; rotation?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.18]} />
        <meshStandardMaterial color="#2a1f15" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.24, -0.08]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.04]} />
        <meshStandardMaterial color="#2a1f15" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ---------- Scene assembly ---------- */
function ParkScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  // Procedural woodland: dense ring around the park + scattered inner trees,
  // avoiding the central alley corridor and plaza.
  const trees = useMemo<TreeData[]>(() => {
    const rng = mulberry32(42);
    const out: TreeData[] = [];
    // surrounding woods (depth/context, fades into fog)
    for (let i = 0; i < 70; i++) {
      const a = (i / 70) * Math.PI * 2 + rng() * 0.4;
      const rad = 9 + rng() * 11;
      out.push({
        x: Math.cos(a) * rad,
        z: Math.sin(a) * rad * 0.95,
        s: 0.8 + rng() * 1.1,
        tone: Math.floor(rng() * 5),
      });
    }
    // scattered inner trees lining lawns
    for (let i = 0; i < 30; i++) {
      const x = (rng() - 0.5) * 16;
      const z = (rng() - 0.5) * 16;
      if (Math.abs(x) < 2.0 && z > -4 && z < 9) continue; // keep alley clear
      if (Math.sqrt(x * x + z * z) < 3.6) continue; // keep plaza clear
      out.push({ x, z, s: 0.7 + rng() * 0.7, tone: Math.floor(rng() * 5) });
    }
    return out;
  }, []);

  return (
    <>
      <fog attach="fog" args={['#080810', 16, 42]} />
      <Ground />
      <Plaza radius={3.2} />

      {/* main alley approaching the plaza from the front */}
      <Path x={0} z={6.6} w={2.6} l={8.5} />
      {/* alleys radiating from the plaza */}
      <Path x={-4.4} z={-2.6} w={1.8} l={6} rotation={Math.PI / 3} />
      <Path x={4.4} z={-2.6} w={1.8} l={6} rotation={-Math.PI / 3} />
      <Path x={0} z={-5.5} w={1.8} l={5} />

      <InstancedTrees data={trees} />

      {/* lamp posts line the main alley (only the front pair cast real light) */}
      <LampPost x={-1.7} z={8.5} light />
      <LampPost x={1.7} z={8.5} light />
      <LampPost x={-1.7} z={5.0} />
      <LampPost x={1.7} z={5.0} />

      <Bench x={2.0} z={6.5} rotation={-Math.PI / 2} />
      <Bench x={-2.0} z={3.5} rotation={Math.PI / 2} />

      {/* interactive screen kiosks along the approach */}
      <Kiosk position={[1.9, 0, 4.0]} rotation={-Math.PI / 2.2} accent={BLUE} />
      <Kiosk position={[-1.9, 0, 6.5]} rotation={Math.PI / 2.2} accent={VIOLET} />

      {/* robots roll up the alley toward the plaza */}
      <Robot offset={0} speed={1} lane={-0.55} accent={BLUE} />
      <Robot offset={0.5} speed={0.85} lane={0.55} accent={VIOLET} />

      {/* projection mapping at the heart of the plaza */}
      <ProjectionMapping position={[0, 0, 0]} />

      {/* treasure hunt trail leading off into the left woods */}
      {([
        [-2.4, 0, -1.0], [-3.4, 0, -1.8], [-4.4, 0, -2.6], [-5.4, 0, -3.4], [-6.3, 0, -4.2],
      ] as [number, number, number][]).map((p, i) => (
        <TreasureMarker key={i} position={p} index={i} />
      ))}
      <TreasureChest position={[-6.8, 0, -4.6]} />

      {/* cultural corner at the end of the right alley */}
      <CulturalCorner position={[5.6, 0, -3.6]} />

      {/* atmospheric, professional lighting (cool moonlight + warm lamps) */}
      <ambientLight intensity={0.28} />
      <directionalLight position={[6, 14, 8]} intensity={0.45} color="#9fb0e6" />
      <hemisphereLight args={['#2a3a5a', '#0a1505', 0.35]} />

      <CameraRig mouse={mouse} />
    </>
  );
}

export function ParkScene3D() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 30, 0.3], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#080810']} />
        <ParkScene mouse={mouse} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080810]/5 to-[#080810] pointer-events-none" />
    </div>
  );
}
