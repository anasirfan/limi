"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import ProgressBar from './ProgressBar';

export default function OnboardingWizard({ onComplete, onStepChange }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    lightCategory: '',
    lightStyle: '',
    designAesthetic: ''
  });
  
  // Load saved state from localStorage if available
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const savedSelections = localStorage.getItem('onboardingSelections');
  //     const savedStep = localStorage.getItem('onboardingStep');
      
  //     if (savedSelections) {
  //       setSelections(JSON.parse(savedSelections));
  //     }
      
  //     if (savedStep) {
  //       setCurrentStep(parseInt(savedStep, 10));
  //     }
  //   }
  // }, []);
  
  // Save state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingSelections', JSON.stringify(selections));
      localStorage.setItem('onboardingStep', currentStep.toString());
    }
  }, [selections, currentStep]);
  
  // Notify parent component when step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep, selections);
    }
  }, [currentStep, selections, onStepChange]);
  
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSelection = (key, value) => {
    setSelections(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete(selections);
    }
  };
  
  // Play subtle sound on step change
  // useEffect(() => {
  //   const playSound = () => {
  //     if (typeof window !== 'undefined') {
  //       try {
  //         const audio = new Audio('/sounds/step-change.mp3');
  //         audio.volume = 0.2;
  //         audio.play();
  //       } catch (error) {
  //         console.log('Audio play failed:', error);
  //       }
  //     }
  //   };
    
  //   if (currentStep > 1) {
  //     playSound();
  //   }
  // }, [currentStep]);

  return (
    <div className="bg-[#2B2D2F] rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepOne 
              key="step1"
              selection={selections.lightCategory}
              onSelect={(value) => handleSelection('lightCategory', value)}
              onNext={handleNext}
            />
          )}
          
          {currentStep === 2 && (
            <StepTwo 
              key="step2"
              selection={selections.lightStyle}
              onSelect={(value) => handleSelection('lightStyle', value)}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          
          {currentStep === 3 && (
            <StepThree 
              key="step3"
              selection={selections.designAesthetic}
              onSelect={(value) => handleSelection('designAesthetic', value)}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          
          {currentStep === 4 && (
            <StepFour 
              key="step4"
              selections={selections}
              onComplete={handleComplete}
              onPrevious={handlePrevious}
            />
          )}
        </AnimatePresence>
      </div>
      
      <ProgressBar currentStep={currentStep} totalSteps={4} />
    </div>
  );
}
