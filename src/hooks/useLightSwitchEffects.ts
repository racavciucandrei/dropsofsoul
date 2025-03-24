
import { useEffect, useRef } from 'react';
import { playAudio } from '@/utils/soundUtils';

export const useLightSwitchEffects = () => {
  const audioInitializedRef = useRef(false);
  
  useEffect(() => {
    // Initialize audio only once
    if (!audioInitializedRef.current) {
      // Try to unblock audio with a silent sound
      const unblockAudio = () => {
        playAudio('/click.mp3', 0.01);
        document.removeEventListener('click', unblockAudio);
      };
      
      document.addEventListener('click', unblockAudio, { once: true });
      audioInitializedRef.current = true;
      
      return () => {
        document.removeEventListener('click', unblockAudio);
      };
    }
  }, []);
};
