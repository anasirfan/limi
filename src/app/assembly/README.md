# Limi Assembly - Interactive Modular Lighting Showcase

A comprehensive scroll-based interactive layout that visually demonstrates how the Limi modular lighting system works, showcasing the plug-and-play assembly process with cutting-edge web technologies.

## 🎯 Overview

This interactive experience guides users through the modular assembly process, highlighting:
- **Base Installation** - Zero-config ceiling mounting
- **Cable Connection** - Smart power distribution
- **Pendant Attachment** - Magnetic alignment system
- **Module Integration** - AI-powered sensor modules

## 🛠 Tech Stack

- **Next.js 15** (App Router)
- **TailwindCSS** for styling
- **GSAP + ScrollTrigger** for scroll-based animations
- **Framer Motion** for component animations
- **Anime.js** for micro-interactions
- **AOS** for reveal effects
- **Lottie** for 2D animations (placeholders)
- **PlayCanvas** for 3D viewer (placeholder)
- **Canvas Confetti** for celebration effects
- **TSParticles** for particle systems
- **Lenis** for smooth scrolling

## 🎨 Design System

### Brand Colors
- **Charleston Green**: `#292929` - Primary dark
- **Emerald**: `#54bb74` - Primary accent
- **Eton**: `#93cfa2` - Secondary accent
- **Soft Beige**: `#f3ebe2` - Light background

### Design Principles
- **Neumorphism** - Soft shadows and depth for cards
- **Glassmorphism** - Transparent overlays with blur effects
- **Brutalist Typography** - Bold, impactful headings
- **Scroll-based Storytelling** - Progressive revelation

## 📁 Component Structure

```
/assembly/
├── page.js                 # Main assembly page
├── components/
│   ├── Hero.jsx           # Fullscreen intro with particles
│   ├── AssemblyScroll.jsx # Step-by-step assembly process
│   ├── SensorModuleCard.jsx # Interactive sensor cards
│   ├── InteractiveViewer.jsx # 3D model viewer
│   ├── BenefitTimeline.jsx # Scrolling benefits timeline
│   └── CTA.jsx            # Final call-to-action
└── README.md              # This documentation
```

## 🚀 Features

### Hero Section
- **Particle Background** - Interactive TSParticles system
- **Floating Icons** - Animated component representations
- **Gradient Typography** - Brand-aligned text styling
- **Smooth Scroll Indicator** - Guides user interaction

### Assembly Scroll
- **Progressive Assembly** - 4-step visual storytelling
- **GSAP ScrollTrigger** - Precise scroll-based animations
- **Timeline Progress** - Visual progress indicator
- **Responsive Layout** - Alternating left/right content

### Sensor Modules
- **Glassmorphism Cards** - Transparent, blurred backgrounds
- **Anime.js Interactions** - Smooth hover animations
- **Technical Tooltips** - Detailed specifications
- **3D Transform Effects** - Depth and perspective

### Interactive Viewer
- **PlayCanvas Integration** - 3D model rendering (placeholder)
- **Hotspot System** - Interactive component markers
- **View Mode Switching** - Assembly/Lighting/Sensor views
- **Fullscreen Support** - Immersive experience

### Benefit Timeline
- **Scroll-triggered Reveals** - GSAP-powered animations
- **Confetti Celebrations** - Canvas-confetti rewards
- **Progress Tracking** - Visual completion indicators
- **Interactive Exploration** - Click-to-explore benefits

### CTA Section
- **Animated Glow Borders** - Rotating gradient effects
- **Neumorphism Footer** - Soft shadow depth
- **Social Integration** - Contact and social links
- **Tech Credits** - Development acknowledgments

## 🎬 Animation Details

### Scroll Animations
- **Background Transitions** - Color morphing based on scroll
- **Parallax Effects** - Multi-layer depth simulation
- **Element Reveals** - Staggered entrance animations
- **Progress Indicators** - Real-time scroll feedback

### Micro-interactions
- **Hover States** - Scale, glow, and transform effects
- **Click Feedback** - Immediate visual responses
- **Loading States** - Smooth transition placeholders
- **Error Handling** - Graceful fallback animations

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Stacked layout, touch-optimized
- **Tablet**: 768px - 1024px - Hybrid interactions
- **Desktop**: > 1024px - Full feature set

### Optimizations
- **Touch Gestures** - Mobile-friendly interactions
- **Performance** - Optimized animation frames
- **Accessibility** - ARIA labels and keyboard navigation
- **SEO** - Semantic HTML structure

## 🔧 Development Notes

### Animation Placeholders
- **Lottie Files** - Replace `<div>` placeholders with actual animations
- **3D Models** - Integrate real PlayCanvas scenes
- **Video Content** - Add assembly demonstration videos

### Performance Considerations
- **Lazy Loading** - Components load on scroll
- **Animation Cleanup** - Proper GSAP/Anime.js disposal
- **Memory Management** - Particle system optimization

### Future Enhancements
- **WebGL Shaders** - Advanced visual effects
- **Audio Integration** - Sound design for interactions
- **AR Preview** - Mobile augmented reality
- **Real-time Configurator** - Live product customization

## 🚀 Getting Started

1. **Navigate to Assembly Page**:
   ```
   http://localhost:3000/assembly
   ```

2. **Development Mode**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 🎯 User Journey

1. **Hero Impact** - Immediate visual engagement
2. **Assembly Education** - Step-by-step learning
3. **Sensor Discovery** - Technical exploration
4. **3D Interaction** - Hands-on experience
5. **Benefit Understanding** - Value proposition
6. **Action Conversion** - Clear next steps

## 📊 Analytics Integration

Ready for tracking with existing Umami setup:
- **Scroll Depth** - User engagement metrics
- **Interaction Events** - Component engagement
- **Conversion Tracking** - CTA performance
- **Session Duration** - Experience completion

## 🎨 Brand Alignment

Maintains consistency with existing Limi components:
- **Color Harmony** - Matches brand palette
- **Typography Scale** - Consistent font weights
- **Component Patterns** - Reusable design elements
- **Animation Language** - Cohesive motion design

---

**Built with ❤️ for the future of modular lighting**
