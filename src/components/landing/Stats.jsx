import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 80,   suffix: '+',  label: 'Object Classes',      color: '#38bdf8' },
  { value: 30,   suffix: 'fps', label: 'Real-time Inference', color: '#a78bfa' },
  { value: 0,    suffix: 'ms', label: 'Server Latency',      color: '#34d399', note: 'On-device only' },
  { value: 100,  suffix: '%',  label: 'Private & Secure',    color: '#fbbf24' },
];

function CountUp({ target, suffix, color, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref} style={{ color, fontFamily: 'var(--font-mono)' }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="glass-card rounded-3xl p-12"
          style={{ border: '1px solid rgba(56,189,248,0.1)', boxShadow: '0 0 60px rgba(56,189,248,0.05)' }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, lineHeight: 1 }}>
                  <CountUp target={stat.value} suffix={stat.suffix} color={stat.color} />
                </div>
                <div style={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: 14, marginTop: 10 }}>
                  {stat.label}
                </div>
                {stat.note && (
                  <div style={{ color: 'var(--color-text-muted)', fontSize: 11, marginTop: 4 }}>
                    {stat.note}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
