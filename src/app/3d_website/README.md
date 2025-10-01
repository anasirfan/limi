# 3D AI Base Storytelling Website

A cinematic, scroll-driven 3D storytelling experience showcasing the AI Base model using Three.js, GSAP, and ScrollTrigger.

## 🎬 Features

### **Cinematic Scroll Experience**
- Smooth scroll-driven animations synchronized with 3D model transformations
- 5 story sections with unique camera movements and model animations
- Professional lighting setup with dynamic effects

### **3D Model Animations**
1. **Intro Scene** - Camera orbits around the base with smooth rotation
2. **Exploded View** - Parts separate to show internal components
3. **AI Core Highlight** - Zoom into PCB with glowing effect
4. **Integration** - Parts reassemble with cinematic camera movement
5. **Closing Scene** - Final pullback with ambient lighting

### **Text Storytelling**
- Fade/slide animations for titles, subtitles, and descriptions
- Gradient text effects with glow shadows
- Responsive typography for all screen sizes

## 📁 Project Structure

```
/app/3d_website/
├── page.jsx                      # Main page component
├── components/
│   ├── ThreeScene.jsx           # Three.js canvas & 3D model handling
│   └── StorySection.jsx         # Text overlay components with GSAP
└── README.md                     # This file
```

## 🚀 Technologies Used

- **Next.js 15** - App router with client components
- **Three.js** - 3D rendering and model loading
- **GSAP 3** - Animation engine
- **ScrollTrigger** - Scroll-based animation control
- **Tailwind CSS** - Styling and responsive design

## 🎨 Animation Breakdown

### **Section 1: Intro (Welcome)**
```javascript
- Camera: Orbits 360° around model
- Model: Slow Y-axis rotation
- Camera Position: (sin(angle)*6, 2+progress, cos(angle)*6)
- Duration: Full section scroll
```

### **Section 2: Exploded View**
```javascript
- Parts: Separate outward in random directions
- Camera: Pulls back to show explosion
- Rotation: Parts rotate during separation
- Max Distance: 3 units from origin
```

### **Section 3: AI Core**
```javascript
- Parts: Return to original positions
- Camera: Zooms into center (AI Core)
- Lighting: Core glow intensity 0→5
- Rim Light: Increases from 0.8→2.0
```

### **Section 4: Integration**
```javascript
- Parts: Fully reassembled
- Camera: Smooth pullback with arc movement
- Model: 360° rotation
- Glow: Fades out gradually
```

### **Section 5: Closing**
```javascript
- Camera: Pulls far back for final view
- Model: Additional 180° rotation
- Lighting: Fades to ambient
- Position: (0, 3+progress*2, 10+progress*5)
```

## 🎯 Key Components Explained

### **ThreeScene.jsx**

#### **Scene Setup**
- Black background with fog effect
- PerspectiveCamera (45° FOV)
- WebGL renderer with antialiasing
- Shadow mapping enabled

#### **Lighting System**
```javascript
1. Ambient Light (0.4 intensity) - Overall illumination
2. Directional Light (1.5 intensity) - Key light from top-right
3. Fill Light (0.6 intensity) - Blue tint from opposite side
4. Rim Light (0.8 intensity) - Purple backlight for edges
5. Point Light (0-5 intensity) - AI Core glow effect
```

#### **Model Loading**
- GLTFLoader for .glb/.gltf files
- Automatic shadow casting/receiving
- Material enhancement (metalness: 0.7, roughness: 0.3)
- Part storage for exploded view animation

#### **ScrollTrigger Integration**
- 5 separate ScrollTrigger instances (one per section)
- `scrub: 1` for smooth scroll-sync
- `onUpdate` callbacks for real-time transformations
- Camera and model position/rotation updates

### **StorySection.jsx**

#### **Text Animations**
```javascript
Timeline Sequence:
1. Title: opacity 0→1, y 100→0, scale 0.8→1
2. Subtitle: opacity 0→1, y 50→0 (overlaps -0.6s)
3. Description: opacity 0→1, y 30→0 (overlaps -0.4s)
4. Fade Out: All elements y 0→-50, opacity 1→0
```

#### **Visual Effects**
- Gradient text (white to gray)
- Text shadows with glow
- Radial vignette overlay
- Decorative gradient line
- Section indicator with scroll arrow

## 🔧 Configuration

### **Model Path**
```javascript
// Located in ThreeScene.jsx
loader.load('/assemblyImages/base_3d_model.glb', ...)
```

### **Camera Settings**
```javascript
FOV: 45°
Aspect: window.innerWidth / window.innerHeight
Near: 0.1
Far: 1000
Initial Position: (0, 2, 8)
```

### **Performance Settings**
```javascript
Pixel Ratio: min(devicePixelRatio, 2)
Shadow Map: PCFSoftShadowMap (2048x2048)
Tone Mapping: ACESFilmicToneMapping
Exposure: 1.2
```

## 📱 Responsive Design

### **Desktop (>768px)**
- Full cinematic experience
- Large text sizes (8xl titles)
- Smooth camera movements
- All effects enabled

### **Mobile (<768px)**
- Optimized camera positions
- Responsive text sizes (5xl titles)
- Touch-friendly interactions
- Reduced particle effects (if needed)

## 🎨 Styling

### **Color Palette**
```css
Background: #000000 (Black)
Primary Text: #ffffff (White)
Secondary Text: #a0a0a0 (Gray)
Accent: #4a90e2 (Blue)
Highlight: #7b61ff (Purple)
Glow: #00ffff (Cyan)
```

### **Typography**
```css
Titles: 5xl-8xl, font-bold, gradient fill
Subtitles: 2xl-4xl, font-light, blue-300
Descriptions: lg-2xl, text-gray-300
```

## 🐛 Troubleshooting

### **Model Not Loading**
1. Check file path: `/public/assemblyImages/base_3d_model.glb`
2. Verify file format (GLB or GLTF)
3. Check browser console for errors
4. Ensure file is not corrupted

### **Animations Not Smooth**
1. Reduce `scrub` value in ScrollTrigger (try 0.5)
2. Lower shadow map resolution (1024 instead of 2048)
3. Reduce pixel ratio to 1
4. Disable fog effect

### **Performance Issues**
1. Reduce model polygon count
2. Optimize textures (compress, reduce size)
3. Disable shadows: `renderer.shadowMap.enabled = false`
4. Lower tone mapping exposure

## 🚀 Future Enhancements

### **Potential Additions**
- [ ] Add particle effects during transitions
- [ ] Implement component labels in exploded view
- [ ] Add interactive hotspots on model
- [ ] Include audio/sound effects
- [ ] Add loading progress bar
- [ ] Implement model color customization
- [ ] Add VR/AR support
- [ ] Create mobile-specific camera paths

### **Performance Optimizations**
- [ ] Implement LOD (Level of Detail) for model
- [ ] Add texture compression
- [ ] Lazy load model parts
- [ ] Use instanced rendering for particles
- [ ] Implement frustum culling

## 📄 License

Part of the Limi AI Base project - Proprietary license

## 🙏 Credits

- **Three.js** - 3D rendering engine
- **GSAP** - Animation library
- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS

---

**Built with ❤️ for the future of AI-powered lighting**
