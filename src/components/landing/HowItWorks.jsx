import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    n: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    title: 'Allow Camera Access',
    desc:  'Grant your browser permission to access your webcam. Your feed never leaves your device.',
    color: '#38bdf8',
  },
  {
    n: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M9 8l2 2 4-4"/>
      </svg>
    ),
    title: 'Model Loads Locally',
    desc:  'The COCO-SSD model (~5 MB) downloads once and runs on your GPU via WebGL. No cloud needed.',
    color: '#a78bfa',
  },
  {
    n: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Detection Begins',
    desc:  'Click Start and the AI instantly begins detecting vehicles, traffic lights and pedestrians in every frame.',
    color: '#34d399',
  },
  {
    n: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h18v18H3z" strokeOpacity=".3"/><path d="M9 9h6v6H9z"/>
        <path d="M3 9h6M15 9h6M3 15h6M15 15h6M9 3v6M9 15v6M15 3v6M15 15v6"/>
      </svg>
    ),
    title: 'Analyse Results',
    desc:  'Bounding boxes render on the live feed. The sidebar shows categorised detections with confidence scores.',
    color: '#fbbf24',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="py-16 px-6" style={{ background: 'rgba(8,13,24,0.5)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="glass-card rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}>
            Getting Started
          </span>
          <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginTop: 16, marginBottom: 12 }}>
            <span className="text-gradient-white">Up and running</span>{' '}
            <span className="text-gradient-blue">in seconds</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
            No installation, no account, no server. Just open the app and start detecting.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-4"
            >
              {/* Step icon circle */}
              <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center glass-card"
                style={{ border: `1px solid ${step.color}30`, color: step.color,
                  boxShadow: `0 0 30px ${step.color}15` }}>
                {step.icon}
                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: step.color, color: '#02040a' }}>
                  {i + 1}
                </span>
              </div>
              <h3 style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: 15 }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
