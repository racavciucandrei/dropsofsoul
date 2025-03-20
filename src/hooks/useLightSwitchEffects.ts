
import { useEffect, useRef } from 'react';
import { initAudio, playAudio } from '@/utils/soundUtils';

export const useLightSwitchEffects = () => {
  const audioInitializedRef = useRef(false);
  
  useEffect(() => {
    console.log("LightSwitch component mounted");
    
    // Initialize audio immediately
    if (!audioInitializedRef.current) {
      console.log("Initializing audio from LightSwitch component");
      initAudio();
      audioInitializedRef.current = true;
      
      // Try to play a silent sound to unblock audio
      try {
        const temp = new Audio('/click.mp3');
        temp.volume = 0;
        temp.play().then(() => {
          console.log("Silent audio played successfully");
          temp.pause();
        }).catch(e => console.log("Silent audio play failed:", e));
      } catch (e) {
        console.error("Error creating silent audio:", e);
      }
    }
    
    // Create a forced click sound when the component loads
    setTimeout(() => {
      console.log("Playing initial sound to ensure audio is working");
      playAudio('/click.mp3');
    }, 1000);
    
    // Additional event listener for audio unblocking
    const unblockAudio = () => {
      console.log("Unblocking audio from user interaction in LightSwitch");
      playAudio('/click.mp3');
      document.removeEventListener('click', unblockAudio);
    };
    document.addEventListener('click', unblockAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', unblockAudio);
    };
  }, []);
};
