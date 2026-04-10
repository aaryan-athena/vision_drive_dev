import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="6" strokeOpacity=".4"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
      </svg>
    ),
    title:   'Traffic Light Detection',
    desc:    'Instantly identifies traffic signals and their state in real-time from your camera feed.',
    color:   '#fbbf24',
    glow:    'rgba(251,191,36,0.15)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title:   'Vehicle Tracking',
    desc:    'Detects and classifies cars, trucks, buses, motorcycles and bicycles with bounding boxes.',
    color:   '#38bdf8',
    glow:    'rgba(56,189,248,0.15)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="5" r="2"/><path d="M12 7v7M9 21l3-7 3 7M9 14H6l-2 4M15 14h3l2 4"/>
      </svg>
    ),
    title:   'Pedestrian Detection',
    desc:    'Identifies people on the road to support driver awareness and safety systems.',
    color:   '#34d399',
    glow:    'rgba(52,211,153,0.15)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title:   'Real-Time Inference',
    desc:    'Runs at up to 30 FPS using TensorFlow.js with a WebGL hardware-accelerated backend.',
    color:   '#a78bfa',
    glow:    'rgba(167,139,250,0.15)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title:   '100% On-Device',
    desc:    'Everything runs locally in your browser. No data is sent to any server — complete privacy.',
    color:   '#6366f1',
    glow:    'rgba(99,102,241,0.15)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
    title:   'Live Analytics',
    desc:    'Track detection counts, FPS, and per-category breakdowns in a live sidebar dashboard.',
    color:   '#22d3ee',
    glow:    'rgba(34,211,238,0.15)',
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4"
      style={{ cursor: 'default' }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: feature.glow, border: `1px solid ${feature.color}30`, color: feature.color }}>
        {feature.icon}
      </div>
      <div>
        <h3 style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
          {feature.title}
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
          {feature.desc}
        </p>
      </div>
      {/* Bottom accent */}
      <div className="h-0.5 rounded-full mt-auto" style={{ background: `linear-gradient(90deg, ${feature.color}60, transparent)` }} />
    </motion.div>
  );
}

export default function Features() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="glass-card rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}>
            Capabilities
          </span>
          <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginTop: 16, marginBottom: 16 }}>
            <span className="text-gradient-white">Everything you need to</span><br />
            <span className="text-gradient-blue">understand the road</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Powered by a state-of-the-art COCO-SSD model, VisionDrive delivers accurate,
            real-time object detection directly in your browser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
