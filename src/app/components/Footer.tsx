import { Link } from 'react-router';
import { Linkedin, Github, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import LogoImage from './LogoImage';

const companyLinks = [
  { label: 'About',    path: '/about' },
  { label: 'Pillars',  path: '/pillars' },
  { label: 'Services', path: '/services' },
  { label: 'Contact',  path: '/contact' },
];

const capabilityLinks = [
  { label: 'Cloud Native',         path: '/services#cloud-native' },
  { label: 'Platform Engineering', path: '/services#platform-eng' },
  { label: 'AIOps',                path: '/services#aiops' },
  { label: 'Security',             path: '/services#security' },
  { label: 'App Modernization',    path: '/services#app-modernization' },
  { label: 'Data & AI',            path: '/services#data-ai' },
];

export default function Footer() {
  const { isDark } = useTheme();

  const glassBg     = isDark ? 'rgba(17,24,39,0.60)' : 'rgba(255,255,255,0.70)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)';

  return (
    <footer
      className="relative"
      style={{
        background: 'var(--bg-primary)',
        fontFamily: 'var(--font-display)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Top gradient accent line — matches nav */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #00BCD4 30%, #1E7BC4 70%, transparent 100%)',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,188,212,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Link to="/" className="flex items-center select-none w-fit" aria-label="Intellinative home">
              <LogoImage height={44} />
            </Link>

            <div className="space-y-1">
              <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                Engineering Intelligence. Built Native.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Platform engineering for the AI-native enterprise.
              </p>
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { href: 'https://linkedin.com/company/intellinative', label: 'LinkedIn', icon: <Linkedin size={15} /> },
                { href: 'https://github.com/intellinative', label: 'GitHub', icon: <Github size={15} /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    background: glassBg,
                    border: `1px solid ${glassBorder}`,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(0,188,212,0.40)';
                    el.style.color = 'var(--accent-violet)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = glassBorder;
                    el.style.color = 'var(--text-muted)';
                  }}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="md:col-span-2 md:col-start-6">
            <h4
              className="text-[10px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.10em' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group relative inline-block text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-px left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #00BCD4, #1E7BC4)' }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities links */}
          <div className="md:col-span-3">
            <h4
              className="text-[10px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.10em' }}
            >
              Capabilities
            </h4>
            <ul className="space-y-3">
              {capabilityLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group relative inline-block text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-px left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #00BCD4, #1E7BC4)' }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div className="md:col-span-3">
            <h4
              className="text-[10px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.10em' }}
            >
              Connect
            </h4>

            <div className="space-y-4 mb-6">
              <a
                href="mailto:sales@intellinative.com"
                className="group flex items-center gap-3"
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300"
                  style={{
                    background: glassBg,
                    border: `1px solid ${glassBorder}`,
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,188,212,0.40)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = glassBorder; }}
                >
                  <Mail
                    size={14}
                    style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                    className="group-hover:!text-[#00BCD4]"
                  />
                </span>
                <span
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                >
                  sales@intellinative.com
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{
                    background: glassBg,
                    border: `1px solid ${glassBorder}`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  India · Global Delivery
                </span>
              </div>
            </div>

            {/* Get in Touch CTA */}
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-sm font-semibold transition-all duration-300"
              style={{
                background: glassBg,
                border: `1px solid ${glassBorder}`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(0,188,212,0.45)';
                el.style.boxShadow = '0 0 20px rgba(0,188,212,0.12)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = glassBorder;
                el.style.boxShadow = 'none';
              }}
            >
              Get in Touch
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s, transform 0.3s' }}
              />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${glassBorder}` }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
            © 2025 Intellinative. All rights reserved.
          </p>
          <p
            className="text-xs font-semibold"
            style={{
              background: 'linear-gradient(90deg, #00BCD4, #1E7BC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Built with intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
