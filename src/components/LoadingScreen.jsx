export default function LoadingScreen({ status }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center" style={{ background: 'var(--color-base)' }}>
      {/* Radial glow bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(56,189,248,0.06) 0%, transparent 70%)',
      }} />

      {/* Logo mark */}
      <div className="relative mb-8">
        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0d1525 0%, #111927 100%)', border: '1px solid rgba(56,189,248,0.2)' }}>
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent animate-spin-slow"
            style={{ borderTopColor: '#38bdf8', borderRightColor: 'rgba(56,189,248,0.2)' }} />
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#logo-grad)" strokeWidth="1.5">
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8"/>
                <stop offset="100%" stopColor="#6366f1"/>
              </linearGradient>
            </defs>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 6 }}>
        <span style={{ background: 'linear-gradient(90deg, #e2eaf6 30%, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Vision
        </span>
        <span style={{ background: 'linear-gradient(90deg, #38bdf8, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Drive
        </span>
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 13, marginBottom: 32 }}>
        On-device traffic detection — powered by WebGL
      </p>

      {/* Loading bar */}
      <div className="w-56 h-0.5 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="h-full rounded-full shimmer-bar" style={{ width: '70%' }} />
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{status}</p>

      {/* Tech badges */}
      <div className="flex gap-2 mt-10">
        {['TensorFlow.js', 'WebGL', 'COCO-SSD', 'MobileNet'].map(tech => (
          <span key={tech} className="badge"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
