import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/* ─── HexNode Diagram ── */
function HexNodeDiagram({ isDark }: { isDark: boolean }) {
  const cx = 200, cy = 160, r = 80, nodeR = 10;
  const angles = Array.from({ length: 6 }, (_, i) => (i * 60 * Math.PI) / 180);
  const ringNodes = angles.map(a => ({ x: cx + r * Math.cos(a - Math.PI/2), y: cy + r * Math.sin(a - Math.PI/2) }));
  const edges: [number, number][] = [[-1,0],[-1,1],[-1,2],[-1,3],[-1,4],[-1,5],[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]];
  const getXY = (i: number) => i === -1 ? { x: cx, y: cy } : ringNodes[i];
  const stroke1 = isDark ? '#00E5FF' : '#00BCD4';
  const stroke2 = isDark ? '#1E7BC4' : '#1565C0';

  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="hexGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={stroke1} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke1} stopOpacity="0" />
        </radialGradient>
        <filter id="hexNodeGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="hexEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={stroke1} />
          <stop offset="100%" stopColor={stroke2} />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={130} fill="url(#hexGlow)" />
      {edges.map(([a, b], i) => {
        const p1 = getXY(a), p2 = getXY(b);
        const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        return (
          <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="url(#hexEdge)" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray={len} strokeDashoffset={len}>
            <animate attributeName="stroke-dashoffset" from={len} to={0} dur="1s" begin={`${0.2 + i * 0.1}s`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
          </line>
        );
      })}
      {ringNodes.map((n, i) => (
        <g key={i} filter="url(#hexNodeGlow)">
          <circle cx={n.x} cy={n.y} r={nodeR + 4} fill={stroke1} fillOpacity="0.10">
            <animate attributeName="r" values={`${nodeR+4};${nodeR+8};${nodeR+4}`} dur="3.5s" begin={`${i*0.4}s`} repeatCount="indefinite"/>
          </circle>
          <circle cx={n.x} cy={n.y} r={nodeR} fill={isDark ? '#111827' : '#ffffff'} stroke={stroke1} strokeWidth="1.5">
            <animate attributeName="opacity" from={0} to={1} dur="0.35s" begin={`${0.25 + i*0.1}s`} fill="freeze"/>
          </circle>
          <circle cx={n.x} cy={n.y} r={3} fill={stroke1}>
            <animate attributeName="opacity" from={0} to={1} dur="0.3s" begin={`${0.5 + i*0.1}s`} fill="freeze"/>
          </circle>
        </g>
      ))}
      <g filter="url(#hexNodeGlow)">
        <circle cx={cx} cy={cy} r={22} fill={stroke1} fillOpacity="0.12">
          <animate attributeName="r" values="22;30;22" dur="2.8s" repeatCount="indefinite"/>
          <animate attributeName="fill-opacity" values="0.12;0.24;0.12" dur="2.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx={cx} cy={cy} r={13} fill={isDark ? '#111827' : '#ffffff'} stroke={stroke1} strokeWidth="1.8"/>
        <circle cx={cx} cy={cy} r={5} fill={stroke1}/>
      </g>
      {(['AI','ML','DB','K8S','CDN','API'] as const).map((label, i) => {
        const n = ringNodes[i];
        const offset = 22;
        const ax = angles[i] - Math.PI / 2;
        return (
          <text key={label} x={n.x + offset*Math.cos(ax)} y={n.y + offset*Math.sin(ax)} textAnchor="middle" dominantBaseline="middle" fill={isDark ? '#94A3B8' : '#64748B'} fontSize="10" fontFamily="'Space Grotesk', sans-serif" opacity="0">
            {label}
            <animate attributeName="opacity" from={0} to={0.75} dur="0.4s" begin={`${0.8 + i*0.1}s`} fill="freeze"/>
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Pipeline Diagram ── */
function PipelineDiagram({ isDark }: { isDark: boolean }) {
  const stages = [{ label: 'CODE', x: 50 }, { label: 'BUILD', x: 160 }, { label: 'TEST', x: 270 }, { label: 'DEPLOY', x: 380 }];
  const y = 100;
  const boxW = 70, boxH = 34;
  const c1 = isDark ? '#1E7BC4' : '#1565C0';
  const c2 = isDark ? '#00E5FF' : '#00BCD4';

  return (
    <svg viewBox="0 0 440 200" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c1} /><stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id="pipeGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="pipeClip"><rect x="50" y={y-4} width="400" height="8"/></clipPath>
      </defs>
      <line x1="85" y1={y} x2="355" y2={y} stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)'} strokeWidth="6" strokeLinecap="round"/>
      <line x1="85" y1={y} x2="355" y2={y} stroke="url(#pipeGrad)" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite"/>
      </line>
      {stages.map((s, i) => (
        <g key={s.label} opacity="0">
          <animate attributeName="opacity" from={0} to={1} dur="0.4s" begin={`${0.15 + i*0.2}s`} fill="freeze"/>
          <rect x={s.x} y={y-boxH/2} width={boxW} height={boxH} rx="8" fill={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.04)'} stroke={i === 3 ? c2 : isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)'} strokeWidth="1"/>
          <rect x={s.x} y={y-boxH/2} width={boxW} height={2} rx="1" fill={i === 3 ? c2 : i === 0 ? c1 : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.15)'}/>
          <text x={s.x+boxW/2} y={y+1} textAnchor="middle" dominantBaseline="middle" fill={i === 3 ? c2 : isDark ? '#94A3B8' : '#64748B'} fontSize="9" fontFamily="'Space Grotesk', sans-serif" letterSpacing="1">{s.label}</text>
          {i < 3 && <text x={s.x+boxW-12} y={y-boxH/2+12} fill="#10B981" fontSize="9" fontFamily="sans-serif">✓</text>}
        </g>
      ))}
      <circle r="5" fill={c2} filter="url(#pipeGlow)" clipPath="url(#pipeClip)">
        <animateMotion dur="2.6s" repeatCount="indefinite" path={`M 85 ${y} L 355 ${y}`} calcMode="spline" keySplines="0.4 0 0.6 1"/>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.92;1" dur="2.6s" repeatCount="indefinite"/>
      </circle>
      <circle r="3.5" fill={c1} filter="url(#pipeGlow)" clipPath="url(#pipeClip)">
        <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path={`M 85 ${y} L 355 ${y}`} calcMode="spline" keySplines="0.4 0 0.6 1"/>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.92;1" dur="2.6s" begin="1.3s" repeatCount="indefinite"/>
      </circle>
      <text x="220" y="160" textAnchor="middle" fill={isDark ? '#94A3B8' : '#64748B'} fontSize="10" fontFamily="'Space Grotesk', sans-serif">avg. pipeline</text>
      <text x="220" y="178" textAnchor="middle" fill={c2} fontSize="13" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">4 min 22 sec</text>
    </svg>
  );
}

/* ─── Main ── */
export default function AboutSection() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  void bgY;

  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.07)';
  const cardBg = isDark ? 'rgba(17,24,39,0.65)' : 'rgba(255,255,255,0.80)';
  const gridLine = isDark ? 'rgba(255,255,255,0.018)' : 'rgba(15,23,42,0.04)';

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <div className="px-6 md:px-12">
        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-24 pb-12 flex justify-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.12em] font-semibold"
            style={{
              background: isDark ? 'rgba(0,188,212,0.07)' : 'rgba(0,184,207,0.06)',
              border: `1px solid ${isDark ? 'rgba(0,188,212,0.22)' : 'rgba(0,184,207,0.22)'}`,
              color: isDark ? '#00BCD4' : '#00BCD4',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.12em',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: isDark ? '#00BCD4' : '#00BCD4', boxShadow: `0 0 6px ${isDark ? '#00BCD4' : '#00BCD4'}` }} />
            WHY INTELLINATIVE
          </div>
        </motion.div>

        {/* Block 1 — Architecture meets Intelligence */}
        <div className="grid md:grid-cols-2 gap-14 items-center pb-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h2
              className="leading-tight"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.025em',
              }}
            >
              Architecture meets
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg, ${isDark ? '#00BCD4' : '#00BCD4'} 0%, ${isDark ? '#1E7BC4' : '#1E7BC4'} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Intelligence.
              </span>
            </h2>
            <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
              AI-driven insights transform complex systems into infrastructure that thinks ahead —
              predicting failure before it happens and scaling before demand arrives.
            </p>
            <div className="w-14 h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, ${isDark ? '#00BCD4' : '#00BCD4'}, transparent)` }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ height: 300 }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                backdropFilter: 'blur(16px)',
                boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(15,23,42,0.06)',
              }}
            />
            <HexNodeDiagram isDark={isDark} />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-16" style={{ background: borderColor }} />

        {/* Block 2 — 3× faster */}
        <div className="grid md:grid-cols-2 gap-14 items-center pb-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 md:order-1"
            style={{ height: 260 }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                backdropFilter: 'blur(16px)',
                boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(15,23,42,0.06)',
              }}
            />
            <PipelineDiagram isDark={isDark} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 order-1 md:order-2"
          >
            <div className="flex items-end gap-4">
              <span
                style={{
                  fontSize: 'clamp(60px, 9vw, 88px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  fontFamily: 'var(--font-display)',
                  background: 'linear-gradient(135deg, #1E7BC4 0%, #00E5FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.04em',
                }}
              >
                3×
              </span>
              <span
                style={{
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  marginBottom: '6px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                faster deployment
                <br />velocity
              </span>
            </div>
            <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
              From design to production in weeks, not months. Enterprise-grade without
              enterprise-grade delays — our platform accelerator removes friction at every stage.
            </p>
            <div className="w-14 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #1E7BC4, transparent)' }} />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-16" style={{ background: borderColor }} />

        {/* Block 3 — cinematic statement */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative pb-24 text-center"
        >
          <div
            className="pointer-events-none absolute inset-0 -top-24 -bottom-24"
            style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,188,212,0.09) 0%, rgba(30,123,196,0.05) 45%, transparent 70%)' }}
          />
          <p
            className="relative font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(32px, 6vw, 68px)',
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            Where infrastructure
            <br />becomes{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #1E7BC4 0%, #00E5FF 50%, #00BCD4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              autonomous.
            </span>
          </p>
          <p
            className="relative text-sm tracking-[0.2em] uppercase"
            style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-display)' }}
          >
            Built for intelligent scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
