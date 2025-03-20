
import React from 'react';
import { useLight } from '@/context/LightProvider';
import { Switch } from '@/components/ui/switch';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  
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
    </div>
  );
};

export default LightSwitch;
