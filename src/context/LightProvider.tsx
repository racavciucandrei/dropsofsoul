
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
    // Play sound before visual update
    playAudio('/click.mp3');
    
    // Update state immediately instead of using requestAnimationFrame
    setIsLightOn(!isLightOn);
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
    
    // Setup event listeners to ensure audio can play on mobile browsers
    const unlockAudio = () => {
      // Try to create and resume audio context to unlock audio
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        audioCtx.resume().then(() => {
          console.log("Audio context resumed by user interaction");
          initAudio();
          playAudio('/click.mp3');
        }).catch(err => {
          console.error("Failed to resume audio context:", err);
        });
      }
      
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
