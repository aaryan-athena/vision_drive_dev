import { useRef, useEffect, useState } from 'react';

export default function WebcamFeed({ onReady }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraError, setCameraError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let stream = null;
    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadeddata = () => {
            setIsReady(true);
            onReady?.(videoRef.current);
          };
        }
      } catch (err) {
        setCameraError(err.message);
      }
    }
    start();
    return () => { stream?.getTracks().forEach(t => t.stop()); };
  }, [onReady]);

  if (cameraError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8"
        style={{ background: 'var(--color-surface)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <line x1="12" y1="11" x2="12" y2="15"/><line x1="12" y1="18" x2="12.01" y2="18"/>
          </svg>
        </div>
        <div className="text-center">
          <h3 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: 6 }}>
            Camera access required
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 13, maxWidth: 320 }}>
            Please allow camera permissions to use live detection.
          </p>
          <p style={{ color: '#f87171', fontSize: 11, marginTop: 8, fontFamily: 'var(--font-mono)' }}>
            {cameraError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#000' }}>
      <video ref={videoRef} autoPlay playsInline muted
        className="w-full h-full object-contain" />
      <canvas ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 60%, rgba(4,6,13,0.5) 100%)',
      }} />

      {/* Scan line animation */}
      {isReady && (
        <div className="absolute left-0 right-0 h-px pointer-events-none animate-scan" style={{
          background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.4), rgba(56,189,248,0.6), rgba(56,189,248,0.4), transparent)',
        }} />
      )}

      {/* HUD corners */}
      {isReady && (
        <>
          <div className="hud-corner hud-tl" />
          <div className="hud-corner hud-tr" />
          <div className="hud-corner hud-bl" />
          <div className="hud-corner hud-br" />
        </>
      )}

      {/* Live badge */}
      {isReady && (
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{ background: 'rgba(4,6,13,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse-dot" />
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>
            LIVE
          </span>
        </div>
      )}

      {/* Camera loading */}
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: 'var(--color-surface)' }}>
          <div className="w-10 h-10 rounded-full border-2 border-transparent animate-spin-slow"
            style={{ borderTopColor: '#38bdf8', borderRightColor: 'rgba(56,189,248,0.2)' }} />
          <span style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Starting camera…</span>
        </div>
      )}
    </div>
  );
}
