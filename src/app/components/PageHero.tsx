import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export interface PageHeroProps {
  badge: string;
  badgeColor?: string;
  headline: string;
  headlineGradient?: string;
  subtext: string;
  variant: 'about' | 'services' | 'pillars' | 'contact';
}

// Variant radial bloom configs — all use the premium violet/purple palette
const VARIANT_BG_DARK: Record<PageHeroProps['variant'], string> = {
  about:    'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(0,188,212,0.10) 0%, transparent 70%)',
  services: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(30,123,196,0.10) 0%, transparent 70%)',
  pillars:  'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(16,185,129,0.08) 0%, transparent 70%)',
  contact:  'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,188,212,0.09) 0%, rgba(30,123,196,0.06) 50%, transparent 70%)',
};

const VARIANT_BG_LIGHT: Record<PageHeroProps['variant'], string> = {
  about:    'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(0,184,207,0.07) 0%, transparent 70%)',
  services: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(21,101,192,0.07) 0%, transparent 70%)',
  pillars:  'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(5,150,105,0.06) 0%, transparent 70%)',
  contact:  'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,184,207,0.07) 0%, rgba(21,101,192,0.05) 50%, transparent 70%)',
};

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function AboutIllustration({ isDark }: { isDark: boolean }) {
  const stroke = '#00BCD4';
  const dot    = isDark ? '#00E5FF' : '#00BCD4';
  return (
    <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {[40, 80, 120, 160, 200].map((r, i) => (
        <circle key={r} cx="210" cy="210" r={r}
          stroke={stroke} strokeWidth="0.8"
          strokeOpacity={0.30 - i * 0.04}
          strokeDasharray={i % 2 === 0 ? '6 8' : 'none'}
        />
      ))}
      {[
        { r: 80, angle: 30 }, { r: 80, angle: 150 }, { r: 80, angle: 270 },
        { r: 120, angle: 60 }, { r: 120, angle: 180 }, { r: 120, angle: 300 },
        { r: 160, angle: 20 }, { r: 160, angle: 110 }, { r: 160, angle: 230 }, { r: 160, angle: 330 },
        { r: 200, angle: 75 }, { r: 200, angle: 165 }, { r: 200, angle: 255 }, { r: 200, angle: 345 },
      ].map(({ r, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        return <circle key={i} cx={210 + r * Math.cos(rad)} cy={210 + r * Math.sin(rad)} r={4} fill={dot} fillOpacity={0.55} />;
      })}
      <circle cx="210" cy="210" r="10" fill={dot} fillOpacity={0.3} />
      <circle cx="210" cy="210" r="5" fill={dot} fillOpacity={0.75} />
      {[0, 60, 120, 180, 240, 300].map(angle => {
        const rad = (angle * Math.PI) / 180;
        return <line key={angle} x1="210" y1="210" x2={210 + 200 * Math.cos(rad)} y2={210 + 200 * Math.sin(rad)}
          stroke={stroke} strokeWidth="0.5" strokeOpacity={0.15} />;
      })}
    </svg>
  );
}

function ServicesIllustration({ isDark }: { isDark: boolean }) {
  const hexPoints = (cx: number, cy: number, size: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`;
    }).join(' ');

  const hexes = [
    { cx: 210, cy: 160, s: 42 }, { cx: 283, cy: 202, s: 42 }, { cx: 283, cy: 286, s: 42 },
    { cx: 210, cy: 328, s: 42 }, { cx: 137, cy: 286, s: 42 }, { cx: 137, cy: 202, s: 42 },
    { cx: 210, cy: 244, s: 28 }, { cx: 355, cy: 160, s: 28 }, { cx: 65, cy: 328, s: 28 },
  ];
  const colors = ['#00BCD4', '#1E7BC4', '#008FA8'];

  return (
    <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {[
        [210,160, 283,202], [283,202, 283,286], [283,286, 210,328],
        [210,328, 137,286], [137,286, 137,202], [137,202, 210,160],
        [210,160, 210,244], [283,202, 210,244], [283,286, 210,244],
        [210,328, 210,244], [137,286, 210,244], [137,202, 210,244],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#00BCD4" strokeWidth="0.7" strokeOpacity={isDark ? 0.30 : 0.25} />
      ))}
      {hexes.map(({ cx, cy, s }, i) => (
        <polygon key={i} points={hexPoints(cx, cy, s)}
          stroke={colors[i % 3]} strokeWidth="1"
          strokeOpacity={isDark ? 0.50 : 0.40}
          fill={`${colors[i % 3]}08`}
        />
      ))}
      {hexes.slice(0, 6).map(({ cx, cy }, i) => (
        <circle key={i} cx={cx} cy={cy} r={3.5} fill={colors[i % 3]} fillOpacity={0.65} />
      ))}
    </svg>
  );
}

function PillarsIllustration({ isDark }: { isDark: boolean }) {
  const c1 = '#22D3EE'; // cyan — security
  const c2 = '#1E7BC4'; // ocean blue — compliance
  const c3 = '#10B981'; // emerald — observability
  return (
    <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <line x1="60" y1="360" x2="360" y2="360" stroke={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)'} strokeWidth="1" />

      <rect x="85" y="160" width="60" height="200" rx="4" fill="url(#p1g)" stroke={c1} strokeWidth="1" strokeOpacity={0.45} />
      <rect x="75" y="152" width="80" height="16" rx="4" fill={c1} fillOpacity={0.12} stroke={c1} strokeWidth="1" strokeOpacity={0.5} />
      <ellipse cx="115" cy="154" rx="30" ry="10" fill={c1} fillOpacity={0.18} />
      <circle cx="115" cy="154" r="5" fill={c1} fillOpacity={0.85} />

      <rect x="180" y="100" width="60" height="260" rx="4" fill="url(#p2g)" stroke={c2} strokeWidth="1" strokeOpacity={0.45} />
      <rect x="170" y="92" width="80" height="16" rx="4" fill={c2} fillOpacity={0.12} stroke={c2} strokeWidth="1" strokeOpacity={0.5} />
      <ellipse cx="210" cy="94" rx="30" ry="10" fill={c2} fillOpacity={0.18} />
      <circle cx="210" cy="94" r="5" fill={c2} fillOpacity={0.85} />

      <rect x="275" y="200" width="60" height="160" rx="4" fill="url(#p3g)" stroke={c3} strokeWidth="1" strokeOpacity={0.45} />
      <rect x="265" y="192" width="80" height="16" rx="4" fill={c3} fillOpacity={0.12} stroke={c3} strokeWidth="1" strokeOpacity={0.5} />
      <ellipse cx="305" cy="194" rx="30" ry="10" fill={c3} fillOpacity={0.18} />
      <circle cx="305" cy="194" r="5" fill={c3} fillOpacity={0.85} />

      {[200, 240, 280, 320].map(y => (
        <line key={y} x1="85" y1={y} x2="145" y2={y} stroke={c1} strokeWidth="0.4" strokeOpacity={0.18} />
      ))}
      {[140, 180, 220, 260, 300, 340].map(y => (
        <line key={y} x1="180" y1={y} x2="240" y2={y} stroke={c2} strokeWidth="0.4" strokeOpacity={0.18} />
      ))}
      {[240, 280, 320].map(y => (
        <line key={y} x1="275" y1={y} x2="335" y2={y} stroke={c3} strokeWidth="0.4" strokeOpacity={0.18} />
      ))}

      <defs>
        <linearGradient id="p1g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c1} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c1} stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="p2g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c2} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c2} stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="p3g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c3} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c3} stopOpacity="0.03" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ContactIllustration({ isDark }: { isDark: boolean }) {
  const c1 = '#00BCD4';
  const c2 = '#1E7BC4';
  return (
    <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {[30, 65, 105, 150, 200].map((r, i) => (
        <circle key={r} cx="210" cy="210" r={r}
          stroke={i % 2 === 0 ? c1 : c2}
          strokeWidth={1 - i * 0.12}
          strokeOpacity={0.45 - i * 0.06}
          strokeDasharray={i > 1 ? '4 6' : 'none'}
        />
      ))}
      {[50, 90, 135].map((r, i) => (
        <path key={r}
          d={`M ${210 - r * Math.cos(Math.PI * 0.25)} ${210 - r * Math.sin(Math.PI * 0.75)} A ${r} ${r} 0 0 1 ${210 + r * Math.cos(Math.PI * 0.25)} ${210 - r * Math.sin(Math.PI * 0.75)}`}
          stroke={c2} strokeWidth={1.2 - i * 0.2} strokeOpacity={0.50 - i * 0.1} strokeLinecap="round"
        />
      ))}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return <circle key={i} cx={210 + 155 * Math.cos(rad)} cy={210 + 155 * Math.sin(rad)}
          r={3} fill={i % 2 === 0 ? c1 : c2} fillOpacity={0.60} />;
      })}
      <circle cx="210" cy="210" r="14" fill={c1} fillOpacity={isDark ? 0.12 : 0.08} stroke={c1} strokeWidth="1" strokeOpacity={0.45} />
      <circle cx="210" cy="210" r="7" fill={c1} fillOpacity={0.45} />
      <circle cx="210" cy="210" r="3.5" fill={c2} fillOpacity={0.9} />
      {[30, 90, 150, 210, 270, 330].map(angle => {
        const rad = (angle * Math.PI) / 180;
        return <line key={angle}
          x1={210 + 14 * Math.cos(rad)} y1={210 + 14 * Math.sin(rad)}
          x2={210 + 155 * Math.cos(rad)} y2={210 + 155 * Math.sin(rad)}
          stroke={c1} strokeWidth="0.6" strokeOpacity={0.18} />;
      })}
    </svg>
  );
}

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PageHero({
  badge,
  badgeColor = '#00BCD4',
  headline,
  headlineGradient,
  subtext,
  variant,
}: PageHeroProps) {
  const { isDark } = useTheme();

  // Map any legacy color values to the new palette
  const resolvedColor = badgeColor
    .replace('#7B2FFF', '#00BCD4')
    .replace('#7C3AED', '#00BCD4')
    .replace('#6620e8', '#1E7BC4')
    .replace('#A855F7', '#00BCD4')
    .replace('#00D4FF', '#00BCD4')
    .replace('#22D3EE', '#00BCD4')
    .replace('#00B86B', '#10B981')
    .replace('#00FF88', '#10B981');

  // Extract rgb for transparency usage
  const colorRgb = resolvedColor === '#00BCD4' ? '0,188,212'
    : resolvedColor === '#1E7BC4' ? '30,123,196'
    : resolvedColor === '#00E5FF' ? '0,229,255'
    : resolvedColor === '#10B981' ? '16,185,129'
    : resolvedColor === '#F59E0B' ? '245,158,11'
    : '0,188,212';

  const illustrations = {
    about:    <AboutIllustration isDark={isDark} />,
    services: <ServicesIllustration isDark={isDark} />,
    pillars:  <PillarsIllustration isDark={isDark} />,
    contact:  <ContactIllustration isDark={isDark} />,
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '520px',
        background: 'var(--bg-primary)',
        paddingTop: '128px',
        paddingBottom: '64px',
      }}
    >
      {/* Variant radial bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: isDark ? VARIANT_BG_DARK[variant] : VARIANT_BG_LIGHT[variant] }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: isDark ? 0.8 : 0.6,
        }}
      />

      <div
        className="relative px-6 md:px-12"
        style={{ display: 'flex', alignItems: 'center', gap: '40px' }}
      >
        {/* Left content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ flex: '0 0 55%', maxWidth: '55%' }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px',
                borderRadius: '999px',
                fontSize: '0.70rem',
                letterSpacing: '0.12em',
                fontFamily: 'var(--font-mono, monospace)',
                background: `rgba(${colorRgb},${isDark ? '0.10' : '0.08'})`,
                border: `1px solid rgba(${colorRgb},${isDark ? '0.28' : '0.25'})`,
                color: resolvedColor,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: resolvedColor,
                  boxShadow: `0 0 6px 2px rgba(${colorRgb},0.45)`,
                }}
              />
              {badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              color: 'var(--text-primary)',
            }}
          >
            {headline}{' '}
            {headlineGradient && (
              <span
                style={{
                  background: 'linear-gradient(130deg, #00E5FF 0%, #1E7BC4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {headlineGradient}
              </span>
            )}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '520px',
              fontFamily: 'var(--font-body)',
            }}
          >
            {subtext}
          </motion.p>
        </motion.div>

        {/* Right illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: isDark ? 0.65 : 0.55, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            flex: '0 0 45%',
            maxWidth: '45%',
            height: '340px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {illustrations[variant]}
        </motion.div>
      </div>
    </section>
  );
}
