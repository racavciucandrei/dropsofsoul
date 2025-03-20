
import { useRef } from 'react';

export const useSeductiveVoice = () => {
  const voicePlayedRef = useRef(false);

  const playSeductiveWarning = () => {
    // Cancel any existing speech synthesis
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance();
      
      // Cartoon character voice settings with slower speaking rate
      utterance.rate = 0.8;     // Slower pace for better comprehension
      utterance.pitch = 1.7;    // Higher pitched for cartoon effect
      utterance.volume = 1.0;   // Full volume
      
      // Funny cartoon character line
      utterance.text = "Woah woah woah! Hey buddy! That switch isn't a toy, ya know!";
      
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a voice that might work well for cartoon character
      const cartoonishVoice = voices.find(voice => 
        voice.name.includes('Samantha') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Fred') ||
        voice.name.includes('Google US English') ||
        voice.name.includes('Microsoft Zira')
      );
      
      if (cartoonishVoice) {
        utterance.voice = cartoonishVoice;
        console.log("Using cartoon-like voice:", cartoonishVoice.name);
      } else {
        console.log("No suitable voice found, using default with cartoon adjustments");
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
