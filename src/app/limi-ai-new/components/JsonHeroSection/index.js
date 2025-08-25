'use client';

import Background from './Background';
import Header from './Header';
import Hero from './Hero';

export default function JsonHeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <Header />
      <Hero />
    </div>
  );
}
