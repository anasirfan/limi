# Video Scroll Synchronization

A modern, ultra-smooth video scroll synchronization implementation using GSAP ScrollTrigger and Lenis smooth scroll.

## Features

### 🎥 Video Synchronization
- **Perfect Sync**: Video playback perfectly synchronized with scroll progress
- **Bidirectional**: Works smoothly in both scroll directions (up/down)
- **Zero Lag**: Ultra-responsive with minimal delay (0.03s scrub)
- **Smooth Playback**: Optimized video time updates with throttling

### 🚀 Performance Optimizations
- **RequestAnimationFrame**: Smooth 60fps video updates
- **Throttled Updates**: Only update video time when necessary (>0.03s difference)
- **Optimized RAF Loop**: Efficient animation frame management
- **Memory Management**: Proper cleanup of event listeners and animations

### 🎨 Smooth Scrolling
- **Lenis Integration**: Ultra-smooth scroll experience
- **Custom Easing**: Optimized easing function for natural feel
- **GSAP ScrollTrigger**: Precise scroll-based animations
- **Auto-resize**: Responsive to window size changes

### 📱 Responsive Design
- **Mobile Optimized**: Touch-friendly interactions
- **Responsive Typography**: Scales beautifully across devices
- **Flexible Layout**: Adapts to different screen sizes
- **Cross-browser**: Compatible with modern browsers

## Technical Implementation

### Core Technologies
- **GSAP ScrollTrigger**: Scroll-based animation engine
- **Lenis**: Smooth scroll library
- **React Hooks**: Modern React patterns
- **Tailwind CSS**: Utility-first styling

### Key Components

#### VideoScrollHeroOptimized.jsx
The main component featuring:
- Video element with optimized loading
- GSAP ScrollTrigger configuration
- Lenis smooth scroll setup
- Performance monitoring
- Progress indicators

#### Performance Features
```javascript
// Ultra-smooth scrubbing
scrub: 0.03

// Optimized video updates
if (Math.abs(video.currentTime - targetTime) > 0.03) {
  video.currentTime = targetTime;
}

// Custom easing for natural feel
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
```

## Usage

### Basic Implementation
```jsx
import VideoScrollHeroOptimized from './components/VideoScrollHeroOptimized';

export default function Page() {
  return (
    <div>
      <VideoScrollHeroOptimized />
      {/* Additional content */}
    </div>
  );
}
```

### Video Requirements
- **Format**: MP4 (recommended)
- **Codec**: H.264 for best compatibility
- **Optimization**: Compressed for web delivery
- **Location**: `/public/limiai/base_animation.mp4`

## Configuration Options

### Lenis Settings
```javascript
const lenis = new Lenis({
  duration: 1.2,           // Scroll duration
  easing: customEasing,    // Custom easing function
  direction: 'vertical',   // Scroll direction
  smooth: true,           // Enable smooth scroll
  mouseMultiplier: 1,     // Mouse wheel sensitivity
  touchMultiplier: 2,     // Touch sensitivity
});
```

### ScrollTrigger Settings
```javascript
ScrollTrigger.create({
  trigger: container,
  start: 'top top',
  end: 'bottom top',
  scrub: 0.03,           // Ultra-smooth scrubbing
  pin: true,             // Pin video during scroll
  anticipatePin: 1,      // Smooth pin transitions
});
```

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

- **60fps**: Consistent frame rate
- **<16ms**: Frame time for smooth animations
- **Minimal Memory**: Efficient cleanup and management
- **Low CPU**: Optimized rendering pipeline

## Troubleshooting

### Common Issues

1. **Video not loading**
   - Check video path: `/limiai/base_animation.mp4`
   - Ensure video format is supported
   - Verify video is not corrupted

2. **Scroll not smooth**
   - Check GSAP and Lenis installation
   - Verify no conflicting scroll libraries
   - Ensure proper cleanup on unmount

3. **Performance issues**
   - Reduce video quality/size
   - Check for memory leaks
   - Monitor RAF loop efficiency

### Debug Mode
Add console logging to monitor performance:
```javascript
console.log('Video time:', video.currentTime);
console.log('Scroll progress:', progress);
console.log('Target time:', targetTime);
```

## Dependencies

Required packages (already included in project):
- `gsap`: ^3.13.0
- `@studio-freight/lenis`: ^1.0.42
- `react`: ^18.2.0
- `tailwindcss`: ^3.4.1

## License

Part of the Limi project - proprietary license.
