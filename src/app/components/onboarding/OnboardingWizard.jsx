"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import ProgressBar from './ProgressBar';

export default function OnboardingWizard({ onComplete, onStepChange, lightType }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    lightCategory: '',
    lightStyle: '',
    designAesthetic: ''
  });
  
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

   const sendMessagesForDesign = (designName, idOrIds) => {
      const assignment = systemAssignments.find((a) => a.design === designName);
      if (!assignment) return;
  
      // Helper to send all messages for a single id
      const sendAllMessages = (id) => {
        if (assignment.systemType === "bar") {
          sendMessageToPlayCanvas("barextra");
        }
        sendMessageToPlayCanvas(`cable_${id}`);
        sendMessageToPlayCanvas(
          `glass_${assignment.hasGlass ? "attached" : "none"}`
        );
        sendMessageToPlayCanvas(`color_${assignment.hasGold ? "gold" : "none"}`);
        sendMessageToPlayCanvas(
          `silver_${assignment.hasSilver ? "attached" : "none"}`
        );
        sendMessageToPlayCanvas(`product_${assignment.media?.model?.url}`);
        sendMessageToPlayCanvas(`${assignment.message}`);
      };
  
      if (Array.isArray(idOrIds)) {
        idOrIds.forEach((id) => {
          sendAllMessages(id);
        });
        // Fire allmodelsloaded ONCE at the end
        sendMessageToPlayCanvas("allmodelsloaded");
      } else {
        sendAllMessages(idOrIds);
        // Fire allmodelsloaded after the single id
        sendMessageToPlayCanvas("allmodelsloaded");
      }
    };


  return (
    <div className="bg-[#2B2D2F] rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
      <div className="p-2 sm:p-4 sm:pr-20">
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
              lightType={lightType}
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
