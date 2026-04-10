import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TECH = [
  { name: 'TensorFlow.js', desc: 'ML inference engine', color: '#f59e0b' },
  { name: 'WebGL',          desc: 'GPU acceleration',    color: '#38bdf8' },
  { name: 'COCO-SSD',       desc: 'Object detection model', color: '#a78bfa' },
  { name: 'MobileNet v2',   desc: 'Lightweight backbone',   color: '#34d399' },
  { name: 'React',          desc: 'UI framework',           color: '#38bdf8' },
  { name: 'Framer Motion',  desc: 'Animations',             color: '#ec4899' },
  { name: 'TailwindCSS',    desc: 'Styling',                color: '#06b6d4' },
  { name: 'Vite',           desc: 'Build tool',             color: '#fbbf24' },
];

export default function TechSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="technology" className="py-16 px-6" style={{ background: 'rgba(8,13,24,0.4)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="glass-card rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>
            Tech Stack
          </span>
          <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginTop: 16, marginBottom: 12 }}>
            <span className="text-gradient-white">Built with</span>{' '}
            <span className="text-gradient-blue">modern technology</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
            Every component chosen for performance, privacy and developer experience.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {TECH.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.06, y: -3 }}
              className="glass-card rounded-xl px-5 py-3 flex flex-col items-center gap-1 cursor-default"
              style={{ border: `1px solid ${t.color}20`, minWidth: 110 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: 13 }}>{t.name}</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>{t.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
