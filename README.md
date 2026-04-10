# VisionDrive

VisionDrive is an AI-powered traffic detection web application running entirely in your browser. It leverages TensorFlow.js and WebGL to identify vehicles, pedestrians, and traffic lights in real-time from your device's live camera feed—ensuring 100% privacy with zero server side uploads.

## Features
- **Traffic Light Detection:** Instantly identifies traffic signals.
- **Vehicle Tracking:** Detects cars, trucks, buses, motorcycles, and bicycles.
- **Pedestrian Detection:** Identifies people to support driver awareness.
- **Real-Time Inference:** Fast object detection using WebGL hardware acceleration.
- **100% On-Device Privacy:** Model inferences run entirely locally.

## Tech Stack
- **Frontend:** React (v19) + Vite
- **Machine Learning:** TensorFlow.js, COCO-SSD, MobileNet v2 backbone
- **Styling:** TailwindCSS (v4)
- **Animations:** Framer Motion

## Folder Structure and File Explanations

### `src/components/landing/`
Contains modular UI sections used strictly on the Landing Page.
- **`Navbar.jsx` & `Footer.jsx`:** The header/footer of the landing page.
- **`Hero.jsx`:** First impression layout with mock detections and action buttons.
- **`Features.jsx`:** Outlines the core capabilities like traffic light and pedestrian detection.
- **`HowItWorks.jsx`:** A step-by-step explanatory guide for the usage workflow.
- **`Stats.jsx`:** View highlighting the efficiency of the platform.
- **`TechSection.jsx`:** Displays the modern frameworks powering the app.

### `src/components/`
Contains common or core application components.
- **`DetectionPanel.jsx`:** A sidebar that displays categorised tracking metrics, like FPS and lists detected items with their confidence scores.
- **`Header.jsx`:** A simple, live header inside the detection page view.
- **`LoadingScreen.jsx`:** An overlay displayed when the web app is fetching the webcam stream or initialising the ML model.
- **`WebcamFeed.jsx`:** Manages the video stream binding and renders the WebGL canvas with bounding boxes identifying objects.

### `src/pages/`
The major views mapped linearly across the webapp flow.
- **`LandingPage.jsx`:** Composes all sections from the `landing` components directory.
- **`DetectionPage.jsx`:** Main view once launched. It integrates components like `Header`, `WebcamFeed` and `DetectionPanel` along with the detection logic hook.

### `src/hooks/`
- **`useObjectDetection.js`:** The central engine hook for loading the COCO-SSD model, pulling frames via the `requestAnimationFrame` loop, producing predictions using TensorFlow.js, and populating state variables returned to the user interface.

### `src/utils/`
- **`classifyDetection.js`:** Business logic or data parsing script aiding to classify the COCO object categories explicitly to visually tailored groups (like coloring pedestrian bounding boxes versus traffic light markers separately).

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Production Build:**
   ```bash
   npm run build
   ```

## Privacy Notice
VisionDrive operates using local memory bindings. Because everything relies upon the TensorFlow.js instance locally, zero frames or telemetry ever departs from your local device.
