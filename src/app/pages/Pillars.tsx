import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ShieldCheck, Award, Eye, Lock, Search, Bell,
  FileCheck, Activity, Zap, ArrowRight, CheckCircle2
} from 'lucide-react';
import PageHero from '../components/PageHero';

const ACCENT_VIOLET = '#1E7BC4';
const ACCENT_CYAN = '#00BCD4';
const ACCENT_GREEN = '#10B981';
const ACCENT_AMBER = '#F59E0B';
const ACCENT_PINK = '#00E5FF';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 85 } },
};

const CERTS = [
  { label: 'ISO 27001', sub: 'Certified', color: ACCENT_CYAN },
  { label: 'SOC 2', sub: 'Type II', color: ACCENT_VIOLET },
  { label: 'NIST CSF', sub: 'Compliant', color: ACCENT_GREEN },
  { label: 'GDPR', sub: 'Ready', color: ACCENT_AMBER },
  { label: 'Zero Trust', sub: 'Architecture', color: ACCENT_PINK },
  { label: 'CIS', sub: 'Controls', color: ACCENT_CYAN },
];

const pillars = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Security',
    tagline: 'Defense in depth, zero trust by default',
    description:
      'Our security-first approach ensures your infrastructure is protected at every layer — from code to cloud to edge. We embed security into every phase of delivery, not as an afterthought.',
    color: ACCENT_CYAN,
    steps: [
      { step: '01', title: 'Assess', desc: 'Threat model and attack surface analysis across your full stack' },
      { step: '02', title: 'Harden', desc: 'Zero trust network, RBAC, secrets management, policy-as-code' },
      { step: '03', title: 'Monitor', desc: 'Real-time eBPF-based runtime detection and automated response' },
    ],
    features: [
      {
        icon: Lock,
        title: 'Zero Trust Architecture',
        description: 'Never trust, always verify. Continuous authentication and authorization across your entire stack.',
      },
      {
        icon: ShieldCheck,
        title: 'Shift-Left Security',
        description: 'Automated SAST, DAST, and container scanning integrated directly in your CI/CD pipeline.',
      },
      {
        icon: Search,
        title: 'Threat Detection',
        description: 'Real-time threat intelligence with AI-powered anomaly detection and automated incident response.',
      },
      {
        icon: FileCheck,
        title: 'eBPF Security',
        description: 'Kernel-level observability and security with eBPF-based runtime protection and network policies.',
      },
    ],
    techGroups: [
      { category: 'Runtime', techs: ['Falco', 'Cilium', 'eBPF'] },
      { category: 'Policy', techs: ['OPA', 'Kyverno', 'Gatekeeper'] },
      { category: 'Secrets', techs: ['Vault', 'External Secrets', 'SOPS'] },
    ],
  },
  {
    number: '02',
    icon: Award,
    title: 'Compliance',
    tagline: 'Audit-ready infrastructure, always',
    description:
      'Meet and exceed regulatory requirements with automated compliance frameworks and continuous monitoring. We make compliance a living, breathing part of your infrastructure — never a one-time checkbox.',
    color: ACCENT_VIOLET,
    steps: [
      { step: '01', title: 'Map', desc: 'Map your workloads against relevant compliance frameworks' },
      { step: '02', title: 'Enforce', desc: 'Policy-as-code enforcement with real-time compliance gates' },
      { step: '03', title: 'Report', desc: 'Automated audit trails and executive compliance dashboards' },
    ],
    features: [
      {
        icon: Award,
        title: 'ISO 27001 & SOC 2',
        description: 'Full compliance automation for information security management and service organization controls.',
      },
      {
        icon: FileCheck,
        title: 'GDPR & DPDP Act',
        description: 'Data privacy compliance for global operations with automated governance and privacy controls.',
      },
      {
        icon: Search,
        title: 'NIST & CIS Controls',
        description: 'Industry-standard security frameworks implemented with continuous validation and reporting.',
      },
      {
        icon: Bell,
        title: 'Continuous Compliance',
        description: 'Automated policy enforcement, real-time monitoring, and audit trail generation at cloud scale.',
      },
    ],
    techGroups: [
      { category: 'Governance', techs: ['OPA', 'Crossplane', 'Terraform'] },
      { category: 'Audit', techs: ['CloudTrail', 'Falco', 'Prowler'] },
      { category: 'Privacy', techs: ['Vault', 'Macie', 'BigQuery DLP'] },
    ],
  },
  {
    number: '03',
    icon: Eye,
    title: 'Observability',
    tagline: 'See everything, understand everything',
    description:
      'Full-stack visibility with AI-powered insights that transform raw telemetry data into actionable intelligence. From kernel-level metrics to business KPIs — nothing escapes view.',
    color: ACCENT_GREEN,
    steps: [
      { step: '01', title: 'Instrument', desc: 'OpenTelemetry-native auto-instrumentation across all services' },
      { step: '02', title: 'Correlate', desc: 'Unified metrics, logs, and traces in a single pane of glass' },
      { step: '03', title: 'Act', desc: 'AIOps-driven anomaly detection and automated remediation' },
    ],
    features: [
      {
        icon: Activity,
        title: 'Metrics & Monitoring',
        description: 'Prometheus, Grafana, and custom dashboards for real-time performance and health monitoring.',
      },
      {
        icon: Search,
        title: 'Distributed Tracing',
        description: 'OpenTelemetry-based tracing across microservices for complete request lifecycle visibility.',
      },
      {
        icon: Zap,
        title: 'AIOps Intelligence',
        description: 'AI-powered anomaly detection, predictive analytics, and automated root cause analysis.',
      },
      {
        icon: Eye,
        title: 'Log Aggregation',
        description: 'Centralized logging with intelligent search, correlation, and long-term retention strategies.',
      },
    ],
    techGroups: [
      { category: 'Metrics', techs: ['Prometheus', 'VictoriaMetrics', 'Thanos'] },
      { category: 'Tracing', techs: ['OpenTelemetry', 'Jaeger', 'Tempo'] },
      { category: 'Logging', techs: ['Loki', 'Fluentd', 'Vector'] },
    ],
  },
];

export default function Pillars() {
  const certsRef = useRef(null);
  const certsInView = useInView(certsRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <PageHero
        badge="OUR FOUNDATION"
        headline="Three pillars."
        headlineGradient="One standard."
        subtext="Security, compliance, and observability — the non-negotiable foundation behind every platform we engineer."
        variant="pillars"
        badgeColor={ACCENT_GREEN}
      />

      {pillars.map((pillar, i) => {
        const featuresRef = useRef(null);
        const featuresInView = useInView(featuresRef, { once: true, margin: '-60px' });

        return (
          <section
            key={i}
            className="px-6 md:px-12 py-16 md:py-20"
            style={{
              background: i % 2 === 1 ? 'var(--bg-secondary)' : 'transparent',
              borderTop: i > 0 ? '1px solid var(--glass-border)' : undefined,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 75 }}
              className="mb-12"
            >
              <div className="flex items-start gap-6 mb-6">
                <div>
                  <div
                    className="text-7xl md:text-8xl font-black leading-none mb-2 select-none"
                    style={{
                      background: `linear-gradient(135deg, ${pillar.color}30, ${pillar.color}60)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {pillar.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="p-3 rounded-xl"
                      style={{ background: `${pillar.color}18` }}
                    >
                      <pillar.icon size={36} style={{ color: pillar.color }} />
                    </div>
                    <div>
                      <h2
                        className="text-4xl font-bold leading-none"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                      >
                        {pillar.title}
                      </h2>
                      <p
                        className="text-base mt-1 font-medium"
                        style={{ color: pillar.color, fontFamily: 'var(--font-body)' }}
                      >
                        {pillar.tagline}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-lg max-w-3xl leading-relaxed"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="relative mt-10 mb-12">
                <div
                  className="hidden md:block absolute top-6 left-[calc(16.666%+24px)] right-[calc(16.666%+24px)] h-[1px]"
                  style={{
                    background: `linear-gradient(90deg, ${pillar.color}00, ${pillar.color}60, ${pillar.color}00)`,
                    borderTop: `1px dashed ${pillar.color}50`,
                  }}
                />
                <div className="grid md:grid-cols-3 gap-6">
                  {pillar.steps.map((step, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.15, type: 'spring', stiffness: 85 }}
                      className="flex flex-col items-center text-center p-6 rounded-2xl"
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: `1px solid ${pillar.color}25`,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-4 flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${pillar.color}, rgba(168,85,247,0.8))`,
                          color: '#fff',
                          fontFamily: 'var(--font-display)',
                          boxShadow: `0 0 16px rgba(124,58,237,0.30)`,
                        }}
                      >
                        {step.step}
                      </div>
                      <h4
                        className="font-semibold text-base mb-2"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                      >
                        {step.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              ref={featuresRef}
              variants={containerVariants}
              initial="hidden"
              animate={featuresInView ? 'show' : 'hidden'}
              className="grid md:grid-cols-2 gap-5 mb-10"
            >
              {pillar.features.map((feature, j) => (
                <motion.div
                  key={j}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="flex gap-5 p-7 rounded-2xl relative overflow-hidden"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderLeft: `4px solid ${pillar.color}`,
                  }}
                >
                  <div
                    className="flex-shrink-0 p-2.5 rounded-xl h-fit"
                    style={{ background: `${pillar.color}15` }}
                  >
                    <feature.icon size={24} style={{ color: pillar.color }} />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-wrap gap-6">
              {pillar.techGroups.map((group, j) => (
                <div key={j} className="flex flex-col gap-2">
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.techs.map((tech, k) => (
                      <motion.span
                        key={k}
                        whileHover={{ scale: 1.07, y: -2 }}
                        className="px-4 py-1.5 rounded-full text-sm font-medium cursor-default"
                        style={{
                          background: `${pillar.color}14`,
                          border: `1px solid ${pillar.color}35`,
                          color: pillar.color,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section
        className="px-6 md:px-12 py-16 md:py-20"
        style={{ borderTop: '1px solid var(--glass-border)' }}
      >
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: ACCENT_AMBER, fontFamily: 'var(--font-body)' }}
          >
            Recognized Standards
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Certifications & Frameworks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            Every engagement is grounded in globally recognized standards and compliance frameworks.
          </motion.p>
        </div>

        <motion.div
          ref={certsRef}
          variants={containerVariants}
          initial="hidden"
          animate={certsInView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}30, ${cert.color}60)`,
                  border: `1px solid ${cert.color}50`,
                }}
              >
                <CheckCircle2 size={18} style={{ color: cert.color }} />
              </div>
              <div
                className="font-bold text-base leading-tight mb-1"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                {cert.label}
              </div>
              <div
                className="text-xs"
                style={{ color: cert.color, fontFamily: 'var(--font-body)' }}
              >
                {cert.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 70 }}
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${ACCENT_VIOLET}0D 0%, transparent 70%)`,
            }}
          />
          <div className="relative z-10">
            <div
              className="inline-flex p-4 rounded-2xl mb-6"
              style={{ background: `${ACCENT_GREEN}15` }}
            >
              <ShieldCheck size={36} style={{ color: ACCENT_GREEN }} />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Ready to Raise the Bar?
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              Let Intellinative embed Security, Compliance, and Observability as living pillars of
              your platform — not afterthoughts bolted on at the end.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, boxShadow: `0 0 32px ${ACCENT_GREEN}50` }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base"
                style={{
                  background: 'linear-gradient(135deg, #00C8E6 0%, #1E7BC4 100%)',
                  color: '#050F1F',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
              >
                Talk to an Expert
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
              >
                Explore Services
                <ArrowRight size={18} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
