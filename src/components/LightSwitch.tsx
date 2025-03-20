import React, { useState, useEffect, useRef } from 'react';
import { useLight } from '@/context/LightProvider';
import { useToast } from '@/hooks/use-toast';
import { initAudio } from '@/utils/soundUtils';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const [showMessage, setShowMessage] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [togglePattern, setTogglePattern] = useState<boolean[]>([]);
  const { toast } = useToast();
  const audioInitializedRef = useRef(false);
  const lastToggleTimeRef = useRef(0);
  
  useEffect(() => {
    initAudio();
    audioInitializedRef.current = true;
    
    const forceInit = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContext.resume().catch(() => {});
      document.removeEventListener('click', forceInit);
      document.removeEventListener('touchstart', forceInit);
    };
    
    document.addEventListener('click', forceInit, { once: true });
    document.addEventListener('touchstart', forceInit, { once: true });
    
    return () => {
      document.removeEventListener('click', forceInit);
      document.removeEventListener('touchstart', forceInit);
    };
  }, []);
  
  useEffect(() => {
    const storedCount = localStorage.getItem('toggleCount');
    const storedPattern = localStorage.getItem('togglePattern');
    
    if (storedCount) {
      setToggleCount(parseInt(storedCount, 10));
    }
    
    if (storedPattern) {
      setTogglePattern(JSON.parse(storedPattern));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('toggleCount', toggleCount.toString());
    localStorage.setItem('togglePattern', JSON.stringify(togglePattern));
  }, [toggleCount, togglePattern]);
  
  useEffect(() => {
    if (isLightOn) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1300);
      
      return () => clearTimeout(timer);
    }
  }, [isLightOn]);

  const isOnOffOnOffOnPattern = (pattern: boolean[]) => {
    if (pattern.length < 5) return false;
    
    // Get the last 5 toggles
    const lastFive = pattern.slice(-5);
    
    // Check for the specific pattern (true, false, true, false, true)
    return (
      lastFive[0] === true && 
      lastFive[1] === false && 
      lastFive[2] === true && 
      lastFive[3] === false && 
      lastFive[4] === true
    );
  };

  const handleToggle = () => {
    // Prevent rapid toggling - a simple debounce
    const now = Date.now();
    if (now - lastToggleTimeRef.current < 300) {
      return;
    }
    lastToggleTimeRef.current = now;
    
    // Update count and toggle light
    const newCount = toggleCount + 1;
    setToggleCount(newCount);
    
    // Toggle light (which will play the sound internally)
    toggleLight();
    
    // Update the pattern AFTER toggling (so it reflects the new state)
    const newPattern = [...togglePattern, !isLightOn];
    setTogglePattern(newPattern);
    
    // Only check for pattern after we have enough toggles
    if (newPattern.length >= 5 && isOnOffOnOffOnPattern(newPattern)) {
      showDivineWarning();
    }
  };

  const showDivineWarning = () => {
    // Add a small delay to ensure the warning comes after the toggle sound
    setTimeout(() => {
      // Create a demonic/satanic divine voice effect
      const utterance = new SpeechSynthesisUtterance("Cease thy meddling with the sacred switch!");
      
      // Extremely slow rate for a demonic, otherworldly effect
      utterance.rate = 0.6;
      
      // Very low pitch for a deep, satanic quality
      utterance.pitch = 0.3;
      
      // Maximum volume
      utterance.volume = 1.0;
      
      // Get all available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find the deepest, most resonant voice available for a satanic effect
      const demonicVoice = voices.find(voice => 
        voice.name.includes('Bass') || 
        voice.name.toLowerCase().includes('deep') || 
        voice.name.includes('Daniel') ||
        voice.name.includes('James') ||
        voice.name.toLowerCase().includes('male')
      );
      
      if (demonicVoice) {
        utterance.voice = demonicVoice;
      }
      
      // Apply distortion effect through speech parameters
      // The extremely low pitch and slow rate creates a demonic quality
      
      // Apply the speech synthesis
      window.speechSynthesis.speak(utterance);
      
      // Display text message with the warning
      toast({
        title: "Divine Warning",
        description: "Cease thy meddling with the sacred switch!",
        variant: "destructive",
      });
    }, 100);
  };

  return (
    <div className="fixed right-6 top-24 z-50 flex flex-col items-center">
      <div 
        className="cursor-pointer flex flex-col items-center"
        onClick={handleToggle}
      >
        <div className="w-8 h-14 bg-amber-200 border-2 border-amber-800 rounded-md shadow-md flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-300 rounded-md opacity-50"></div>
          
          <div className={`w-4 h-7 bg-amber-800 rounded-sm shadow-md absolute ${isLightOn ? 'top-1' : 'bottom-1'} transition-all duration-5`}></div>
          
          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
        </div>
      </div>
      
      <div className="mt-2 text-xs font-medium">
        <span className={isLightOn ? "opacity-100" : "opacity-50"}>
          {isLightOn ? "ON" : "OFF"}
        </span>
      </div>
      
      {showMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                        bg-black/70 text-white px-6 py-4 rounded-lg shadow-lg 
                        animate-fade-in text-center max-w-xs">
          <p className="text-lg font-medium">Now you can see inside the soul</p>
        </div>
      )}
    </div>
  );
};

export default LightSwitch;
