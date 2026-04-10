import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryConfig } from '../utils/classifyDetection';

const CATEGORIES = getCategoryConfig();

function CategoryCard({ category, items, config }) {
  const active = items.length > 0;
  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden"
      style={{
        background: active ? `${config.borderColor}09` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${active ? config.borderColor + '30' : 'rgba(255,255,255,0.05)'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: active ? `${config.borderColor}18` : 'rgba(255,255,255,0.04)', fontSize: 14 }}>
            {config.icon}
          </div>
          <span style={{ color: active ? config.borderColor : 'var(--color-text-muted)', fontWeight: 600, fontSize: 13 }}>
            {category}
          </span>
        </div>
        <motion.span
          key={items.length}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          className="font-mono font-bold text-xs px-2.5 py-1 rounded-full"
          style={{
            background: active ? `${config.borderColor}22` : 'rgba(255,255,255,0.04)',
            color: active ? config.borderColor : 'var(--color-text-muted)',
          }}
        >
          {items.length}
        </motion.span>
      </div>

      {/* Items */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="px-4 pb-3 space-y-1.5"
          >
            {items.map((item, i) => (
              <motion.div
                key={`${item.label}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-xl px-3 py-2"
                style={{ background: 'rgba(0,0,0,0.25)' }}
              >
                <span style={{ color: 'var(--color-text-secondary)', fontSize: 12, flex: 1 }}>{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-14 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.confidence}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full rounded-full"
                      style={{ background: config.borderColor }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold" style={{ color: config.borderColor, minWidth: 30 }}>
                    {item.confidence}%
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p className="px-4 pb-3" style={{ color: 'var(--color-text-muted)', fontSize: 11, fontStyle: 'italic' }}>
          No detections
        </p>
      )}
    </motion.div>
  );
}

export default function DetectionPanel({ detections, fps, isRunning }) {
  const grouped = useMemo(() => {
    const g = Object.fromEntries(Object.keys(CATEGORIES).map(k => [k, []]));
    detections.forEach(d => { if (g[d.category]) g[d.category].push(d); });
    return g;
  }, [detections]);

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: 16, marginBottom: 2 }}>
          Live Detections
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>
          COCO-SSD · vehicles, traffic lights, pedestrians
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: 'Objects', value: detections.length, color: '#38bdf8' },
            { label: 'FPS',     value: fps,               color: '#a78bfa' },
            { label: 'Status',  value: isRunning ? 'ON' : 'OFF', color: isRunning ? '#34d399' : '#3d4f63' },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <motion.div
                key={stat.value}
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ color: stat.color, fontWeight: 800, fontSize: 20, lineHeight: 1, fontFamily: 'var(--font-mono)' }}
              >
                {stat.value}
              </motion.div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 10, marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category cards */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        <AnimatePresence>
          {Object.entries(CATEGORIES).map(([cat, cfg]) => (
            <CategoryCard key={cat} category={cat} items={grouped[cat] || []} config={cfg} />
          ))}
        </AnimatePresence>
      </div>

      {/* Detection log */}
      <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Detection Log
        </div>
        <div className="rounded-2xl p-3 max-h-28 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.35)', fontFamily: 'var(--font-mono)' }}>
          <AnimatePresence initial={false}>
            {detections.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: 11, fontStyle: 'italic', textAlign: 'center' }}>
                {isRunning ? 'Scanning…' : 'Press Start to begin'}
              </p>
            ) : detections.map((d, i) => (
              <motion.div
                key={`${d.label}-${i}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 py-0.5"
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.borderColor }} />
                <span style={{ color: 'var(--color-text-secondary)', fontSize: 11, flex: 1 }}>{d.label}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>{d.confidence}%</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
