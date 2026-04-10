import { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { classifyDetection } from '../utils/classifyDetection';

export function useObjectDetection() {
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState('Initializing WebGL backend...');
  const [detections, setDetections] = useState([]);
  const [fps, setFps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const frameCountRef = useRef(0);

  // Load TF.js with WebGL backend and COCO-SSD model
  useEffect(() => {
    let cancelled = false;

    async function loadModel() {
      try {
        setLoadingStatus('Setting up WebGL backend...');
        await tf.setBackend('webgl');
        await tf.ready();

        if (cancelled) return;
        setLoadingStatus('Downloading COCO-SSD model (~5MB)...');

        const loadedModel = await cocoSsd.load({
          base: 'lite_mobilenet_v2',
        });

        if (cancelled) return;
        setLoadingStatus('Model ready!');
        setModel(loadedModel);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load model:', err);
        setLoadingStatus(`Error: ${err.message}`);
      }
    }

    loadModel();
    return () => { cancelled = true; };
  }, []);

  const detect = useCallback(async (videoElement, canvasElement) => {
    if (!model || !videoElement || !canvasElement) return;
    if (videoElement.readyState < 2) return;

    const ctx = canvasElement.getContext('2d');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    const predictions = await model.detect(videoElement);

    // Clear canvas
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    const classified = [];

    for (const pred of predictions) {
      const result = classifyDetection(pred);
      if (!result) continue;

      classified.push(result);

      const [x, y, width, height] = result.bbox;

      // Draw bounding box
      ctx.strokeStyle = result.borderColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // Draw corner accents
      const cornerLen = Math.min(20, width / 4, height / 4);
      ctx.lineWidth = 4;
      // Top-left
      ctx.beginPath();
      ctx.moveTo(x, y + cornerLen);
      ctx.lineTo(x, y);
      ctx.lineTo(x + cornerLen, y);
      ctx.stroke();
      // Top-right
      ctx.beginPath();
      ctx.moveTo(x + width - cornerLen, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + cornerLen);
      ctx.stroke();
      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(x, y + height - cornerLen);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + cornerLen, y + height);
      ctx.stroke();
      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(x + width - cornerLen, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x + width, y + height - cornerLen);
      ctx.stroke();

      // Draw label background
      const label = `${result.label} ${result.confidence}%`;
      ctx.font = 'bold 14px Inter, system-ui, sans-serif';
      const textWidth = ctx.measureText(label).width;
      const labelHeight = 24;
      const labelY = y > labelHeight + 4 ? y - labelHeight - 4 : y;

      ctx.fillStyle = result.borderColor;
      ctx.beginPath();
      ctx.roundRect(x, labelY, textWidth + 16, labelHeight, 4);
      ctx.fill();

      // Draw label text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, x + 8, labelY + 17);
    }

    setDetections(classified);

    // FPS calculation
    frameCountRef.current++;
    const now = performance.now();
    if (now - lastTimeRef.current >= 1000) {
      setFps(frameCountRef.current);
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
  }, [model]);

  const startDetection = useCallback((videoElement, canvasElement) => {
    if (!model) return;
    setIsRunning(true);

    const loop = async () => {
      await detect(videoElement, canvasElement);
      animFrameRef.current = requestAnimationFrame(() => loop());
    };
    loop();
  }, [model, detect]);

  const stopDetection = useCallback(() => {
    setIsRunning(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  return {
    model,
    isLoading,
    loadingStatus,
    detections,
    fps,
    isRunning,
    startDetection,
    stopDetection,
  };
}
