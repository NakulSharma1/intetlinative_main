import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import LogoImage from './LogoImage';

const navLinks = [
  { label: 'About',    path: '/about' },
  { label: 'Pillars',  path: '/pillars' },
  { label: 'Services', path: '/services' },
  { label: 'Contact',  path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={scrolled ? {
          background: isDark
            ? 'rgba(11,16,32,0.88)'
            : 'rgba(245,246,250,0.94)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(79,70,229,0.10)'}`,
        } : { background: 'transparent' }}
      >
        {/* Gradient bottom line — visible when scrolled */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-400"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent 0%, #00BCD4 30%, #1E7BC4 70%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, #7C3AED 30%, #4F46E5 70%, transparent 100%)',
            opacity: scrolled ? 0.5 : 0,
          }}
        />

        <div
          className="px-6 md:px-12 flex items-center justify-between"
          style={{ height: scrolled ? '60px' : '72px', transition: 'height 0.35s ease' }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center select-none" aria-label="Intellinative home">
            <LogoImage height={42} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-[14px] font-medium transition-colors duration-200 group"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                >
                  {link.label}
                  {/* Active indicator */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[1.5px] rounded-full transition-all duration-300"
                    style={{
                      width: active ? '100%' : '0%',
                      background: isDark
                        ? 'linear-gradient(90deg, #00BCD4, #1E7BC4)'
                        : 'linear-gradient(90deg, #7C3AED, #4F46E5)',
                    }}
                  />
                  {/* Hover indicator */}
                  {!active && (
                    <span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 rounded-full group-hover:w-full transition-all duration-300"
                      style={{ background: isDark ? 'rgba(0,188,212,0.35)' : 'rgba(124,58,237,0.35)' }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(15,23,42,0.10)'}`,
                color: 'var(--text-muted)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,188,212,0.45)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-cyan)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(15,23,42,0.10)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
              }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* CTA */}
            <Link
              to="/contact"
              className="relative px-5 py-2 rounded-[14px] text-sm font-semibold overflow-hidden group transition-all duration-300"
              style={{
                fontFamily: 'var(--font-display)',
                background: isDark
                  ? 'linear-gradient(135deg, #00C8E6, #1E7BC4)'
                  : 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: isDark ? '#050F1F' : '#ffffff',
                boxShadow: isDark
                  ? '0 0 20px rgba(0,200,230,0.28)'
                  : '0 0 20px rgba(79,70,229,0.25)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = isDark ? '0 0 32px rgba(0,200,230,0.45)' : '0 0 32px rgba(79,70,229,0.40)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = isDark ? '0 0 20px rgba(0,200,230,0.28)' : '0 0 20px rgba(79,70,229,0.25)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Start Building
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
            style={{
              color: 'var(--text-primary)',
              background: mobileOpen ? (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.07)') : 'transparent',
            }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col"
        style={{
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: mobileOpen ? 'auto' : 'none',
          background: isDark ? 'rgba(11,16,32,0.97)' : 'rgba(245,246,250,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: isDark ? 'linear-gradient(90deg, transparent, #00BCD4 30%, #1E7BC4 70%, transparent)' : 'linear-gradient(90deg, transparent, #7C3AED 30%, #4F46E5 70%, transparent)' }} />

        <div className="flex flex-col items-center justify-center flex-1 gap-9 px-8">
          {navLinks.map((link, i) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-bold transition-all"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(8px)',
                  opacity: mobileOpen ? 1 : 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {link.label}
                {active && (
                  <span className="block h-[2px] w-full mt-1 rounded-full" style={{ background: isDark ? 'linear-gradient(90deg, #00BCD4, #1E7BC4)' : 'linear-gradient(90deg, #7C3AED, #4F46E5)' }} />
                )}
              </Link>
            );
          })}

          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.07)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)'}`,
              color: 'var(--text-muted)',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: mobileOpen ? `${navLinks.length * 50}ms` : '0ms',
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-10 py-3.5 rounded-[14px] text-base font-semibold transition-all"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #00C8E6, #1E7BC4)'
                : 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: isDark ? '#050F1F' : '#ffffff',
              fontFamily: 'var(--font-display)',
              boxShadow: isDark ? '0 0 28px rgba(0,200,230,0.32)' : '0 0 28px rgba(79,70,229,0.28)',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: mobileOpen ? `${(navLinks.length + 1) * 50}ms` : '0ms',
            }}
          >
            Start Building
          </Link>
        </div>

        <div className="pb-10 flex items-center justify-center" style={{ opacity: 0.35 }}>
          <LogoImage height={26} />
        </div>
      </div>
    </>
  );
}
