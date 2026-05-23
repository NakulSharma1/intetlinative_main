import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail, MapPin, Send, Linkedin, Github,
  Lock, Zap, ShieldCheck, Clock, Globe2, ArrowRight,
  CheckCircle2, Twitter
} from 'lucide-react';
import PageHero from '../components/PageHero';

const ACCENT_VIOLET = '#1E7BC4';
const ACCENT_CYAN = '#00BCD4';
const ACCENT_GREEN = '#10B981';
const ACCENT_AMBER = '#F59E0B';
const ACCENT_PINK = '#00E5FF';

const SERVICE_OPTIONS = [
  { label: 'Cloud Native', color: ACCENT_CYAN },
  { label: 'Platform Eng', color: ACCENT_VIOLET },
  { label: 'AIOps', color: ACCENT_AMBER },
  { label: 'Security', color: ACCENT_PINK },
  { label: 'Modernization', color: ACCENT_GREEN },
  { label: 'Other', color: 'var(--text-muted)' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, type: 'spring', stiffness: 90 } },
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--glass-border)',
  color: 'var(--text-primary)',
  fontSize: '15px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 500,
  marginBottom: '7px',
  color: 'var(--text-secondary)',
  fontFamily: 'var(--font-body)',
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sales@intellinative.com',
      link: 'mailto:sales@intellinative.com',
      color: ACCENT_CYAN,
    },
    {
      icon: MapPin,
      label: 'Headquarters',
      value: 'India · Global Delivery',
      link: null,
      color: ACCENT_GREEN,
    },
  ];

  const whyUs = [
    { icon: Clock, label: 'Fast Response', sub: 'Priority SLA', color: ACCENT_CYAN },
    { icon: ShieldCheck, label: 'Certified Experts', sub: 'CKA, AWS, GCP', color: ACCENT_VIOLET },
    { icon: Zap, label: 'Enterprise Grade', sub: 'High availability', color: ACCENT_GREEN },
    { icon: Globe2, label: 'Global Coverage', sub: 'Worldwide delivery', color: ACCENT_AMBER },
  ];

  const getFocusBorder = (field: string) =>
    focusedField === field ? '1px solid rgba(0,188,212,0.55)' : '1px solid var(--glass-border)';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute"
          style={{
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT_VIOLET}0A 0%, transparent 70%)`,
            top: '10%',
            left: '-10%',
          }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute"
          style={{
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT_CYAN}09 0%, transparent 70%)`,
            bottom: '15%',
            right: '-5%',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHero
          badge="GET IN TOUCH"
          headline="Let's build"
          headlineGradient="something extraordinary."
          subtext="Whether you're modernizing legacy infrastructure or building AI-native platforms from scratch — we're ready to partner with you."
          variant="contact"
        />

        <section className="px-6 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 90 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center p-5 rounded-2xl gap-3"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: `${item.color}18` }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {item.sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 70 }}
            >
              <h2
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                Send us a message
              </h2>
              <p
                className="mb-8"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
              >
                We'll get back to you within 2 hours during business hours.
              </p>

              <motion.form
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-5"
              >
                <motion.div variants={fieldVariants} className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      style={{ ...inputStyle, border: getFocusBorder('name') }}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      style={{ ...inputStyle, border: getFocusBorder('email') }}
                      placeholder="john@company.com"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label style={labelStyle}>Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle, border: getFocusBorder('company') }}
                    placeholder="Your Company"
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label style={labelStyle}>Service Interest</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SERVICE_OPTIONS.map((opt) => (
                      <motion.button
                        key={opt.label}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setFormData({ ...formData, service: opt.label })}
                        className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                        style={{
                          background: formData.service === opt.label ? `${opt.color}22` : 'var(--bg-tertiary)',
                          border: formData.service === opt.label
                            ? `1px solid ${opt.color}`
                            : '1px solid var(--glass-border)',
                          color: formData.service === opt.label ? opt.color : 'var(--text-secondary)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    style={{
                      ...inputStyle,
                      border: getFocusBorder('message'),
                      resize: 'none',
                    }}
                    placeholder="Tell us about your project, infrastructure challenges, or goals..."
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(0,200,230,0.45)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-8 py-4 rounded-[14px] font-bold text-base inline-flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #00C8E6 0%, #1E7BC4 100%)',
                      color: '#050F1F',
                      fontFamily: 'var(--font-body)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 0 24px rgba(0,200,230,0.28)',
                    }}
                  >
                    {submitted ? (
                      <>
                        <CheckCircle2 size={18} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </motion.button>
                  <div
                    className="flex items-center gap-2 text-sm mt-3"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    <Lock size={13} />
                    <span>Your data is safe. We never share your information.</span>
                  </div>
                </motion.div>
              </motion.form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 70 }}
              className="space-y-8"
            >
              <div>
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.link || '#'}
                      whileHover={{ x: 4, transition: { duration: 0.18 } }}
                      className="flex items-center gap-4 p-5 rounded-2xl transition-all no-underline"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                      }}
                    >
                      <div
                        className="p-2.5 rounded-xl flex-shrink-0"
                        style={{ background: `${item.color}18` }}
                      >
                        <item.icon size={22} style={{ color: item.color }} />
                      </div>
                      <div>
                        <div
                          className="text-xs mb-0.5"
                          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="font-medium"
                          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
                        >
                          {item.value}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: ACCENT_CYAN },
                    { icon: Github, label: 'GitHub', href: 'https://github.com', color: ACCENT_VIOLET },
                    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: ACCENT_AMBER },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: `1px solid var(--glass-border)`,
                        color: social.color,
                        fontFamily: 'var(--font-body)',
                        textDecoration: 'none',
                      }}
                    >
                      <social.icon size={18} />
                      {social.label}
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-7 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'var(--bg-secondary)',
                  border: `1px solid var(--glass-border)`,
                  borderLeft: `4px solid ${ACCENT_GREEN}`,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${ACCENT_GREEN}10 0%, transparent 70%)`,
                    transform: 'translate(30%, -30%)',
                  }}
                />
                <h3
                  className="text-xl font-bold mb-5"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  Why Choose Intellinative?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Trusted by leading enterprises',
                    'Enterprise-grade reliability built in',
                    '24/7 enterprise support coverage',
                    'ISO 27001 & SOC 2 Type II certified',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} style={{ color: ACCENT_GREEN, flexShrink: 0 }} />
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
