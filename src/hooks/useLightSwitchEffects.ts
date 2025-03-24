
import { useEffect, useRef } from 'react';
import { initAudio, playAudio } from '@/utils/soundUtils';

export const useLightSwitchEffects = () => {
  const audioInitializedRef = useRef(false);
  
  useEffect(() => {
    console.log("LightSwitch component mounted");
    
    // Initialize audio only once
    if (!audioInitializedRef.current) {
      console.log("Initializing audio from LightSwitch component");
      initAudio();
      audioInitializedRef.current = true;
      
      // Try to unblock audio with a silent sound
      const unblockAudio = () => {
        console.log("Unblocking audio from user interaction");
        playAudio('/click.mp3');
        document.removeEventListener('click', unblockAudio);
      };
      
      document.addEventListener('click', unblockAudio, { once: true });
      
      return () => {
        document.removeEventListener('click', unblockAudio);
      };
    }
  }, []);
};
