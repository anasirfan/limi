'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPalette, FaLightbulb, FaMagic, FaArrowRight } from 'react-icons/fa';

export default function BeTheArtistSection() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="my-12 bg-gradient-to-r from-[#1e1e1e] to-[#292929] rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Text content */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold font-[Amenti] text-[#54BB74] mb-4">
            Be the Artist of Your Space
          </h2>
          
          <p className="text-gray-300 mb-6">
            LIMI empowers you to transform any environment with intelligent, customizable lighting. 
            Our modular systems allow you to design, create, and personalize your lighting experience.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-[#54BB74]/20 p-2 rounded-full">
                <FaPalette className="text-[#54BB74]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Design Freedom</h3>
                <p className="text-sm text-gray-400">Mix and match components to create your perfect lighting solution</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-[#54BB74]/20 p-2 rounded-full">
                <FaLightbulb className="text-[#54BB74]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Smart Control</h3>
                <p className="text-sm text-gray-400">Adjust colors, brightness, and effects to match your mood or activity</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-[#54BB74]/20 p-2 rounded-full">
                <FaMagic className="text-[#54BB74]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Endless Possibilities</h3>
                <p className="text-sm text-gray-400">Expand your system over time with new components and features</p>
              </div>
            </div>
          </div>
          
          <Link 
            href="/configurator"
            className="inline-flex items-center bg-[#54BB74] text-white py-3 px-6 rounded-md hover:bg-[#48a064] transition-colors self-start group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>Start Creating</span>
            <FaArrowRight className={`ml-2 transition-transform duration-300 ${isHovered ? 'transform translate-x-1' : ''}`} />
          </Link>
        </div>
        
        {/* Image */}
        <div className="relative h-full min-h-[300px] md:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop"
            alt="Be the Artist of Your Space"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292929] to-transparent opacity-60"></div>
        </div>
      </div>
    </div>
  );
}
