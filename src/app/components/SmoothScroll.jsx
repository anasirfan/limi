// 'use client';

// import { useEffect } from 'react';
// // import Lenis from '@studio-freight/lenis';
// // --- Lenis VirtualScroll patch to fix onTouchEnd crash ---
// try {
//   const proto = Object.getPrototypeOf(new Lenis().virtualScroll);
//   if (proto && proto.onTouchEnd) {
//     proto.onTouchEnd = function(t) {
//       const lastDelta = this.lastDelta || { x: 0, y: 0 };
//       this.emitter.emit("scroll", {
//         deltaX: lastDelta.x,
//         deltaY: lastDelta.y,
//         event: t
//       });
//     };
//   }
// } catch (e) {
//   // Ignore errors in patching, fallback to original
// }
// // --- End patch ---
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { usePathname } from 'next/navigation';

// gsap.registerPlugin(ScrollTrigger);

// export default function SmoothScroll({ children }) {
//   const pathname = usePathname();
  
//   useEffect(() => {
//     // Create a new Lenis instance for smooth scrolling
//     // const lenis = new Lenis({
//     //   duration: 1.2,
//     //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     //   direction: 'vertical',
//     //   smooth: true,
//     //   smoothTouch: false,
//     //   touchMultiplier: 2,
//     //   // Only apply smooth scrolling on the home page
//     //   normalizeWheel: pathname === '/',
//     //   infinite: false,
//     // });

//     // Update ScrollTrigger when scrolling
//     lenis.on('scroll', ScrollTrigger.update);

//     // Add Lenis to GSAP ticker
//     gsap.ticker.add((time) => {
//       lenis.raf(time * 1000);
//     });

//     // Disable lag smoothing
//     gsap.ticker.lagSmoothing(0);

//     // Cleanup
//     return () => {
//       lenis.destroy();
//       gsap.ticker.remove(lenis.raf);
//     };
//   }, [pathname]); // Re-initialize when pathname changes

//   return <>{children}</>;
// }
