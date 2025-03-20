import { useRef } from 'react';

export const useSeductiveVoice = () => {
  const voicePlayedRef = useRef(false);

  const playSeductiveWarning = () => {
    // Cancel any existing speech synthesis
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance();
      
      // Tom and Jerry housekeeper style voice settings
      utterance.rate = 0.9;      // Slightly slower pace for the character style
      utterance.pitch = 0.7;     // Lower pitched for the iconic voice
      utterance.volume = 1.0;    // Full volume
      
      // Keep the same line but we'll deliver it with different voice characteristics
      utterance.text = "Now look at this one he just discovered a switch!";
      
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a deeper voice that might work better for this character style
      const suitableVoice = voices.find(voice => 
        voice.name.includes('Daniel') ||
        voice.name.includes('Fred') ||
        voice.name.includes('Google US English') ||
        voice.name.includes('Microsoft David')
      );
      
      if (suitableVoice) {
        utterance.voice = suitableVoice;
        console.log("Using character-like voice:", suitableVoice.name);
      } else {
        console.log("No suitable voice found, using default with adjusted settings");
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
