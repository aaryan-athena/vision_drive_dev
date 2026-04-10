import { motion } from 'framer-motion';

export default function Header({ fps, isRunning, onToggle, isModelLoaded, onBack }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between px-5 py-3 flex-shrink-0"
      style={{
        background: 'rgba(2,4,10,0.9)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Left: back + logo */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors"
          style={{ color: 'var(--color-text-secondary)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Home
        </motion.button>

        <div className="w-px h-5" style={{ background: 'var(--color-border)' }} />

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,rgba(56,189,248,0.15),rgba(99,102,241,0.15))', border: '1px solid rgba(56,189,248,0.2)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="url(#hg2)" strokeWidth="2">
              <defs>
                <linearGradient id="hg2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px' }}>
            <span style={{ background: 'linear-gradient(90deg,#e2eaf6,#a0b4cc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Vision</span>
            <span style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Drive</span>
          </span>
        </div>
      </div>

      {/* Center: status pills */}
      <div className="hidden sm:flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.18)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399' }} />
          <span style={{ color: '#34d399', fontSize: 11, fontWeight: 600 }}>WebGL</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>FPS</span>
          <span style={{ color: '#38bdf8', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', minWidth: 18 }}>{fps}</span>
        </div>
      </div>

      {/* Right: start/stop */}
      <motion.button
        onClick={onToggle}
        disabled={!isModelLoaded}
        whileHover={isModelLoaded ? { scale: 1.04 } : {}}
        whileTap={isModelLoaded ? { scale: 0.97 } : {}}
        className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold"
        style={isRunning
          ? { background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }
          : { background: 'linear-gradient(135deg,rgba(56,189,248,0.15),rgba(99,102,241,0.15))',
              color: '#38bdf8', border: '1px solid rgba(56,189,248,0.25)', opacity: isModelLoaded ? 1 : 0.4 }}
      >
        {isRunning
          ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>Stop</>
          : <><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>Start</>
        }
      </motion.button>
    </motion.header>
  );
}
