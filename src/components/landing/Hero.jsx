import { motion } from 'framer-motion';

const BADGES = ['TensorFlow.js', 'WebGL', 'COCO-SSD', 'On-Device'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

// Animated detection mockup cards
const MOCK_DETECTIONS = [
  { label: 'Traffic Light', conf: 94, color: '#fbbf24', top: '18%', left: '8%', delay: 0.8 },
  { label: 'Car',           conf: 98, color: '#38bdf8', top: '55%', left: '4%', delay: 1.1 },
  { label: 'Pedestrian',    conf: 87, color: '#34d399', top: '35%', right: '6%', delay: 1.4 },
  { label: 'Truck',         conf: 91, color: '#38bdf8', top: '68%', right: '8%', delay: 1.7 },
];

function MockCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute glass-card rounded-xl px-3 py-2 flex items-center gap-2 animate-float"
      style={{
        top: item.top, left: item.left, right: item.right,
        border: `1px solid ${item.color}30`,
        animationDelay: `${item.delay * 0.5}s`,
      }}
    >
      <div className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: item.color }} />
      <span style={{ color: 'var(--color-text-primary)', fontSize: 12, fontWeight: 600 }}>{item.label}</span>
      <span className="font-mono text-xs font-bold" style={{ color: item.color }}>{item.conf}%</span>
    </motion.div>
  );
}

export default function Hero({ onLaunch }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dots">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute animate-orb"
          style={{ width: 600, height: 600, top: '-10%', left: '-15%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
            borderRadius: '50%' }} />
        <div className="absolute animate-orb"
          style={{ width: 500, height: 500, bottom: '-10%', right: '-10%', animationDelay: '3s',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            borderRadius: '50%' }} />
        <div className="absolute animate-orb"
          style={{ width: 300, height: 300, top: '40%', right: '20%', animationDelay: '1.5s',
            background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
            borderRadius: '50%' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center pt-20">
        {/* Tech badges */}
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {BADGES.map(b => (
            <span key={b} className="glass-card rounded-full px-3 py-1 text-xs font-medium"
              style={{ color: 'var(--color-text-secondary)', border: '1px solid rgba(56,189,248,0.15)' }}>
              {b}
            </span>
          ))}
        </motion.div>

        {/* Heading */}
        <motion.h1 {...fadeUp(0.2)}
          style={{ fontSize: 'clamp(42px, 7vw, 88px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 24 }}>
          <span className="text-gradient-white">Detect Traffic.</span><br />
          <span className="text-gradient-blue">Understand Roads.</span><br />
          <span style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            In Real-Time.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p {...fadeUp(0.3)}
          style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: 560, margin: '0 auto 40px' }}>
          AI-powered traffic detection running entirely in your browser.
          Identify vehicles, traffic lights and pedestrians from your live camera feed —
          no server, no uploads, complete privacy.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            onClick={onLaunch}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #6366f1)', color: '#fff', boxShadow: '0 0 24px rgba(56,189,248,0.3)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            Launch App
          </motion.button>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--color-text-primary)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Learn More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </motion.a>
        </motion.div>

        {/* Detection mock cards */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-20 mx-auto rounded-3xl overflow-hidden"
          style={{
            maxWidth: 700,
            height: 360,
            background: 'linear-gradient(135deg, rgba(13,21,46,0.8), rgba(8,13,24,0.9))',
            border: '1px solid rgba(56,189,248,0.15)',
            boxShadow: '0 0 80px rgba(56,189,248,0.08), 0 40px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Fake camera grid overlay */}
          <div className="absolute inset-0 bg-dots opacity-40" />
          {/* Scan line */}
          <div className="absolute left-0 right-0 h-px animate-scan"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(56,189,248,0.5),transparent)' }} />
          {/* HUD corners */}
          <div className="hud-tl hud-corner" />
          <div className="hud-tr hud-corner" />
          <div className="hud-bl hud-corner" />
          <div className="hud-br hud-corner" />
          {/* Live badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 glass rounded-full px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse-dot" />
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>LIVE</span>
          </div>
          {/* Centered label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>Camera feed preview</p>
          </div>
          {/* Floating detection cards */}
          {MOCK_DETECTIONS.map((item, i) => (
            <MockCard key={i} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.1em' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
