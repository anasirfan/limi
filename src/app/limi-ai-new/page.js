'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import all section components
import ProgressBar from './components/ProgressBar';
import HeroSection from './components/HeroSection';
import ParallaxSection from './components/ParallaxSection';
import PinnedSection from './components/PinnedSection';
import ScrollRevealsSection from './components/ScrollRevealsSection';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import SpeedControlSections from './components/SpeedControlSections';
import TextMorphingSection from './components/TextMorphingSection';
import CharacterRevealSection from './components/CharacterRevealSection';
import ColorTransitionSection from './components/ColorTransitionSection';
import VirtualScrollingSection from './components/VirtualScrollingSection';
import FinalSection from './components/FinalSection';

gsap.registerPlugin(ScrollTrigger);

export default function LimiAINew() {
  const lenisRef = useRef();
  const progressBarRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Progress tracking
    lenis.on('scroll', ({ scroll, limit }) => {
      const progress = scroll / limit;
      setScrollProgress(progress);
    });

    // Hero animations
    gsap.set('.hero-title', { scale: 1, opacity: 1 });
    
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to('.hero-title', {
          scale: 1 - progress * 0.3,
          opacity: 1 - progress * 0.8,
          duration: 0.1,
        });
      },
    });

    // Parallax backgrounds
    gsap.utils.toArray('.parallax-bg').forEach((bg, i) => {
      const speed = (i + 1) * 0.5;
      gsap.to(bg, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: bg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Pinned sections
    ScrollTrigger.create({
      trigger: '.pinned-section',
      start: 'top top',
      end: '+=100%',
      pin: '.pinned-text',
      pinSpacing: false,
    });

    // Horizontal scroll section
    const horizontalSection = document.querySelector('.horizontal-scroll');
    const cards = gsap.utils.toArray('.scroll-card');
    
    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection,
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1),
        end: () => '+=' + horizontalSection.offsetWidth,
      },
    });

    // Scroll-triggered reveals
    gsap.utils.toArray('.reveal-left').forEach((element) => {
      gsap.fromTo(element, 
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    gsap.utils.toArray('.reveal-right').forEach((element) => {
      gsap.fromTo(element, 
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    gsap.utils.toArray('.reveal-scale').forEach((element) => {
      gsap.fromTo(element, 
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.3)',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Speed control sections
    gsap.utils.toArray('.fast-section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => lenis.options.duration = 0.3,
        onLeave: () => lenis.options.duration = 1.2,
        onEnterBack: () => lenis.options.duration = 0.3,
        onLeaveBack: () => lenis.options.duration = 1.2,
      });
    });

    gsap.utils.toArray('.slow-section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => lenis.options.duration = 2.5,
        onLeave: () => lenis.options.duration = 1.2,
        onEnterBack: () => lenis.options.duration = 2.5,
        onLeaveBack: () => lenis.options.duration = 1.2,
      });
    });

    // Text morphing animation
    gsap.utils.toArray('.morph-text').forEach((text) => {
      ScrollTrigger.create({
        trigger: text,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(text, {
            rotationX: progress * 360,
            scale: 1 + progress * 0.5,
            duration: 0.1,
          });
        },
      });
    });

    // Momentum scroll sections
    gsap.utils.toArray('.momentum-section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => lenis.options.mouseMultiplier = 3,
        onLeave: () => lenis.options.mouseMultiplier = 1,
        onEnterBack: () => lenis.options.mouseMultiplier = 3,
        onLeaveBack: () => lenis.options.mouseMultiplier = 1,
      });
    });

    // Color transition based on scroll
    ScrollTrigger.create({
      trigger: '.color-transition-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const colors = ['#f3ebe2', '#54bb74', '#93cfa2', '#292929'];
        const colorIndex = Math.floor(progress * (colors.length - 1));
        const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
        const localProgress = (progress * (colors.length - 1)) % 1;
        
        document.querySelector('.color-transition-section').style.backgroundColor = 
          `color-mix(in srgb, ${colors[colorIndex]} ${(1 - localProgress) * 100}%, ${colors[nextColorIndex]} ${localProgress * 100}%)`;
      },
    });

    // Text reveal character by character
    gsap.utils.toArray('.char-reveal').forEach((element) => {
      const text = element.textContent;
      element.innerHTML = text.split('').map(char => 
        char === ' ' ? ' ' : `<span class="char" style="opacity: 0; transform: translateY(50px);">${char}</span>`
      ).join('');
      
      const chars = element.querySelectorAll('.char');
      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.02,
            ease: 'back.out(1.7)',
          });
        },
      });
    });

    // Magnetic scroll effect
    gsap.utils.toArray('.magnetic-element').forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const magnetStrength = Math.sin(progress * Math.PI * 4) * 20;
          gsap.to(element, {
            x: magnetStrength,
            rotation: magnetStrength * 0.5,
            duration: 0.1,
          });
        },
      });
    });

    // Scroll-jacking section with custom easing
    gsap.utils.toArray('.scroll-jack-section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          lenis.options.easing = (t) => 1 - Math.pow(1 - t, 5); // Quint out
          lenis.options.duration = 3;
        },
        onLeave: () => {
          lenis.options.easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
          lenis.options.duration = 1.2;
        },
        onEnterBack: () => {
          lenis.options.easing = (t) => 1 - Math.pow(1 - t, 5);
          lenis.options.duration = 3;
        },
        onLeaveBack: () => {
          lenis.options.easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
          lenis.options.duration = 1.2;
        },
      });
    });

    // Physics simulation section
    gsap.utils.toArray('.physics-element').forEach((element, i) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const velocity = self.getVelocity() / -300;
          const mass = 1 + i * 0.5;
          const force = velocity / mass;
          
          gsap.to(element, {
            y: force * 50,
            rotation: force * 10,
            scale: 1 + Math.abs(force) * 0.1,
            duration: 0.1,
          });
        },
      });
    });

    // Inertia control demonstration
    gsap.utils.toArray('.inertia-section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          lenis.options.touchMultiplier = 5;
          lenis.options.wheelMultiplier = 2;
        },
        onLeave: () => {
          lenis.options.touchMultiplier = 2;
          lenis.options.wheelMultiplier = 1;
        },
        onEnterBack: () => {
          lenis.options.touchMultiplier = 5;
          lenis.options.wheelMultiplier = 2;
        },
        onLeaveBack: () => {
          lenis.options.touchMultiplier = 2;
          lenis.options.wheelMultiplier = 1;
        },
      });
    });

    // Elastic scroll boundaries
    gsap.utils.toArray('.elastic-boundary').forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const elasticity = Math.sin(progress * Math.PI * 8) * 30;
          const boundary = Math.max(0, Math.min(1, progress + elasticity * 0.01));
          
          gsap.to(element, {
            y: elasticity,
            skewY: elasticity * 0.1,
            duration: 0.1,
          });
        },
      });
    });

    // Scroll velocity visualization
    let velocityElements = gsap.utils.toArray('.velocity-indicator');
    lenis.on('scroll', ({ velocity }) => {
      const normalizedVelocity = Math.min(Math.abs(velocity) / 10, 1);
      velocityElements.forEach((element, i) => {
        gsap.to(element, {
          scaleX: normalizedVelocity,
          opacity: normalizedVelocity,
          backgroundColor: `hsl(${120 - normalizedVelocity * 120}, 70%, 50%)`,
          duration: 0.1,
        });
      });
    });

    // Scroll direction change detection
    let lastScrollY = 0;
    lenis.on('scroll', ({ scroll }) => {
      const direction = scroll > lastScrollY ? 'down' : 'up';
      lastScrollY = scroll;
      
      gsap.utils.toArray('.direction-element').forEach((element) => {
        gsap.to(element, {
          rotationY: direction === 'down' ? 0 : 180,
          duration: 0.3,
        });
      });
    });

    // Virtual scrolling with custom progress
    ScrollTrigger.create({
      trigger: '.virtual-scroll-section',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.virtual-content',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const virtualItems = gsap.utils.toArray('.virtual-item');
        
        virtualItems.forEach((item, i) => {
          const itemProgress = (progress * virtualItems.length - i);
          const clampedProgress = Math.max(0, Math.min(1, itemProgress));
          
          gsap.to(item, {
            y: (1 - clampedProgress) * 100,
            opacity: clampedProgress,
            scale: 0.8 + clampedProgress * 0.2,
            duration: 0.1,
          });
        });
      },
    });

    // Final reveal animation
    ScrollTrigger.create({
      trigger: '.final-section',
      start: 'top 50%',
      onEnter: () => {
        gsap.timeline()
          .to('.final-text', {
            scale: 1.2,
            opacity: 1,
            duration: 2,
            ease: 'elastic.out(1, 0.3)',
          })
          .to('.completion-badge', {
            rotation: 360,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'back.out(1.7)',
          }, '-=1');
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="lenis-showcase">
      <ProgressBar scrollProgress={scrollProgress} />
      <HeroSection />
      <ParallaxSection />
      <PinnedSection />
      <ScrollRevealsSection />
      <HorizontalScrollSection />
      <SpeedControlSections />
      <TextMorphingSection />
      <CharacterRevealSection />
      <ColorTransitionSection />
      <VirtualScrollingSection />
      <FinalSection />
    </div>
  );
}
