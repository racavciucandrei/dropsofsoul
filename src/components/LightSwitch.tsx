
import React, { useRef } from 'react';
import { useLight } from '@/context/LightProvider';
import { playAudio } from '@/utils/soundUtils';
import { useLightSwitchState } from '@/hooks/useLightSwitchState';
import { useLightSwitchEffects } from '@/hooks/useLightSwitchEffects';
import SwitchButton from '@/components/SwitchButton';
import SwitchMessage from '@/components/SwitchMessage';
import { useToast } from '@/hooks/use-toast';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const switchButtonRef = useRef<HTMLDivElement>(null);
  const lastToggleTimeRef = useRef(0);
  const patternDetectedRef = useRef(false);
  const { toast } = useToast();
  
  const { 
    showMessage, 
    toggleCount, 
    togglePattern, 
    updateToggleState 
  } = useLightSwitchState();
  
  // Initialize audio effects
  useLightSwitchEffects();

  const handleToggle = () => {
    // Prevent rapid clicks
    const now = Date.now();
    if (now - lastToggleTimeRef.current < 300) {
      return;
    }
    lastToggleTimeRef.current = now;
    
    // Play sound
    playAudio('/click.mp3');
    
    // Update toggle state
    const newCount = toggleCount + 1;
    const newPattern = [...togglePattern, !isLightOn];
    updateToggleState(newCount, newPattern);
    
    // Call the context's toggle function
    toggleLight();
    
    // Check for special pattern - simplified
    if (newPattern.length >= 5 && !patternDetectedRef.current) {
      const lastFive = newPattern.slice(-5);
      if (
        lastFive[0] === true && 
        lastFive[1] === false && 
        lastFive[2] === true && 
        lastFive[3] === false && 
        lastFive[4] === true
      ) {
        toast({
          title: "Stop playing with the switch!",
          description: "What are you, five years old? This isn't a toy!",
          variant: "destructive",
          duration: 3000,
        });
        patternDetectedRef.current = true;
        
        setTimeout(() => {
          patternDetectedRef.current = false;
        }, 10000);
      }
    }
  };

  return (
    <div className="fixed right-6 top-24 z-50 flex flex-col items-center">
      <SwitchButton 
        isLightOn={isLightOn} 
        handleToggle={handleToggle} 
        buttonRef={switchButtonRef} 
      />
      
      <SwitchMessage showMessage={showMessage} />
    </div>
  );
};

export default LightSwitch;
