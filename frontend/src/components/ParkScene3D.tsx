import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const BLUE = '#2D6EFF';
const VIOLET = '#7B3FE4';
const GOLD = '#FFB23E';

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

/* ---------- Camera: top-down park -> focus on alley ---------- */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  const start = useRef(0);

  useFrame((state) => {
    if (start.current === 0) start.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - start.current;
    const t = easeOutCubic(Math.min(elapsed / 5.5, 1));

    // From straight-down over the whole park -> low angle looking up the alley
    const px = THREE.MathUtils.lerp(0, 0, t) + mouse.current.x * 0.8;
    const py = THREE.MathUtils.lerp(20, 6.5, t);
    const pz = THREE.MathUtils.lerp(0.2, 11, t);
    camera.position.set(px, py, pz);

    const lookY = THREE.MathUtils.lerp(0, 0.8, t);
    const lookZ = THREE.MathUtils.lerp(0, -1.5, t);
    camera.lookAt(mouse.current.x * 0.4, lookY - mouse.current.y * 0.25, lookZ);
  });

  return null;
}

/* ---------- Ground, lawns, paths ---------- */
function Ground() {
  const groundGeo = useMemo(() => new THREE.PlaneGeometry(40, 40), []);
  return (
    <mesh geometry={groundGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <meshStandardMaterial color="#05050c" roughness={1} />
    </mesh>
  );
}

function Lawn({ x, z, r }: { x: number; z: number; r: number }) {
  const geo = useMemo(() => new THREE.CircleGeometry(r, 40), [r]);
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, z]}>
      <meshStandardMaterial color="#0a2212" roughness={1} />
    </mesh>
  );
}

function Path({ x, z, w, l, rotation = 0 }: { x: number; z: number; w: number; l: number; rotation?: number }) {
  const geo = useMemo(() => new THREE.PlaneGeometry(w, l), [w, l]);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, l)), [w, l]);
  return (
    <group position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, rotation]}>
      <mesh geometry={geo}>
        <meshStandardMaterial color="#14141f" roughness={0.9} />
      </mesh>
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

/* ---------- Trees (rounded, organic) ---------- */
function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.5, 6]} />
        <meshStandardMaterial color="#2a1a10" roughness={1} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color="#10331a" roughness={1} flatShading />
      </mesh>
      <mesh position={[0.12, 0.85, 0.08]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#0c2814" roughness={1} flatShading />
      </mesh>
    </group>
  );
}

/* ---------- Interactive screen kiosk ---------- */
function Kiosk({ position, rotation = 0, accent = BLUE }: {
  position: [number, number, number]; rotation?: number; accent?: string;
}) {
  const barsRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (barsRef.current) {
      barsRef.current.children.forEach((c: THREE.Object3D, i: number) => {
        const s = 0.35 + (Math.sin(t * 2.2 + i * 1.3) * 0.5 + 0.5) * 0.65;
        c.scale.y = s;
      });
    }
    if (screenRef.current) {
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.7 + Math.sin(t * 3) * 0.15;
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* post */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.12, 1.1, 0.12]} />
        <meshStandardMaterial color="#1a1a26" roughness={0.7} metalness={0.4} />
      </mesh>
      {/* screen panel */}
      <group position={[0, 1.35, 0]} rotation={[-0.25, 0, 0]}>
        <mesh ref={screenRef}>
          <boxGeometry args={[0.95, 0.62, 0.05]} />
          <meshStandardMaterial color="#060a1a" emissive={accent} emissiveIntensity={0.7} roughness={0.4} />
        </mesh>
        {/* glowing frame */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.95, 0.62, 0.05)]} />
          <lineBasicMaterial color={accent} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </lineSegments>
        {/* animated content bars */}
        <group ref={barsRef} position={[-0.3, -0.12, 0.04]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[i * 0.16, 0, 0]}>
              <planeGeometry args={[0.1, 0.3]} />
              <meshBasicMaterial color={i % 2 === 0 ? BLUE : VIOLET} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
            </mesh>
          ))}
        </group>
        {/* header line */}
        <mesh position={[0, 0.22, 0.04]}>
          <planeGeometry args={[0.7, 0.05]} />
          <meshBasicMaterial color={accent} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
      <pointLight color={accent} intensity={0.6} distance={3} position={[0, 1.4, 0.3]} />
    </group>
  );
}

/* ---------- Robot rover moving along the alley ---------- */
function Robot({ offset, speed = 1, lane = 0, accent = BLUE }: {
  offset: number; speed?: number; lane?: number; accent?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);
  const dir = useRef(1);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const cycle = (t * speed * 0.06 + offset) % 1;
    const z = THREE.MathUtils.lerp(6.5, -6.5, cycle);
    ref.current.position.z = z;
    ref.current.position.x = lane + Math.sin(t * 1.5 + offset * 8) * 0.06;
    ref.current.position.y = 0.28 + Math.sin(t * 7 + offset * 5) * 0.015;
    ref.current.rotation.y = Math.PI; // facing -z (travel direction)
    if (wheelsRef.current) {
      wheelsRef.current.children.forEach((w: THREE.Object3D) => {
        (w as THREE.Mesh).rotation.x = t * 6 * dir.current;
      });
    }
  });

  return (
    <group ref={ref}>
      {/* body */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.28, 0.7]} />
        <meshStandardMaterial color="#d4d6e0" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* head */}
      <mesh position={[0, 0.27, -0.15]}>
        <boxGeometry args={[0.34, 0.2, 0.28]} />
        <meshStandardMaterial color="#e8eaf2" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* eye / sensor */}
      <mesh position={[0, 0.28, -0.3]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} />
      </mesh>
      {/* antenna */}
      <mesh position={[0.12, 0.45, -0.05]}>
        <cylinderGeometry args={[0.012, 0.012, 0.22, 6]} />
        <meshStandardMaterial color="#888" metalness={0.6} />
      </mesh>
      <mesh position={[0.12, 0.57, -0.05]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={2} />
      </mesh>
      {/* wheels */}
      <group ref={wheelsRef}>
        {[[-0.27, -0.2], [0.27, -0.2], [-0.27, 0.2], [0.27, 0.2]].map(([wx, wz], i) => (
          <mesh key={i} position={[wx, -0.08, wz]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
            <meshStandardMaterial color="#15151f" roughness={0.8} />
          </mesh>
        ))}
      </group>
      <pointLight color={accent} intensity={0.4} distance={1.5} position={[0, 0.3, -0.3]} />
    </group>
  );
}

/* ---------- Projection mapping: projector + light cone + animated plaza ---------- */
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
      const mix = Math.sin(t * 0.8) * 0.5 + 0.5;
      tmp.copy(c1).lerp(c2, mix);
      const mat = targetRef.current.material as THREE.MeshBasicMaterial;
      mat.color.copy(tmp);
      mat.opacity = 0.35 + Math.sin(t * 1.5) * 0.15;
    }
    if (coneRef.current) {
      (coneRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(t * 2) * 0.04;
    }
    if (ringARef.current) ringARef.current.rotation.z = t * 0.4;
    if (ringBRef.current) ringBRef.current.rotation.z = -t * 0.3;
  });

  const [px, , pz] = position;
  const projH = 2.6;

  return (
    <group position={position}>
      {/* projector pole */}
      <mesh position={[1.6, 1.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2.4, 8]} />
        <meshStandardMaterial color="#1a1a26" metalness={0.5} roughness={0.6} />
      </mesh>
      {/* projector head */}
      <mesh position={[1.3, projH, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.4, 0.25, 0.3]} />
        <meshStandardMaterial color="#22222e" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* lens glow */}
      <mesh position={[1.05, projH - 0.13, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={BLUE} />
      </mesh>
      {/* light cone from projector toward plaza */}
      <mesh ref={coneRef} position={[0.4, projH / 2 + 0.1, 0]} rotation={[0, 0, Math.PI + 0.35]}>
        <coneGeometry args={[1.4, projH + 0.4, 24, 1, true]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.12} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* projected plaza target */}
      <mesh ref={targetRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[1.7, 48]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* concentric projected pattern rings */}
      <mesh ref={ringARef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[1.0, 1.08, 6]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.5} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringBRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
        <ringGeometry args={[0.5, 0.56, 3]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color={BLUE} intensity={1.2} distance={5} position={[0, 1.2, 0]} />
    </group>
  );
}

/* ---------- Treasure hunt: glowing trail markers + chest with beacon ---------- */
function TreasureMarker({ position, index }: { position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const phase = (t * 1.2 - index * 0.35) % 3;
    const lit = phase > 0 && phase < 0.6;
    ref.current.position.y = position[1] + 0.12 + Math.sin(t * 2 + index) * 0.04;
    ref.current.rotation.y = t * 1.5;
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = lit ? 3 : 1;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.5} metalness={0.6} roughness={0.3} />
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
      (beaconRef.current.material as THREE.MeshBasicMaterial).opacity = 0.25 + Math.sin(t * 2) * 0.12;
    }
    if (ringRef.current) {
      const s = 1 + ((t * 0.6) % 1) * 2;
      ringRef.current.scale.setScalar(s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - ((t * 0.6) % 1) * 0.6);
    }
    if (lidRef.current) {
      lidRef.current.rotation.x = -0.3 - Math.sin(t * 1.2) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* chest base */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.36]} />
        <meshStandardMaterial color="#5a3a1a" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* gold trim */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.52, 0.06, 0.38]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* lid */}
      <group ref={lidRef} position={[0, 0.3, -0.18]}>
        <mesh position={[0, 0.06, 0.18]}>
          <boxGeometry args={[0.5, 0.14, 0.36]} />
          <meshStandardMaterial color="#6a4520" roughness={0.7} metalness={0.3} />
        </mesh>
      </group>
      {/* glowing gold treasure inside */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={2.5} />
      </mesh>
      {/* beacon beam */}
      <mesh ref={beaconRef} position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.08, 0.16, 4, 16, 1, true]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.3} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* ground pulse ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.3, 0.36, 32]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.5} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color={GOLD} intensity={1.5} distance={4} position={[0, 0.6, 0]} />
    </group>
  );
}

/* ---------- Cultural corner: stage + art panels + rotating sculpture ---------- */
function CulturalCorner({ position }: { position: [number, number, number] }) {
  const sculptureRef = useRef<THREE.Mesh>(null);
  const spotRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sculptureRef.current) {
      sculptureRef.current.rotation.y = t * 0.4;
      sculptureRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  useEffect(() => {
    if (spotRef.current && targetRef.current) {
      spotRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <group position={position}>
      {/* raised stage */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.16, 32]} />
        <meshStandardMaterial color="#16121f" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.5, 48]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* rotating sculpture (art installation) */}
      <mesh ref={sculptureRef} position={[0, 0.95, 0]}>
        <torusKnotGeometry args={[0.3, 0.1, 80, 12]} />
        <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.7} metalness={0.7} roughness={0.25} />
      </mesh>
      <object3D ref={targetRef} position={[0, 0.9, 0]} />

      {/* framed art panels around the corner */}
      {[
        { x: -1.3, z: -0.6, ry: 0.6, c: BLUE },
        { x: 1.3, z: -0.6, ry: -0.6, c: VIOLET },
        { x: 0, z: -1.4, ry: 0, c: GOLD },
      ].map((p, i) => (
        <group key={i} position={[p.x, 0.9, p.z]} rotation={[0, p.ry, 0]}>
          <mesh>
            <boxGeometry args={[0.62, 0.82, 0.05]} />
            <meshStandardMaterial color="#0a0a14" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.5, 0.7]} />
            <meshStandardMaterial color={p.c} emissive={p.c} emissiveIntensity={0.5} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.62, 0.82, 0.05)]} />
            <lineBasicMaterial color={p.c} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
          </lineSegments>
          {/* post */}
          <mesh position={[0, -0.85, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.9, 6]} />
            <meshStandardMaterial color="#1a1a26" metalness={0.4} />
          </mesh>
        </group>
      ))}

      <spotLight
        ref={spotRef}
        position={[0, 3.2, 0.5]}
        angle={0.6}
        penumbra={0.5}
        intensity={3}
        distance={8}
        color={VIOLET}
      />
      <pointLight color={VIOLET} intensity={0.8} distance={4} position={[0, 1.2, 0]} />
    </group>
  );
}

function Bench({ x, z, rotation = 0 }: { x: number; z: number; rotation?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.18]} />
        <meshStandardMaterial color="#241a12" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.24, -0.08]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.04]} />
        <meshStandardMaterial color="#241a12" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ---------- Scene assembly ---------- */
function ParkScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const trees = useMemo(
    () => [
      { x: -3.0, z: 4.5, s: 1.1 }, { x: -3.6, z: 2.5, s: 0.9 }, { x: -3.2, z: 0.5, s: 1.0 },
      { x: 3.2, z: 4.0, s: 1.0 }, { x: 3.8, z: 1.5, s: 1.2 }, { x: 2.6, z: 6.0, s: 0.85 },
      { x: -2.4, z: 6.2, s: 1.0 }, { x: 4.0, z: -3.0, s: 0.9 }, { x: -4.2, z: -1.5, s: 1.0 },
      { x: 2.2, z: -5.5, s: 1.1 }, { x: -2.0, z: -6.0, s: 0.9 },
    ],
    []
  );

  // treasure trail markers winding from alley to chest
  const trailPts = useMemo<[number, number, number][]>(
    () => [
      [-1.0, 0, 3.0], [-1.8, 0, 2.2], [-2.4, 0, 1.2], [-2.8, 0, 0.0],
      [-3.2, 0, -1.2], [-3.6, 0, -2.4], [-4.0, 0, -3.4],
    ],
    []
  );

  return (
    <>
      <fog attach="fog" args={['#080810', 12, 30]} />
      <Ground />

      {/* lawns */}
      <Lawn x={-2.8} z={3.0} r={2.6} />
      <Lawn x={3.0} z={3.0} r={2.4} />
      <Lawn x={3.2} z={-3.0} r={2.2} />
      <Lawn x={-3.2} z={-3.2} r={2.4} />

      {/* main alley (runs along Z) */}
      <Path x={0} z={0} w={2.4} l={14} />
      {/* branch paths */}
      <Path x={-2.6} z={-2.4} w={1.4} l={5} rotation={Math.PI / 3.2} />
      <Path x={3.0} z={-1.0} w={1.4} l={4} rotation={-Math.PI / 2.5} />

      {trees.map((t, i) => (
        <Tree key={i} x={t.x} z={t.z} scale={t.s} />
      ))}

      <Bench x={1.5} z={2.5} rotation={-Math.PI / 2} />
      <Bench x={-1.5} z={-1.0} rotation={Math.PI / 2} />
      <Bench x={1.5} z={-3.5} rotation={-Math.PI / 2} />

      {/* interactive screen kiosks along the alley */}
      <Kiosk position={[1.7, 0, 2.0]} rotation={-Math.PI / 2.4} accent={BLUE} />
      <Kiosk position={[-1.7, 0, -1.5]} rotation={Math.PI / 2.4} accent={VIOLET} />

      {/* robots rolling down the alley */}
      <Robot offset={0} speed={1} lane={-0.5} accent={BLUE} />
      <Robot offset={0.55} speed={0.8} lane={0.5} accent={VIOLET} />

      {/* projection mapping on the right plaza */}
      <ProjectionMapping position={[3.2, 0, 3.0]} />

      {/* treasure hunt trail + chest */}
      {trailPts.map((p, i) => (
        <TreasureMarker key={i} position={p} index={i} />
      ))}
      <TreasureChest position={[-4.2, 0, -3.6]} />

      {/* cultural corner */}
      <CulturalCorner position={[3.4, 0, -3.4]} />

      {/* global lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 12, 6]} intensity={0.5} color="#aab4ff" />
      <hemisphereLight args={['#3a4a6a', '#0a1505', 0.4]} />

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
        camera={{ position: [0, 20, 0.2], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#080810']} />
        <ParkScene mouse={mouse} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080810]/5 to-[#080810] pointer-events-none" />
    </div>
  );
}
