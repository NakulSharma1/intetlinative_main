import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

function CountUp({ end, suffix = '', prefix = '', isDark }: { end: number; suffix?: string; prefix?: string; isDark: boolean }) {
  const [count, setCount] = useState(0);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated) {
        setAnimated(true);
        const dur = 1600, steps = 60, inc = end / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= end) { setCount(end); clearInterval(t); }
          else setCount(Math.floor(cur));
        }, dur / steps);
        return () => clearInterval(t);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, animated]);

  return (
    <div ref={ref}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '76px',
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        background: isDark
          ? 'linear-gradient(135deg, #00C8E6 0%, #1E7BC4 100%)'
          : 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
      }}>
        {prefix}{count}{suffix}
      </span>
    </div>
  );
}

// ─── Feature cards data ───────────────────────────────────────────────────────

const featureCards = [
  {
    color: '#22D3EE',
    colorRgb: '34,211,238',
    title: 'Multi-Cloud Ready',
    description: 'Certified architects across AWS, Azure and GCP. Seamless workload portability, unified governance and cost-optimised multi-cloud deployments at enterprise scale.',
    tags: ['AWS', 'Azure', 'GCP'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 12a7 7 0 0 1 14 0" stroke="#22D3EE" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M18 12a4 4 0 0 1 8 0v1a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-1" stroke="#22D3EE" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="14" y1="16" x2="14" y2="22" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="22" x2="18" y2="22" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    color: '#1E7BC4',
    colorRgb: '30,123,196',
    title: 'AI-Powered Ops',
    description: 'ML-driven anomaly detection identifies incidents before they escalate. Auto-remediation playbooks resolve up to 80% of routine alerts without human intervention.',
    tags: ['ML Ops', 'Auto-Heal', 'AIOps'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="8" r="3" fill="#1E7BC4" opacity="0.85"/>
        <circle cx="6" cy="18" r="3" fill="#1E7BC4" opacity="0.6"/>
        <circle cx="22" cy="18" r="3" fill="#1E7BC4" opacity="0.6"/>
        <circle cx="10" cy="24" r="2.5" fill="#00BCD4" opacity="0.5"/>
        <circle cx="18" cy="24" r="2.5" fill="#00BCD4" opacity="0.5"/>
        <line x1="14" y1="11" x2="6" y2="15" stroke="#1E7BC4" strokeWidth="1" opacity="0.4"/>
        <line x1="14" y1="11" x2="22" y2="15" stroke="#1E7BC4" strokeWidth="1" opacity="0.4"/>
        <line x1="6" y1="21" x2="10" y2="22" stroke="#00BCD4" strokeWidth="1" opacity="0.4"/>
        <line x1="22" y1="21" x2="18" y2="22" stroke="#00BCD4" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    color: '#10B981',
    colorRgb: '16,185,129',
    title: 'Security-First',
    description: 'Zero-trust architecture by default. Shift-left SAST/DAST in every pipeline, runtime eBPF observability and cryptographic supply-chain attestation.',
    tags: ['Zero Trust', 'Shift-Left', 'eBPF'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L4 7v8c0 6.6 4.4 12.8 10 14.2C20 27.8 24 21.6 24 15V7L14 3z" stroke="#10B981" strokeWidth="1.5" fill="rgba(16,185,129,0.08)" strokeLinejoin="round"/>
        <path d="M9 14l3 3 7-7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const stats = [
  { value: 50, suffix: '+', label: 'Enterprise Deployments' },
  { value: 99, suffix: '.9%', label: 'Uptime SLA' },
  { value: 80, suffix: '%', label: 'Toil Reduction' },
  { value: 3, suffix: '×', label: 'Delivery Speed' },
];

export default function StatsSection() {
  const { isDark } = useTheme();

  const cardBg = isDark ? 'rgba(17,24,39,0.70)' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(79,70,229,0.10)';

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.012)' : 'rgba(15,23,42,0.035)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.012)' : 'rgba(15,23,42,0.035)'} 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: isDark ? 'radial-gradient(circle, rgba(0,188,212,0.07) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: isDark ? 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative px-6 md:px-12">
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden cursor-default"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: isDark
                  ? '0 2px 12px rgba(0,0,0,0.3)'
                  : '0 2px 12px rgba(15,23,42,0.05), 0 1px 3px rgba(15,23,42,0.04)',
                transition: 'border-color 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `rgba(${card.colorRgb},${isDark ? '0.35' : '0.28'})`;
                el.style.boxShadow = isDark
                  ? `0 0 32px rgba(${card.colorRgb},0.12), 0 8px 32px rgba(0,0,0,0.3)`
                  : `0 8px 28px rgba(${card.colorRgb},0.12), 0 2px 8px rgba(15,23,42,0.06)`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = borderColor;
                el.style.boxShadow = isDark
                  ? '0 2px 12px rgba(0,0,0,0.3)'
                  : '0 2px 12px rgba(15,23,42,0.05), 0 1px 3px rgba(15,23,42,0.04)';
              }}
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${card.color}, transparent 80%)` }}
              />

              <div className="p-7 flex items-start gap-5">
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-[52px] h-[52px] rounded-xl flex items-center justify-center"
                  style={{
                    background: `rgba(${card.colorRgb},0.10)`,
                    border: `1px solid rgba(${card.colorRgb},0.20)`,
                  }}
                >
                  {card.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                    {card.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          background: `rgba(${card.colorRgb},0.10)`,
                          color: card.color,
                          border: `1px solid rgba(${card.colorRgb},0.22)`,
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="text-center"
            >
              <CountUp end={stat.value} suffix={stat.suffix} isDark={isDark} />
              <p
                className="text-sm mt-1.5"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
