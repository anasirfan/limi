'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import JsonHeroSection from '../limi-ai-new/components/JsonHeroSection';

gsap.registerPlugin(ScrollTrigger);

export default function LimiAIFuture() {
  const lenisRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);

  

  return (
    <div className="limi-ai-future">
      {/* Hero Section - JsonHeroSection Component */}
      <JsonHeroSection />

      {/* Vision Section */}
      <section className="min-h-screen bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-12">Our Vision</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">AI Innovation</h3>
                <p className="text-gray-300">Pushing the boundaries of what's possible with artificial intelligence</p>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Future Tech</h3>
                <p className="text-gray-300">Building tomorrow's technology solutions today</p>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Global Impact</h3>
                <p className="text-gray-300">Creating positive change for humanity worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-white text-center mb-16">Future Technologies</h2>
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-blue-400 mb-6">Quantum AI</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Harnessing quantum computing power to revolutionize artificial intelligence capabilities, 
                    enabling unprecedented processing speeds and problem-solving abilities.
                  </p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-blue-900 to-blue-600 h-64 rounded-2xl"></div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-purple-400 mb-6">Neural Interfaces</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Direct brain-computer interfaces that allow seamless interaction between human 
                    consciousness and artificial intelligence systems.
                  </p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-purple-900 to-purple-600 h-64 rounded-2xl"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-green-400 mb-6">Autonomous Ecosystems</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Self-managing AI systems that can adapt, learn, and evolve independently 
                    while maintaining ethical guidelines and human oversight.
                  </p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-green-900 to-green-600 h-64 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="min-h-screen bg-gradient-to-t from-black to-gray-900 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Join the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Future
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Be part of the next evolution in artificial intelligence. Together, we'll shape tomorrow.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:scale-105 transition-transform duration-300">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
