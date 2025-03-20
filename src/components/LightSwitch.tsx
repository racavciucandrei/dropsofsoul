
import React, { useState, useEffect } from 'react';
import { useLight } from '@/context/LightProvider';
import { Switch } from '@/components/ui/switch';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const [showMessage, setShowMessage] = useState(false);
  
  // Show message when lights are turned on and hide after delay
  useEffect(() => {
    if (isLightOn) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000); // Hide message after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isLightOn]);
  
  const handlePullString = () => {
    const pullString = document.querySelector('.pull-string');
    if (pullString) {
      pullString.classList.add('pull-string-animate');
      setTimeout(() => {
        pullString.classList.remove('pull-string-animate');
      }, 500);
    }
    toggleLight();
  };

  return (
    <div className="fixed right-6 top-24 z-50 flex flex-col items-center">
      <div 
        className="cursor-pointer flex flex-col items-center"
        onClick={handlePullString}
      >
        <div className="pull-string w-1 h-10 bg-amber-600 rounded-full mb-1"></div>
        <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-600 flex items-center justify-center text-amber-900 text-xs font-bold">
          {isLightOn ? "ON" : "OFF"}
        </div>
      </div>
      <div className="mt-2 text-xs font-medium">
        <span className={isLightOn ? "opacity-100" : "opacity-50"}>
          {isLightOn ? "Lights On" : "Lights Off"}
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
