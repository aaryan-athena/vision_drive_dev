// Maps COCO-SSD classes to Indian traffic categories
// COCO-SSD can detect 80 object classes — we focus on traffic-relevant ones

const VEHICLE_CLASSES = new Set([
  'car', 'truck', 'bus', 'motorcycle', 'bicycle', 'auto rickshaw',
]);

const TRAFFIC_LIGHT_CLASSES = new Set([
  'traffic light',
]);

const SIGN_CLASSES = new Set([
  'stop sign',
]);

// Additional heuristic categories for Indian roads
const CATEGORY_CONFIG = {
  'Traffic Lights': {
    icon: '🚦',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: '#f59e0b',
  },
  'Road Signs': {
    icon: '⛔',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#ef4444',
  },
  Vehicles: {
    icon: '🚗',
    color: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.15)',
    borderColor: '#6366f1',
  },
  Pedestrians: {
    icon: '🚶',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: '#22c55e',
  },
};

const INDIAN_VEHICLE_LABELS = {
  car: 'Car',
  truck: 'Truck',
  bus: 'Bus (Public Transport)',
  motorcycle: 'Two-Wheeler',
  bicycle: 'Bicycle / Cycle Rickshaw',
};

export function classifyDetection(prediction) {
  const cls = prediction.class.toLowerCase();
  const score = Math.round(prediction.score * 100);

  if (TRAFFIC_LIGHT_CLASSES.has(cls)) {
    return {
      category: 'Traffic Lights',
      label: 'Traffic Signal',
      confidence: score,
      bbox: prediction.bbox,
      ...CATEGORY_CONFIG['Traffic Lights'],
    };
  }

  if (SIGN_CLASSES.has(cls)) {
    return {
      category: 'Road Signs',
      label: 'Stop Sign',
      confidence: score,
      bbox: prediction.bbox,
      ...CATEGORY_CONFIG['Road Signs'],
    };
  }

  if (VEHICLE_CLASSES.has(cls)) {
    return {
      category: 'Vehicles',
      label: INDIAN_VEHICLE_LABELS[cls] || cls,
      confidence: score,
      bbox: prediction.bbox,
      ...CATEGORY_CONFIG['Vehicles'],
    };
  }

  if (cls === 'person') {
    return {
      category: 'Pedestrians',
      label: 'Pedestrian',
      confidence: score,
      bbox: prediction.bbox,
      ...CATEGORY_CONFIG['Pedestrians'],
    };
  }

  return null;
}

export function getCategoryConfig() {
  return CATEGORY_CONFIG;
}

// Bounding box colors per category
export function getBboxColor(category) {
  return CATEGORY_CONFIG[category]?.borderColor || '#94a3b8';
}
