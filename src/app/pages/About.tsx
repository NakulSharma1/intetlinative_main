import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Rocket, Target, Users, Award, TrendingUp, Globe,
  Zap, ArrowRight, CheckCircle2
} from 'lucide-react';
import PageHero from '../components/PageHero';

const ACCENT_VIOLET = '#1E7BC4';
const ACCENT_CYAN = '#00BCD4';
const ACCENT_GREEN = '#10B981';
const ACCENT_AMBER = '#F59E0B';
const ACCENT_PINK = '#00E5FF';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, type: 'spring', stiffness: 90 } },
};

export default function About() {
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });

  const techRef = useRef(null);
  const techInView = useInView(techRef, { once: true, margin: '-80px' });

  const values = [
    {
      icon: Target,
      title: 'Customer-Centric Excellence',
      description: 'Every decision starts with understanding your unique challenges and objectives. We measure success by your outcomes.',
      color: ACCENT_CYAN,
    },
    {
      icon: Users,
      title: 'Deep Technical Expertise',
      description: 'Certified cloud architects, security experts, and platform engineers with decades of combined experience.',
      color: ACCENT_VIOLET,
    },
    {
      icon: Award,
      title: 'Quality Without Compromise',
      description: 'We deliver production-ready solutions, not prototypes. Every architecture decision is built to last at scale.',
      color: ACCENT_GREEN,
    },
    {
      icon: TrendingUp,
      title: 'Innovation-Driven',
      description: 'We stay ahead of the curve, leveraging cutting-edge AI, cloud-native patterns, and emerging technologies.',
      color: ACCENT_AMBER,
    },
  ];

  const techTags = [
    'Kubernetes', 'AWS', 'GCP', 'Azure', 'Terraform', 'ArgoCD',
    'Prometheus', 'OpenTelemetry', 'Falco', 'OPA', 'Vault', 'Crossplane',
    'Istio', 'Cilium', 'Grafana', 'Helm', 'FluxCD', 'Backstage',
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <PageHero
        badge="WHO WE ARE"
        headline="Engineering for the"
        headlineGradient="AI-Native Era."
        subtext="A team of platform engineers, cloud architects, and AI specialists building the infrastructure that powers tomorrow's enterprises."
        variant="about"
      />

      <section className="relative px-6 md:px-12 py-16 md:py-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ borderTop: '1px solid var(--glass-border)' }}
        />
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, type: 'spring', stiffness: 70 }}
            className="p-10 rounded-2xl relative overflow-hidden"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderLeft: `4px solid ${ACCENT_VIOLET}`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${ACCENT_VIOLET}12 0%, transparent 70%)`,
                transform: 'translate(30%, -30%)',
              }}
            />
            <div
              className="inline-flex p-3 rounded-xl mb-5"
              style={{ background: `${ACCENT_VIOLET}18` }}
            >
              <Globe size={32} style={{ color: ACCENT_VIOLET }} />
            </div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Our Vision
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              To be the global leader in intelligent platform engineering — where AI and
              cloud-native infrastructure converge to create unprecedented business value for
              every enterprise we partner with.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {['AI-first architecture', 'Outcome-driven delivery', 'Long-term partnership'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: ACCENT_VIOLET }} />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, type: 'spring', stiffness: 70 }}
            className="p-10 rounded-2xl relative overflow-hidden"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderLeft: `4px solid ${ACCENT_GREEN}`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${ACCENT_GREEN}12 0%, transparent 70%)`,
                transform: 'translate(30%, -30%)',
              }}
            />
            <div
              className="inline-flex p-3 rounded-xl mb-5"
              style={{ background: `${ACCENT_GREEN}18` }}
            >
              <Rocket size={32} style={{ color: ACCENT_GREEN }} />
            </div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Our Mission
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              Empower enterprises to achieve cloud-native excellence through AI-driven
              platform engineering, security-first design, and an unwavering commitment
              to operational excellence at every layer.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {['Security-first by design', 'Continuous innovation', 'Operational excellence'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: ACCENT_GREEN }} />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-20">
        <div
          className="text-center mb-14"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: ACCENT_CYAN, fontFamily: 'var(--font-body)' }}
          >
            What Drives Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            The principles that guide every architecture decision, every line of code, and every
            client conversation.
          </motion.p>
        </div>

        <motion.div
          ref={valuesRef}
          variants={containerVariants}
          initial="hidden"
          animate={valuesInView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          {values.map((value, i) => (
            <motion.div
              key={i}
              variants={childVariants}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="group relative flex gap-6 p-8 rounded-2xl overflow-hidden transition-all"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: value.color }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div
                className="flex-shrink-0 p-3 rounded-xl h-fit"
                style={{ background: `${value.color}18` }}
              >
                <value.icon size={28} style={{ color: value.color }} />
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  {value.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: ACCENT_GREEN, fontFamily: 'var(--font-body)' }}
          >
            Technology
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Team Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            The tools and platforms our engineers live and breathe every day.
          </motion.p>
        </div>

        <motion.div
          ref={techRef}
          variants={containerVariants}
          initial="hidden"
          animate={techInView ? 'show' : 'hidden'}
          className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto"
        >
          {techTags.map((tag, i) => {
            const colors = [ACCENT_CYAN, ACCENT_VIOLET, ACCENT_GREEN, ACCENT_AMBER, ACCENT_PINK];
            const color = colors[i % colors.length];
            return (
              <motion.span
                key={i}
                variants={childVariants}
                whileHover={{ scale: 1.08, y: -3 }}
                className="px-5 py-2 rounded-full text-sm font-semibold cursor-default transition-all"
                style={{
                  background: `${color}14`,
                  border: `1px solid ${color}40`,
                  color: color,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {tag}
              </motion.span>
            );
          })}
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
              background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${ACCENT_VIOLET}10 0%, transparent 70%)`,
            }}
          />
          <div className="relative z-10">
            <div
              className="inline-flex p-4 rounded-2xl mb-6"
              style={{ background: `${ACCENT_CYAN}15` }}
            >
              <Zap size={36} style={{ color: ACCENT_CYAN }} />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Ready to Transform Your Infrastructure?
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              Let's talk about how Intellinative can accelerate your cloud-native journey with
              AI-powered platform engineering.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base"
              style={{
                background: 'linear-gradient(135deg, #00C8E6 0%, #1E7BC4 100%)',
                color: '#050F1F',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 0 28px rgba(0,200,230,0.32)',
              }}
            >
              Start the Conversation
              <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
