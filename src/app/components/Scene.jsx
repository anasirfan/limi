'use client';

import dynamic from 'next/dynamic';

// Dynamically import all Three.js related components
const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading 3D Scene...</div>
    </div>
  ),
});

export default function Scene() {
  return <Scene3D />;
}
