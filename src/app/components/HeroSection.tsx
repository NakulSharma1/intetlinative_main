import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

// ─── Neural Network Canvas ────────────────────────────────────────────────────

interface CanvasNode {
  x: number; y: number; baseX: number; baseY: number;
  radius: number; baseRadius: number;
  color: string; glowColor: string;
  pulsePhase: number; pulseSpeed: number;
  vx: number; vy: number; connections: number[];
}

interface Packet {
  fromNode: number; toNode: number; progress: number; speed: number; color: string;
}

function NeuralCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0;
    let nodes: CanvasNode[] = [];
    let packets: Packet[] = [];

    function getColors() {
      return isDarkRef.current
        ? { primary: '#00E5FF', secondary: '#1E7BC4', tertiary: '#00BCD4',
            priRgb: '0,229,255', secRgb: '30,123,196', terRgb: '0,188,212' }
        : { primary: '#7C3AED', secondary: '#4F46E5', tertiary: '#9333EA',
            priRgb: '124,58,237', secRgb: '79,70,229', terRgb: '147,51,234' };
    }

    function resize() {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = width; canvas.height = height;
      init();
    }

    function init() {
      const c = getColors();
      nodes = []; packets = [];
      const colorList = [c.primary, c.secondary, c.tertiary];
      const glowList = [`rgba(${c.priRgb},`, `rgba(${c.secRgb},`, `rgba(${c.terRgb},`];
      for (let i = 0; i < 48; i++) {
        const ci = Math.floor(Math.random() * 3);
        const bx = Math.random() * width;
        const by = Math.random() * height;
        nodes.push({
          x: bx, y: by, baseX: bx, baseY: by,
          radius: 1.2 + Math.random() * 3,
          baseRadius: 1.2 + Math.random() * 3,
          color: colorList[ci], glowColor: glowList[ci],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.022,
          vx: (Math.random() - 0.5) * 0.09,
          vy: (Math.random() - 0.5) * 0.09,
          connections: [],
        });
      }
      for (let i = 0; i < nodes.length; i++) {
        const dists = nodes.map((n, j) => {
          if (i === j) return { idx: j, d: Infinity };
          const dx = nodes[i].baseX - n.baseX, dy = nodes[i].baseY - n.baseY;
          return { idx: j, d: Math.sqrt(dx*dx+dy*dy) };
        }).sort((a,b) => a.d-b.d);
        nodes[i].connections = dists.slice(0, 2 + Math.floor(Math.random()*2)).map(d=>d.idx);
      }
      for (let p = 0; p < 14; p++) spawnPacket();
    }

    function spawnPacket() {
      const c = getColors();
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const node = nodes[fromIdx];
      if (!node.connections.length) return;
      const toIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
      const colorList = [c.primary, c.secondary, c.tertiary];
      packets.push({ fromNode: fromIdx, toNode: toIdx, progress: 0,
        speed: 0.003 + Math.random() * 0.006,
        color: colorList[Math.floor(Math.random()*3)] });
    }

    let t = 0;

    function tick() {
      t += 0.014;
      const dark = isDarkRef.current;
      ctx.clearRect(0, 0, width, height);

      const mx = (mouseRef.current.x / window.innerWidth - 0.5) * 14;
      const my = (mouseRef.current.y / window.innerHeight - 0.5) * 9;
      const c = getColors();

      // Central ambient orb
      const cx = width * 0.5 + mx * 0.1;
      const cy = height * 0.5 + my * 0.08;
      const R = Math.min(width, height) * 0.32;
      const orb = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      orb.addColorStop(0, dark ? `rgba(${c.priRgb},0.06)` : `rgba(${c.priRgb},0.04)`);
      orb.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2);
      ctx.fillStyle = orb; ctx.fill();

      // Orbit ring
      const ang = t * 0.18;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang); ctx.scale(1, 0.25);
      ctx.beginPath(); ctx.arc(0, 0, R*1.1, 0, Math.PI*2);
      ctx.strokeStyle = dark ? `rgba(${c.secRgb},0.18)` : `rgba(${c.secRgb},0.12)`;
      ctx.lineWidth = 1; ctx.stroke(); ctx.restore();

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.baseX += n.vx; n.baseY += n.vy;
        if (n.baseX < -20) n.baseX = width+20;
        if (n.baseX > width+20) n.baseX = -20;
        if (n.baseY < -20) n.baseY = height+20;
        if (n.baseY > height+20) n.baseY = -20;
        n.x = n.baseX + mx * (n.baseRadius / 8);
        n.y = n.baseY + my * (n.baseRadius / 8);
        n.pulsePhase += n.pulseSpeed;
        n.radius = n.baseRadius + Math.sin(n.pulsePhase) * n.baseRadius * 0.35;
      }

      // Edges
      const drawn = new Set<string>();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (const j of n.connections) {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (drawn.has(key)) continue;
          drawn.add(key);
          const m = nodes[j];
          const dx = n.x-m.x, dy = n.y-m.y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          const base = dark ? 0.18 : 0.10;
          const alpha = Math.max(0, base - dist/1400);
          if (alpha <= 0) continue;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
          const rgb = n.color === c.primary ? c.priRgb : n.color === c.secondary ? c.secRgb : c.terRgb;
          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }

      // Node dots
      for (const n of nodes) {
        const rgb = n.color === c.primary ? c.priRgb : n.color === c.secondary ? c.secRgb : c.terRgb;
        const glowR = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius*4);
        glowR.addColorStop(0, n.glowColor + (dark ? '0.5)' : '0.3)'));
        glowR.addColorStop(1, n.glowColor + '0)');
        ctx.beginPath(); ctx.arc(n.x, n.y, n.radius*4, 0, Math.PI*2);
        ctx.fillStyle = glowR; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.radius, 0, Math.PI*2);
        ctx.fillStyle = n.color; ctx.fill();
      }

      // Packets
      const dead: number[] = [];
      for (let p = 0; p < packets.length; p++) {
        const pk = packets[p];
        pk.progress += pk.speed;
        if (pk.progress >= 1) { dead.push(p); spawnPacket(); continue; }
        const from = nodes[pk.fromNode], to = nodes[pk.toNode];
        const px2 = from.x + (to.x - from.x) * pk.progress;
        const py2 = from.y + (to.y - from.y) * pk.progress;
        ctx.beginPath(); ctx.arc(px2, py2, 2, 0, Math.PI*2);
        ctx.fillStyle = pk.color; ctx.fill();
        const trail = Math.max(0, pk.progress - 0.06);
        const tx2 = from.x + (to.x - from.x) * trail;
        const ty2 = from.y + (to.y - from.y) * trail;
        const tg = ctx.createLinearGradient(tx2, ty2, px2, py2);
        const rgb = pk.color === c.primary ? c.priRgb : pk.color === c.secondary ? c.secRgb : c.terRgb;
        tg.addColorStop(0, `rgba(${rgb},0)`);
        tg.addColorStop(1, `rgba(${rgb},0.45)`);
        ctx.beginPath(); ctx.moveTo(tx2, ty2); ctx.lineTo(px2, py2);
        ctx.strokeStyle = tg; ctx.lineWidth = 1.2; ctx.stroke();
      }
      for (let d = dead.length-1; d >= 0; d--) packets.splice(dead[d], 1);
      rafRef.current = requestAnimationFrame(tick);
    }

    resize();
    rafRef.current = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouse);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); window.removeEventListener('mousemove', onMouse); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PARTNERS = [
  { name: 'AWS', color: '#F59E0B' },
  { name: 'Google Cloud', color: '#10B981' },
  { name: 'CNCF', color: '#00BCD4' },
  { name: 'HashiCorp', color: '#1E7BC4' },
];

const TECH_TICKER = [
  'Kubernetes', 'Istio', 'Cilium', 'eBPF', 'Prometheus', 'OpenTelemetry',
  'Terraform', 'ArgoCD', 'HashiCorp Vault', 'Falco', 'OPA', 'Crossplane',
  'Grafana', 'Loki', 'Jaeger', 'Helm', 'Kyverno', 'FluxCD',
];

// ─── Floating Metric Card ─────────────────────────────────────────────────────

interface MetricCardProps {
  top?: string; bottom?: string; left?: string; right?: string;
  color: string; colorRgb: string; delay: number;
  label: string; value: string; sub: string; live?: boolean;
  bars?: number[];
}

function MetricCard({ top, bottom, left, right, color, colorRgb, delay, label, value, sub, live, bars }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute', top, bottom, left, right, zIndex: 20,
        background: 'var(--glass-bg)',
        border: `1px solid rgba(${colorRgb},0.22)`,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '14px 18px',
        minWidth: '188px',
        boxShadow: `0 0 32px rgba(${colorRgb},0.12), 0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)`,
        animation: 'heroFloat 4.5s ease-in-out infinite',
        animationDelay: `${delay * 0.5}s`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, display: 'inline-block', animation: live ? 'glow-pulse 1.6s ease-in-out infinite' : 'none' }} />
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>
          {label}
        </span>
        {live && <span style={{ fontSize: '0.58rem', color, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>LIVE</span>}
      </div>
      <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: '3px' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.68rem', color: `rgba(${colorRgb},0.7)`, fontFamily: 'var(--font-body)' }}>
        {sub}
      </div>
      {bars && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '20px', marginTop: '10px' }}>
          {bars.map((v, i) => (
            <div key={i} style={{ flex: 1, height: `${v}%`, borderRadius: '2px', background: `rgba(${colorRgb},${0.2 + (i / bars.length) * 0.6})` }} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Animation variants ────────────────────────────────────────────────────────

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { isDark } = useTheme();

  return (
    <>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes blobA {
          0%, 100% { transform: translate(0,0) scale(1); }
          35% { transform: translate(45px,-30px) scale(1.06); }
          70% { transform: translate(-20px,18px) scale(0.96); }
        }
        @keyframes blobB {
          0%, 100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(-35px,42px) scale(1.08); }
          75% { transform: translate(24px,-14px) scale(0.94); }
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      <section
        className="relative flex flex-col overflow-hidden md:min-h-screen"
        style={{ background: 'var(--bg-primary)' }}
      >
        {/* ── Ambient glow blobs ── */}
        <div style={{
          position: 'absolute', top: '-18%', right: '5%',
          width: '700px', height: '700px', borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(0,229,255,0.09) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 65%)',
          animation: 'blobA 12s ease-in-out infinite',
          pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '-8%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(30,123,196,0.08) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 65%)',
          animation: 'blobB 15s ease-in-out infinite',
          pointerEvents: 'none', zIndex: 0, filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '8%', right: '20%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(0,188,212,0.07) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 65%)',
          animation: 'blobA 18s ease-in-out infinite reverse',
          pointerEvents: 'none', zIndex: 0, filter: 'blur(60px)',
        }} />

        {/* ── Dot grid texture ── */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          opacity: isDark ? 0.025 : 0.06,
          backgroundImage: `radial-gradient(circle, ${isDark ? '#00BCD4' : '#7C3AED'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />

        {/* ── Neural canvas (desktop) ── */}
        <div className="hidden md:block absolute inset-0 z-[1] overflow-hidden" style={{ pointerEvents: 'none' }}>
          <NeuralCanvas isDark={isDark} />
        </div>
        {/* Fade canvas edges for text legibility */}
        <div className="hidden md:block absolute inset-0 z-[2] pointer-events-none"
          style={{ background: `linear-gradient(to right, var(--bg-primary) 38%, transparent 75%)` }}
        />
        <div className="hidden md:block absolute inset-0 z-[2] pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent 60%, var(--bg-primary) 100%)` }}
        />

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-1 flex-col md:flex-row md:min-h-[calc(100vh-56px)]">

          {/* LEFT column */}
          <div className="relative flex items-center w-full md:w-[52%] px-6 pt-12 pb-14 md:pl-16 md:pr-8 md:py-28">
            <motion.div variants={container} initial="hidden" animate="show" className="max-w-[560px] w-full">

              {/* Live badge */}
              <motion.div variants={item} className="mb-8">
                <span
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: isDark ? 'rgba(0,229,255,0.07)' : 'rgba(79,70,229,0.07)',
                    border: `1px solid ${isDark ? 'rgba(0,229,255,0.22)' : 'rgba(79,70,229,0.25)'}`,
                    color: isDark ? '#00E5FF' : '#4F46E5',
                    fontFamily: 'var(--font-body)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span
                    style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 8px rgba(16,185,129,0.7)',
                      display: 'inline-block',
                      animation: 'glow-pulse 2s ease-in-out infinite',
                    }}
                  />
                  AI-Native Platform Engineering
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={item}
                className="mb-7"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
              >
                <span
                  className="block"
                  style={{
                    fontSize: 'clamp(42px, 9vw, 96px)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.0,
                  }}
                >
                  Engineering
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: 'clamp(42px, 9vw, 96px)',
                    fontWeight: 700,
                    lineHeight: 1.0,
                    background: isDark
                      ? 'linear-gradient(130deg, #00E5FF 0%, #00BCD4 45%, #1E7BC4 100%)'
                      : 'linear-gradient(130deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmerText 7s linear infinite',
                  }}
                >
                  Intelligence.
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: 'clamp(28px, 6vw, 66px)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: 'var(--text-muted)',
                    letterSpacing: '-0.01em',
                    marginTop: '4px',
                  }}
                >
                  Built Native.
                </span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                variants={item}
                className="mb-8"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  fontFamily: 'var(--font-body)',
                  maxWidth: '440px',
                }}
              >
                Cloud-native platforms, AI-driven operations, and enterprise
                infrastructure designed to scale without limits.
              </motion.p>

              {/* Partner chips */}
              <motion.div variants={item} className="flex flex-wrap items-center gap-2 mb-9">
                <span style={{
                  color: 'var(--text-faint)', fontSize: '0.7rem', fontFamily: 'var(--font-body)',
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '2px',
                }}>
                  Trusted partner of
                </span>
                {PARTNERS.map(p => (
                  <span key={p.name} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '3px 10px', borderRadius: '100px',
                    background: isDark ? `rgba(${p.color === '#F59E0B' ? '245,158,11' : p.color === '#10B981' ? '16,185,129' : p.color === '#22D3EE' ? '34,211,238' : '124,58,237'},0.08)` : `rgba(${p.color === '#F59E0B' ? '245,158,11' : p.color === '#10B981' ? '16,185,129' : p.color === '#22D3EE' ? '34,211,238' : '124,58,237'},0.06)`,
                    border: `1px solid ${p.color}30`,
                    color: p.color, fontSize: '0.68rem', fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                  }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: p.color, display: 'inline-block', flexShrink: 0 }} />
                    {p.name}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={item} className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 font-semibold transition-all duration-200"
                  style={{
                    padding: '13px 28px',
                    borderRadius: '14px',
                    background: isDark
                      ? 'linear-gradient(135deg, #00C8E6 0%, #1E7BC4 100%)'
                      : 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)',
                    color: isDark ? '#050F1F' : '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    boxShadow: isDark
                      ? '0 0 32px rgba(0,200,230,0.35), 0 4px 16px rgba(0,200,230,0.20)'
                      : '0 0 32px rgba(79,70,229,0.30), 0 4px 16px rgba(79,70,229,0.18)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = isDark
                      ? '0 0 48px rgba(0,200,230,0.50), 0 4px 24px rgba(0,200,230,0.30)'
                      : '0 0 48px rgba(79,70,229,0.45), 0 4px 24px rgba(124,58,237,0.28)';
                    el.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = isDark
                      ? '0 0 32px rgba(0,200,230,0.35), 0 4px 16px rgba(0,200,230,0.20)'
                      : '0 0 32px rgba(79,70,229,0.30), 0 4px 16px rgba(79,70,229,0.18)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  Start Building
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 font-medium transition-all duration-200"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '14px',
                    border: '1px solid var(--glass-border-bright)',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'var(--text-primary)';
                    el.style.borderColor = isDark ? 'rgba(0,200,230,0.35)' : 'rgba(79,70,229,0.40)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'var(--text-secondary)';
                    el.style.borderColor = 'var(--glass-border-bright)';
                  }}
                >
                  Explore Platform
                </Link>
              </motion.div>

            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}
              className="hidden md:flex"
              style={{ position: 'absolute', bottom: '32px', left: '64px', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <span style={{ color: 'var(--text-faint)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                Scroll
              </span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} style={{ color: 'var(--text-faint)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — floating metric cards */}
          <div className="hidden md:block relative md:w-[48%]">
            <MetricCard
              top="14%" right="8%"
              color="#00E5FF" colorRgb="0,229,255" delay={0.9}
              label="Platform Health" value="99.9%" sub="All systems operational" live
              bars={[55,70,60,80,88,76,92,85,90,96]}
            />
            <MetricCard
              top="44%" right="5%"
              color="#10B981" colorRgb="16,185,129" delay={1.1}
              label="Auto-Remediated" value="2.3s" sub="Anomaly resolved · AI-driven" live
              bars={[88,60,40,20,12,8,5,3,2,1]}
            />
            <MetricCard
              bottom="18%" left="4%"
              color="#1E7BC4" colorRgb="30,123,196" delay={1.35}
              label="Deploy Pipeline" value="4m 22s" sub="Continuous delivery active"
              bars={[38,50,44,60,68,62,75,70,84,88]}
            />
          </div>
        </div>

        {/* ── Tech ticker ── */}
        <div
          className="relative z-10 overflow-hidden"
          style={{
            borderTop: '1px solid var(--glass-border)',
            background: isDark ? 'rgba(5,15,31,0.65)' : 'rgba(232,234,245,0.88)',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: `linear-gradient(to right, var(--bg-primary), transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: `linear-gradient(to left, var(--bg-primary), transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', animation: 'tickerScroll 40s linear infinite', whiteSpace: 'nowrap', willChange: 'transform' }}>
            {[...TECH_TICKER, ...TECH_TICKER].map((tech, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '0 22px',
                color: 'var(--text-faint)',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}>
                <span style={{
                  display: 'inline-block', width: '3px', height: '3px', borderRadius: '50%',
                  background: i % 3 === 0 ? 'var(--accent-cyan)' : i % 3 === 1 ? 'var(--accent-blue)' : 'var(--accent-teal)',
                  opacity: 0.7,
                }} />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
