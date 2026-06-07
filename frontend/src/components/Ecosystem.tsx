import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { useState } from 'react';

const NODE_POSITIONS = [
  { id: 'lab', x: 50, y: 50 },
  { id: 'eu', x: 82, y: 20 },
  { id: 'partners', x: 18, y: 20 },
  { id: 'ai', x: 82, y: 80 },
  { id: 'city', x: 50, y: 88 },
];

const EDGES = [
  ['lab', 'eu'],
  ['lab', 'partners'],
  ['lab', 'ai'],
  ['partners', 'eu'],
  ['eu', 'ai'],
  ['ai', 'city'],
  ['partners', 'city'],
];

export function Ecosystem() {
  const { t } = useLanguage();
  const eco = t.ecosystem;
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodeMap = Object.fromEntries(NODE_POSITIONS.map((n) => [n.id, n]));
  const nodeData = Object.fromEntries(eco.nodes.map((n) => [n.id, n]));

  const W = 500;
  const H = 340;

  const toSvg = (pct: { x: number; y: number }) => ({
    x: (pct.x / 100) * W,
    y: (pct.y / 100) * H,
  });

  return (
    <section id="ecosystem" className="py-24 md:py-36 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(45,110,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold text-[#E8E8F0] tracking-tight mb-16 text-center"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {eco.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full"
        >
          <div
            className="rounded-2xl p-6 md:p-10 relative overflow-hidden"
            style={{ background: 'rgba(8,8,16,0.7)', border: '1px solid rgba(232,232,240,0.07)' }}
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ maxHeight: '380px' }}
            >
              {EDGES.map(([a, b]) => {
                const pa = toSvg(nodeMap[a]);
                const pb = toSvg(nodeMap[b]);
                const isActive = activeNode === a || activeNode === b;
                return (
                  <g key={`${a}-${b}`}>
                    <line
                      x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                      stroke={isActive ? '#2D6EFF' : 'rgba(232,232,240,0.08)'}
                      strokeWidth={isActive ? 1.5 : 1}
                      strokeDasharray={isActive ? '0' : '4 6'}
                      style={{ transition: 'all 0.3s' }}
                    />
                    {isActive && (
                      <motion.circle
                        cx={pa.x}
                        cy={pa.y}
                        r={3}
                        fill="#2D6EFF"
                        initial={{ cx: pa.x, cy: pa.y, opacity: 1 }}
                        animate={{ cx: pb.x, cy: pb.y, opacity: [1, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </g>
                );
              })}

              {NODE_POSITIONS.map((node) => {
                const pos = toSvg(node);
                const data = nodeData[node.id];
                const isActive = activeNode === node.id;
                const isCenter = node.id === 'lab';

                return (
                  <g
                    key={node.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <circle
                      r={isCenter ? 22 : 16}
                      fill={isActive ? 'rgba(45,110,255,0.25)' : 'rgba(8,8,16,0.8)'}
                      stroke={isActive ? '#2D6EFF' : isCenter ? 'rgba(123,63,228,0.6)' : 'rgba(232,232,240,0.12)'}
                      strokeWidth={isActive ? 2 : 1.5}
                      style={{ transition: 'all 0.3s' }}
                    />
                    {isActive && (
                      <motion.circle
                        r={isCenter ? 28 : 22}
                        fill="none"
                        stroke="#2D6EFF"
                        strokeWidth={1}
                        opacity={0.3}
                        initial={{ r: isCenter ? 22 : 16, opacity: 0.4 }}
                        animate={{ r: isCenter ? 34 : 26, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? '#E8E8F0' : 'rgba(232,232,240,0.5)'}
                      fontSize={isCenter ? 7 : 6}
                      fontFamily="'DM Sans', sans-serif"
                      fontWeight={isCenter ? '600' : '400'}
                      style={{ transition: 'fill 0.3s', pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {data?.label.split(' ').slice(0, 2).join(' ')}
                    </text>
                  </g>
                );
              })}
            </svg>

            {activeNode && nodeData[activeNode] && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 mx-auto max-w-md text-center"
              >
                <p className="text-[#E8E8F0]/80 text-sm leading-relaxed">
                  <span className="font-semibold text-[#2D6EFF]">{nodeData[activeNode].label}: </span>
                  {nodeData[activeNode].tooltip}
                </p>
              </motion.div>
            )}
            {!activeNode && (
              <p className="mt-4 text-center text-[#E8E8F0]/20 text-xs">
                hover nodes to explore
              </p>
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mt-10 text-center text-xl md:text-2xl font-bold text-[#E8E8F0]"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {eco.bottomLine}
        </motion.p>
      </div>
    </section>
  );
}
