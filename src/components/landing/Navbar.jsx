import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Features',    href: '#features'    },
  { label: 'How It Works',href: '#how-it-works' },
  { label: 'Technology',  href: '#technology'   },
];

export default function Navbar({ onLaunch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: scrolled ? 'rgba(2,4,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s, backdrop-filter 0.4s, border 0.4s',
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(99,102,241,0.2))', border: '1px solid rgba(56,189,248,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#ng)" strokeWidth="2">
              <defs>
                <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>
            <span className="text-gradient-white">Vision</span>
            <span className="text-gradient-blue">Drive</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}
              className="px-4 py-2 rounded-xl text-sm transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onLaunch}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
              color: '#fff',
              boxShadow: '0 0 24px rgba(56,189,248,0.3)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            Launch App
          </motion.button>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(o => !o)}
            style={{ color: 'var(--color-text-secondary)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 rounded-2xl overflow-hidden glass"
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
