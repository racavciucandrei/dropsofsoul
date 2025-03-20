
import { useRef } from 'react';

export const useSeductiveVoice = () => {
  const voicePlayedRef = useRef(false);

  const playSeductiveWarning = () => {
    // Cancel any existing speech synthesis
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance();
      
      // Marilyn Monroe-inspired voice settings
      utterance.rate = 0.6;     // Very slow, breathy pace
      utterance.pitch = 1.4;    // Higher pitched, feminine voice
      utterance.volume = 1.0;   // Full volume
      
      // Add breathy pauses and Marilyn's characteristic drawl
      utterance.text = "Ohhh... hey there... don't play... with that switch... sugar";
      
      const voices = window.speechSynthesis.getVoices();
      
      // Find a feminine voice for Marilyn-like effect
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Moira') ||
        voice.name.includes('Tessa')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
        console.log("Using Marilyn-inspired voice:", femaleVoice.name);
      } else {
        console.log("No female voice found, using default with Marilyn-inspired adjustments");
      }
      
      window.speechSynthesis.speak(utterance);
      voicePlayedRef.current = true;
    }, 100);
  };

  return {
    playSeductiveWarning,
    voicePlayedRef
  };
};
