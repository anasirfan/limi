'use client';

import { useEffect, useRef } from 'react';

export default function SoundEffects({ currentStage, interactions }) {
  const audioContextRef = useRef();
  const gainNodeRef = useRef();

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.1; // Low volume
    }
  }, []);

  const playTone = (frequency, duration = 0.2, type = 'sine') => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    oscillator.connect(envelope);
    envelope.connect(gainNodeRef.current);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    envelope.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.01);
    envelope.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const playChord = (frequencies, duration = 0.5) => {
    frequencies.forEach((freq, index) => {
      setTimeout(() => playTone(freq, duration), index * 50);
    });
  };

  useEffect(() => {
    // Play ambient sounds based on current stage
    switch (currentStage) {
      case 'circuit':
        playTone(220, 0.1, 'square'); // Circuit activation
        break;
      case 'base':
        playChord([220, 330, 440], 0.3); // Assembly chord
        break;
      case 'base-complete':
        playChord([440, 550, 660, 880], 0.5); // Completion fanfare
        break;
      case 'ecosystem':
        playTone(330, 0.2, 'triangle'); // Ecosystem hum
        break;
      case 'finale':
        playChord([220, 330, 440, 550, 660], 0.8); // Grand finale
        break;
    }
  }, [currentStage]);

  useEffect(() => {
    // Play interaction sounds
    if (interactions?.type === 'pendant-select') {
      playTone(660, 0.15, 'sine'); // Pendant click
    } else if (interactions?.type === 'system-add') {
      playChord([440, 550], 0.2); // System integration
    } else if (interactions?.type === 'sensor-activate') {
      playTone(880, 0.1, 'triangle'); // Sensor activation
    }
  }, [interactions]);

  return null; // This component doesn't render anything
}
