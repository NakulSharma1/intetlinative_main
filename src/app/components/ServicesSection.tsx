import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function CloudK8sSVG({ color }: { color: string }) {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
      <polygon points="55,18 68,25.5 68,40.5 55,48 42,40.5 42,25.5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      <polygon points="22,36 31,41 31,51 22,56 13,51 13,41" stroke={color} strokeWidth="1.2" fill="none" opacity="0.55" />
      <polygon points="88,36 97,41 97,51 88,56 79,51 79,41" stroke={color} strokeWidth="1.2" fill="none" opacity="0.55" />
      <polygon points="55,58 64,63 64,73 55,78 46,73 46,63" stroke={color} strokeWidth="1.2" fill="none" opacity="0.55" />
      <line x1="42" y1="33" x2="31" y2="44" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="68" y1="33" x2="79" y2="44" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="55" y1="48" x2="55" y2="63" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="55" cy="33" r="3" fill={color} opacity="0.9" />
      <circle cx="22" cy="46" r="2" fill={color} opacity="0.55" />
      <circle cx="88" cy="46" r="2" fill={color} opacity="0.55" />
      <circle cx="55" cy="68" r="2" fill={color} opacity="0.55" />
      <ellipse cx="55" cy="33" rx="28" ry="10" stroke={color} strokeWidth="0.7" fill="none" opacity="0.22" strokeDasharray="4 3" />
    </svg>
  );
}

function PipelineSVG({ color }: { color: string }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
      <circle cx="50" cy="38" r="14" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      <circle cx="50" cy="38" r="7" stroke={color} strokeWidth="1" fill="none" opacity="0.55" />
      {[0,45,90,135,180,225,270,315].map((deg,i)=>{
        const rad=(deg*Math.PI)/180;
        return <line key={i} x1={50+14*Math.cos(rad)} y1={38+14*Math.sin(rad)} x2={50+19*Math.cos(rad)} y2={38+19*Math.sin(rad)} stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>;
      })}
      <line x1="8" y1="20" x2="36" y2="30" stroke={color} strokeWidth="1" opacity="0.35" strokeDasharray="3 2"/>
      <line x1="8" y1="56" x2="36" y2="46" stroke={color} strokeWidth="1" opacity="0.35" strokeDasharray="3 2"/>
      <line x1="64" y1="30" x2="92" y2="20" stroke={color} strokeWidth="1" opacity="0.35" strokeDasharray="3 2"/>
      <line x1="64" y1="46" x2="92" y2="56" stroke={color} strokeWidth="1" opacity="0.35" strokeDasharray="3 2"/>
    </svg>
  );
}

function NeuralSVG({ color }: { color: string }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
      <path d="M5,40 C15,20 25,60 35,40 C45,20 55,60 65,40 C75,20 85,60 95,40" stroke={color} strokeWidth="2" fill="none" opacity="0.9" strokeLinecap="round"/>
      <circle cx="20" cy="30" r="3" fill={color} opacity="0.8"/>
      <circle cx="50" cy="50" r="3" fill={color} opacity="0.8"/>
      <circle cx="80" cy="30" r="3" fill={color} opacity="0.8"/>
      <path d="M5,52 C15,38 25,66 35,52 C45,38 55,66 65,52 C75,38 85,66 95,52" stroke={color} strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round"/>
    </svg>
  );
}

function ShieldCircuitSVG({ color }: { color: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <path d="M45,8 L72,20 L72,46 C72,61 60,72 45,78 C30,72 18,61 18,46 L18,20 Z" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9"/>
      <line x1="45" y1="30" x2="45" y2="58" stroke={color} strokeWidth="1" opacity="0.45"/>
      <line x1="32" y1="44" x2="58" y2="44" stroke={color} strokeWidth="1" opacity="0.45"/>
      <circle cx="45" cy="44" r="5" stroke={color} strokeWidth="1.2" fill="none" opacity="0.8"/>
      <circle cx="45" cy="44" r="2" fill={color} opacity="0.7"/>
    </svg>
  );
}

function TransformSVG({ color }: { color: string }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
      <rect x="5" y="24" width="28" height="32" rx="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.55"/>
      <rect x="67" y="24" width="28" height="32" rx="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9"/>
      <line x1="34" y1="40" x2="62" y2="40" stroke={color} strokeWidth="1.5" opacity="0.75"/>
      <polyline points="56,34 62,40 56,46" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.75"/>
      <circle cx="48" cy="30" r="2" fill={color} opacity="0.45"/>
      <circle cx="48" cy="50" r="2" fill={color} opacity="0.45"/>
    </svg>
  );
}

function DataPipelineSVG({ color }: { color: string }) {
  return (
    <svg width="110" height="80" viewBox="0 0 110 80" fill="none">
      <rect x="4" y="28" width="18" height="24" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.75"/>
      <rect x="34" y="20" width="18" height="40" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.75"/>
      <rect x="64" y="28" width="18" height="24" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.75"/>
      <rect x="88" y="32" width="18" height="16" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.75"/>
      <line x1="22" y1="40" x2="34" y2="40" stroke={color} strokeWidth="1.2" opacity="0.55"/>
      <line x1="52" y1="40" x2="64" y2="40" stroke={color} strokeWidth="1.2" opacity="0.55"/>
      <line x1="82" y1="40" x2="88" y2="40" stroke={color} strokeWidth="1.2" opacity="0.55"/>
      <circle cx="97" cy="40" r="3" fill={color} opacity="0.9"/>
    </svg>
  );
}

function RedHatSVG({ color }: { color: string }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
      <ellipse cx="50" cy="54" rx="36" ry="8" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9"/>
      <path d="M24 54 C26 36 34 24 50 24 C66 24 74 36 76 54" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9"/>
      <circle cx="50" cy="35" r="4.5" stroke={color} strokeWidth="1.2" fill="none" opacity="0.8"/>
      <circle cx="50" cy="35" r="1.8" fill={color} opacity="0.7"/>
    </svg>
  );
}

function AWSSvg({ color }: { color: string }) {
  return (
    <svg width="110" height="80" viewBox="0 0 110 80" fill="none">
      <path d="M76 46 C81 46 86 42 86 37 C86 33 83 30 79 30 C78 25 73 21 67 21 C63 21 60 23 58 26 C56 23 52 21 48 21 C41 21 36 26 36 33 C33 34 31 37 31 40 C31 44 34 47 38 47 Z" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9"/>
      <path d="M18 60 C32 72 78 72 92 60" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
      <polyline points="85,56 92,60 85,64" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <circle cx="47.5" cy="35.5" r="1.8" fill={color} opacity="0.9"/>
      <circle cx="62.5" cy="35.5" r="1.8" fill={color} opacity="0.9"/>
    </svg>
  );
}

function IndustrialSVG({ color }: { color: string }) {
  return (
    <svg width="110" height="80" viewBox="0 0 110 80" fill="none">
      <rect x="20" y="12" width="70" height="46" rx="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9"/>
      <polyline points="30,35 36,35 38,25 42,45 46,35 50,35 52,28 56,42 60,35 70,35 72,30 76,40 80,35" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      <line x1="55" y1="58" x2="55" y2="68" stroke={color} strokeWidth="1.5" opacity="0.65"/>
      <line x1="42" y1="68" x2="68" y2="68" stroke={color} strokeWidth="1.5" opacity="0.65"/>
      <circle cx="30" cy="22" r="2" fill={color} opacity="0.7"/>
    </svg>
  );
}

// ─── Services Data ────────────────────────────────────────────────────────────

const services = [
  { id: 1, title: 'Cloud Native Architecture', tagline: 'Kubernetes-native. Infinitely scalable.', color: '#00BCD4', colorRgb: '0,188,212', colSpan: 'md:col-span-7', tall: true, Illustration: CloudK8sSVG },
  { id: 2, title: 'Platform Engineering', tagline: 'Golden paths. Developer velocity.', color: '#1E7BC4', colorRgb: '30,123,196', colSpan: 'md:col-span-5', tall: false, Illustration: PipelineSVG },
  { id: 3, title: 'AI-Driven AIOps', tagline: 'Self-healing infrastructure.', color: '#0EA5E9', colorRgb: '14,165,233', colSpan: 'md:col-span-4', tall: false, Illustration: NeuralSVG },
  { id: 4, title: 'Security & Observability', tagline: 'Zero-trust. Full visibility.', color: '#10B981', colorRgb: '16,185,129', colSpan: 'md:col-span-4', tall: false, Illustration: ShieldCircuitSVG },
  { id: 5, title: 'App Modernization', tagline: 'Legacy becomes cloud-native.', color: '#F59E0B', colorRgb: '245,158,11', colSpan: 'md:col-span-4', tall: false, Illustration: TransformSVG },
  { id: 6, title: 'Data & AI/ML', tagline: 'Intelligence at every layer.', color: '#14B8A6', colorRgb: '20,184,166', colSpan: 'md:col-span-6', tall: false, Illustration: DataPipelineSVG },
  { id: 7, title: 'OT Observability', tagline: 'Industrial intelligence.', color: '#1565C0', colorRgb: '21,101,192', colSpan: 'md:col-span-6', tall: false, Illustration: IndustrialSVG },
  { id: 8, title: 'Red Hat OpenShift', tagline: 'Enterprise Kubernetes. Hybrid cloud ready.', color: '#6366F1', colorRgb: '99,102,241', colSpan: 'md:col-span-6', tall: false, Illustration: RedHatSVG },
  { id: 9, title: 'AWS Managed Services', tagline: 'Fully managed cloud ops at scale.', color: '#F59E0B', colorRgb: '245,158,11', colSpan: 'md:col-span-6', tall: false, Illustration: AWSSvg },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ service, index, isDark }: { service: typeof services[number]; index: number; isDark: boolean }) {
  const { title, tagline, color, colorRgb, colSpan, tall, Illustration } = service;

  return (
    <motion.div
      className={`${colSpan} group relative rounded-2xl overflow-hidden cursor-default`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{
        background: isDark
          ? 'rgba(17,24,39,0.72)'
          : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(79,70,229,0.09)'}`,
        minHeight: tall ? '240px' : '200px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isDark
          ? '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25)'
          : '0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `rgba(${colorRgb},${isDark ? '0.4' : '0.35'})`;
        el.style.boxShadow = isDark
          ? `0 0 32px rgba(${colorRgb},0.14), 0 8px 40px rgba(0,0,0,0.35)`
          : `0 8px 32px rgba(${colorRgb},0.14), 0 2px 8px rgba(15,23,42,0.06)`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(79,70,229,0.09)';
        el.style.boxShadow = isDark
          ? '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25)'
          : '0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)';
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${color}, transparent 80%)` }} />

      <div className={`flex flex-col h-full p-7 pt-8 ${tall ? 'gap-6' : 'gap-4'}`}>
        {/* Illustration */}
        <div className="flex items-center justify-center flex-shrink-0" style={{ height: tall ? '100px' : '84px', opacity: isDark ? 0.85 : 0.75 }}>
          <Illustration color={color} />
        </div>

        {/* Text */}
        <div className="mt-auto">
          <h3
            className="font-bold mb-1.5 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '19px',
              color: 'var(--text-primary)',
            }}
          >
            {title}
          </h3>
          <p className="text-sm leading-snug" style={{ color: 'var(--text-muted)' }}>
            {tagline}
          </p>
        </div>

        {/* Corner glow */}
        <div
          className="absolute bottom-0 right-0 w-28 h-28 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at bottom right, rgba(${colorRgb},${isDark ? '0.10' : '0.07'}), transparent 70%)` }}
        />
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const { isDark } = useTheme();
  const row1 = services.slice(0, 2);
  const row2 = services.slice(2, 5);
  const row3 = services.slice(5, 7);
  const row4 = services.slice(7, 9);

  return (
    <section id="services" className="relative pt-24 pb-14 overflow-hidden">
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 35% at 50% 0%, rgba(0,188,212,0.07) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 80% 35% at 50% 0%, rgba(79,70,229,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="inline-flex items-center px-3.5 py-1.5 rounded-full mb-5 text-xs tracking-[0.14em] font-semibold"
            style={{
              color: isDark ? '#00E5FF' : '#4F46E5',
              border: `1px solid ${isDark ? 'rgba(0,229,255,0.28)' : 'rgba(79,70,229,0.22)'}`,
              background: isDark ? 'rgba(0,188,212,0.07)' : 'rgba(79,70,229,0.06)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.12em',
            }}
          >
            SERVICES
          </div>

          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            Intelligent Services.
          </h2>

          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
            End-to-end engineering for the AI-native enterprise.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-4">
          {[row1, row2, row3, row4].map((row, ri) => (
            <div key={ri} className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {row.map((svc, i) => (
                <ServiceCard
                  key={svc.id}
                  service={svc}
                  index={ri * 3 + i}
                  isDark={isDark}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
