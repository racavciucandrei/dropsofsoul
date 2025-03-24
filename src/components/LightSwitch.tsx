
import React, { useRef } from 'react';
import { useLight } from '@/context/LightProvider';
import { playAudio } from '@/utils/soundUtils';
import { useLightSwitchState } from '@/hooks/useLightSwitchState';
import { useLightSwitchEffects } from '@/hooks/useLightSwitchEffects';
import SwitchButton from '@/components/SwitchButton';
import SwitchMessage from '@/components/SwitchMessage';
import { useSeductiveVoice } from '@/hooks/useSeductiveVoice';
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
  
  // Initialize audio and manage effects
  useLightSwitchEffects();
  
  // Keep the reference but we won't actually use the voice functionality
  const { voicePlayedRef } = useSeductiveVoice();

  const isOnOffOnOffOnPattern = (pattern: boolean[]) => {
    if (pattern.length < 5) return false;
    
    const lastFive = pattern.slice(-5);
    return (
      lastFive[0] === true && 
      lastFive[1] === false && 
      lastFive[2] === true && 
      lastFive[3] === false && 
      lastFive[4] === true
    );
  };

  const handleToggle = () => {
    // Animation effect on the switch
    if (switchButtonRef.current) {
      switchButtonRef.current.classList.add('animate-pulse');
      setTimeout(() => {
        if (switchButtonRef.current) {
          switchButtonRef.current.classList.remove('animate-pulse');
        }
      }, 300);
    }
    
    // Prevent rapid clicks to avoid audio glitches
    const now = Date.now();
    if (now - lastToggleTimeRef.current < 300) {
      console.log("Ignoring rapid click");
      return;
    }
    lastToggleTimeRef.current = now;
    
    // Play sound
    playAudio('/click.mp3');
    
    // Also try direct HTML5 Audio as fallback
    try {
      const clickSound = new Audio('/click.mp3');
      clickSound.play().catch(e => console.error("Direct click sound failed:", e));
    } catch (e) {
      console.error("Error creating click sound:", e);
    }
    
    // Update toggle state
    const newCount = toggleCount + 1;
    const newPattern = [...togglePattern, !isLightOn];
    updateToggleState(newCount, newPattern);
    
    // Call the context's toggle function
    toggleLight();
    
    // Check for special pattern and show toast if needed
    if (newPattern.length >= 5 && isOnOffOnOffOnPattern(newPattern) && !patternDetectedRef.current) {
      toast({
        title: "Stop playing with the switch!",
        description: "What are you, five years old? This isn't a toy!",
        variant: "destructive",
        duration: 5000,
      });
      patternDetectedRef.current = true;
      
      // Reset the pattern detection after some time
      setTimeout(() => {
        patternDetectedRef.current = false;
      }, 10000); // Reset after 10 seconds
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
