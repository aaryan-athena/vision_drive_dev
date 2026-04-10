import { motion } from 'framer-motion';

export default function Footer({ onLaunch }) {
  return (
    <footer className="py-24 px-6" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-5xl mx-auto">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass-card rounded-3xl p-12 text-center mb-16"
          style={{ border: '1px solid rgba(56,189,248,0.12)', boxShadow: '0 0 80px rgba(56,189,248,0.06)' }}
        >
          <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
            <div style={{ position:'absolute', width:400, height:400, top:'-30%', left:'-10%',
              background:'radial-gradient(circle,rgba(56,189,248,0.07) 0%,transparent 70%)', borderRadius:'50%' }}/>
            <div style={{ position:'absolute', width:300, height:300, bottom:'-20%', right:'5%',
              background:'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 70%)', borderRadius:'50%' }}/>
          </div>
          <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12 }}>
            <span className="text-gradient-white">Ready to see the road</span>{' '}
            <span className="text-gradient-blue">differently?</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 16, marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
            Launch VisionDrive and start detecting traffic in real-time — right in your browser.
          </p>
          <motion.button
            onClick={onLaunch}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base"
            style={{ background: 'linear-gradient(135deg,#38bdf8,#6366f1)', color:'#fff', boxShadow:'0 0 24px rgba(56,189,248,0.3)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            Launch App
          </motion.button>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,rgba(56,189,248,0.2),rgba(99,102,241,0.2))', border:'1px solid rgba(56,189,248,0.2)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="url(#fg)" strokeWidth="2.5">
                <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#6366f1"/>
                </linearGradient></defs>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <span style={{ fontWeight:700, fontSize:14 }}>
              <span className="text-gradient-white">Vision</span>
              <span className="text-gradient-blue">Drive</span>
            </span>
          </div>
          <p style={{ color:'var(--color-text-muted)', fontSize:13 }}>
            On-device traffic detection · Powered by TensorFlow.js &amp; WebGL
          </p>
        </div>
      </div>
    </footer>
  );
}
