
import React, { createContext, useContext, useState, useEffect } from "react";
import { playAudio, initAudio } from "../utils/soundUtils";

type LightContextType = {
  isLightOn: boolean;
  toggleLight: () => void;
};

const LightContext = createContext<LightContextType | undefined>(undefined);

export const LightProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with lights off by default
  const [isLightOn, setIsLightOn] = useState(false);

  const toggleLight = () => {
    // Call sound function with zero latency - MUST come before state update
    playAudio('/click.mp3');
    
    // Small delay to ensure sound starts first
    requestAnimationFrame(() => {
      // Use synchronous state update for immediate feedback
      setIsLightOn(!isLightOn);
    });
  };

  // Apply light effect to the entire page
  useEffect(() => {
    if (isLightOn) {
      document.documentElement.classList.remove("lights-off");
      document.body.classList.remove("lights-off");
      
      // Add animation classes for content reveal
      document.documentElement.classList.add("content-reveal");
    } else {
      document.documentElement.classList.add("lights-off");
      document.body.classList.add("lights-off");
      document.documentElement.classList.remove("content-reveal");
    }
  }, [isLightOn]);

  // Initial setup - make sure lights are off on first load and initialize audio
  useEffect(() => {
    document.documentElement.classList.add("lights-off");
    document.body.classList.add("lights-off");
    
    // Initialize audio system immediately on load
    initAudio();
    
    // Setup event listeners to ensure audio can play on iOS/Safari
    const unlockAudio = () => {
      // Force immediate audio initialization
      const silentContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      silentContext.resume().catch(() => {});
      
      initAudio();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    
    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
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
