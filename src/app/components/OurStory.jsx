'use client';
import dynamic from 'next/dynamic';

// Dynamically import the modular OurStory component to avoid hydration errors
// Using correct casing to avoid file name casing issues
const ModularOurStory = dynamic(() => import('./ourStory/index'), { ssr: false });

export default function OurStory() {
  return <div id="our-story" className="OurStory"><ModularOurStory /></div>;
}
