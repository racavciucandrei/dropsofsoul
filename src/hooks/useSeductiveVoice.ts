
import { useRef } from 'react';

export const useSeductiveVoice = () => {
  const voicePlayedRef = useRef(false);

  const playSeductiveWarning = () => {
    // Cancel any existing speech synthesis
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance("Hey... don't play with that switch");
      
      // More seductive voice settings
      utterance.rate = 0.7;    // Even slower for more seductive effect
      utterance.pitch = 1.2;   // Slightly lower pitch for a huskier feminine voice
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      
      // Find a feminine voice
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
        console.log("Using female voice:", femaleVoice.name);
      } else {
        console.log("No female voice found, using default with adjusted pitch");
      }
      
      // Add breathy pause between words for sensual effect
      utterance.text = "Hey... don't... play with that... switch";
      
      window.speechSynthesis.speak(utterance);
      voicePlayedRef.current = true;
    }, 100);
  };

  return {
    playSeductiveWarning,
    voicePlayedRef
  };
};
