
import React, { createContext, useContext, useState, useEffect } from "react";
import { playAudio } from "../utils/soundUtils";

type LightContextType = {
  isLightOn: boolean;
  toggleLight: () => void;
};

const LightContext = createContext<LightContextType | undefined>(undefined);

export const LightProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with lights off by default
  const [isLightOn, setIsLightOn] = useState(false);

  const toggleLight = () => {
    // Play sound before visual update
    playAudio('/click.mp3');
    
    // Simple toggle without extra operations
    setIsLightOn(prevState => !prevState);
  };

  // Apply light effect with minimal DOM operations
  useEffect(() => {
    if (isLightOn) {
      document.documentElement.classList.remove("lights-off");
      document.documentElement.classList.add("content-reveal");
    } else {
      document.documentElement.classList.add("lights-off");
      document.documentElement.classList.remove("content-reveal");
    }
  }, [isLightOn]);

  // Initial setup
  useEffect(() => {
    // Set initial light state
    document.documentElement.classList.add("lights-off");
    
    // Setup one-time audio initialization
    const initAudioOnUserInteraction = () => {
      // Play a silent sound to unlock audio
      const audio = new Audio('/click.mp3');
      audio.volume = 0.01;
      audio.play().catch(() => {});
      
      // Clean up event listeners
      document.removeEventListener('click', initAudioOnUserInteraction);
      document.removeEventListener('touchstart', initAudioOnUserInteraction);
    };
    
    document.addEventListener('click', initAudioOnUserInteraction, { once: true });
    document.addEventListener('touchstart', initAudioOnUserInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', initAudioOnUserInteraction);
      document.removeEventListener('touchstart', initAudioOnUserInteraction);
    };
  }, []);

  return (
    <LightContext.Provider value={{ isLightOn, toggleLight }}>
      {children}
    </LightContext.Provider>
  );
};

export const useLight = (): LightContextType => {
  const context = useContext(LightContext);
  if (context === undefined) {
    throw new Error("useLight must be used within a LightProvider");
  }
  return context;
};
