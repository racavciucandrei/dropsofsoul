
import React, { useState, useEffect } from 'react';
import { useLight } from '@/context/LightProvider';
import { useToast } from '@/hooks/use-toast';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const [showMessage, setShowMessage] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [warningShown, setWarningShown] = useState(false);
  const { toast } = useToast();
  
  // Show message when lights are turned on and hide after delay
  useEffect(() => {
    if (isLightOn) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1300); // Hide message after 1.3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isLightOn]);

  // Handle switch toggle with count tracking
  const handleToggle = () => {
    // First increment toggle count
    const newCount = toggleCount + 1;
    setToggleCount(newCount);
    
    // Then toggle the light
    toggleLight();
    
    // Now check if this is the second or later toggle
    if (newCount >= 2 && !warningShown) {
      // Play warning using Speech Synthesis
      const utterance = new SpeechSynthesisUtterance("Hey, don't play with that switch!");
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
      
      // Show toast notification
      toast({
        title: "Stop that!",
        description: "Hey, don't play with that switch!",
        variant: "destructive",
      });
      
      // Prevent showing again until reset
      setWarningShown(true);
    }
  };

  return (
    <div className="fixed right-6 top-24 z-50 flex flex-col items-center">
      {/* Old American style toggle light switch */}
      <div 
        className="cursor-pointer flex flex-col items-center"
        onClick={handleToggle}
      >
        <div className="w-8 h-14 bg-amber-200 border-2 border-amber-800 rounded-md shadow-md flex flex-col items-center justify-center relative">
          {/* Switch plate */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-300 rounded-md opacity-50"></div>
          
          {/* Toggle switch */}
          <div className={`w-4 h-7 bg-amber-800 rounded-sm shadow-md absolute ${isLightOn ? 'top-1' : 'bottom-1'} transition-all duration-200`}></div>
          
          {/* Screws */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
        </div>
      </div>
      
      <div className="mt-2 text-xs font-medium">
        <span className={isLightOn ? "opacity-100" : "opacity-50"}>
          {isLightOn ? "ON" : "OFF"}
        </span>
      </div>
      
      {/* Soul message that appears when light is turned on */}
      {showMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                        bg-black/70 text-white px-6 py-4 rounded-lg shadow-lg 
                        animate-fade-in text-center max-w-xs">
          <p className="text-lg font-medium">Now you can see inside the soul</p>
        </div>
      )}
    </div>
  );
};

export default LightSwitch;
