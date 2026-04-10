import { useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useObjectDetection } from '../hooks/useObjectDetection';
import Header from '../components/Header';
import WebcamFeed from '../components/WebcamFeed';
import DetectionPanel from '../components/DetectionPanel';
import LoadingScreen from '../components/LoadingScreen';

export default function DetectionPage({ onBack }) {
  const videoRef = useRef(null);

  // Lock scroll while in detection page
  useEffect(() => {
    document.body.classList.add('app-page');
    return () => document.body.classList.remove('app-page');
  }, []);

  const { model, isLoading, loadingStatus, detections, fps, isRunning, startDetection, stopDetection } =
    useObjectDetection();

  const handleCameraReady = useCallback((video) => {
    videoRef.current = video;
  }, []);

  const handleToggle = useCallback(() => {
    if (isRunning) {
      stopDetection();
    } else {
      const video = videoRef.current;
      if (!video) return;
      startDetection(video, video.nextElementSibling);
    }
  }, [isRunning, startDetection, stopDetection]);

  if (isLoading) return <LoadingScreen status={loadingStatus} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-base)', overflow: 'hidden' }}
    >
      <Header fps={fps} isRunning={isRunning} onToggle={handleToggle} isModelLoaded={!!model} onBack={onBack} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', gap: 0 }}>
        {/* Camera feed */}
        <div style={{ flex: 1, padding: '12px 12px 12px 16px', minWidth: 0 }}>
          <div className="gradient-border glow-video" style={{ height: '100%', borderRadius: 16, overflow: 'hidden' }}>
            <WebcamFeed onReady={handleCameraReady} />
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{
          width: 360,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid var(--color-border)',
          background: 'rgba(8,13,24,0.7)',
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
        }}>
          <DetectionPanel detections={detections} fps={fps} isRunning={isRunning} />
        </aside>
      </div>

      {/* Status bar */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '7px 20px',
        borderTop: '1px solid var(--color-border)',
        background: 'rgba(2,4,10,0.9)',
      }}>
        <div className="flex items-center gap-3">
          {['COCO-SSD · MobileNet v2 Lite', 'WebGL · On-device only'].map((item, i) => (
            <span key={i} style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>
              {i > 0 && <span style={{ marginRight: 12, opacity: 0.3 }}>|</span>}
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: isRunning ? '#34d399' : '#3d4f63',
            animation: isRunning ? 'pulse-dot 1.5s ease-in-out infinite' : 'none',
          }} />
          <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>
            {isRunning ? 'Detecting' : 'Idle'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
