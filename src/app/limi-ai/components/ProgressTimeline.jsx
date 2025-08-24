'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { storyData } from '../data/storyData';

export default function ProgressTimeline({ currentSectionId, sections, iframeRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentIndex = sections.findIndex(section => section.id === currentSectionId);
    const progressPercent = ((currentIndex + 1) / sections.length) * 100;
    setProgress(progressPercent);
    console.log("currentSectionId", currentSectionId);

    // Fire messages for this section to PlayCanvas
    if (!iframeRef?.current) return;
    const section = storyData.sections.find(s => s.id === currentSectionId);
    if (section?.content?.messages && Array.isArray(section.content.messages)) {
      section.content.messages.forEach((message, idx) => {
        setTimeout(() => {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(message, '*');
            console.log('Sent message:', message);
          }
        }, idx * 100);
      });
    }
  }, [currentSectionId, sections, iframeRef]);

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
        <div className="flex items-center space-x-4">
          {/* Progress Bar */}
          <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          
          {/* Current Stage */}
          <div className="text-white text-sm font-medium">
            {sections.find(section => section.id === currentSectionId)?.content?.eyebrow || 'LIMI AI'}
          </div>
          {/* Stage Counter */}
          <div className="text-white/60 text-sm">
            {sections.findIndex(section => section.id === currentSectionId) + 1} / {sections.length}
          </div>
        </div>
      </div>
    </div>
  );
}
