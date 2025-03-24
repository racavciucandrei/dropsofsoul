
import React, { createContext, useContext, useState, useEffect } from "react";
import { playAudio, initAudio, unlockAudioOnUserInteraction, preloadAudioFormats } from "../utils/soundUtils";

type LightContextType = {
  isLightOn: boolean;
  toggleLight: () => void;
};

const LightContext = createContext<LightContextType | undefined>(undefined);

export const LightProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with lights off by default
  const [isLightOn, setIsLightOn] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);

  const toggleLight = () => {
    console.log("Toggle light called, current state:", isLightOn);
    
    // Play sound before visual update
    playAudio('/click.mp3');
    
    // Update state with a simple toggle - no extra operations here
    setIsLightOn(prevState => !prevState);
  };

  // Apply light effect to the entire page with smoother transitions
  useEffect(() => {
    console.log("Light state changed:", isLightOn);
    
    // Use requestAnimationFrame for smoother class changes
    requestAnimationFrame(() => {
      if (isLightOn) {
        document.documentElement.classList.remove("lights-off");
        document.body.classList.remove("lights-off");
        
        // Delay adding animation classes slightly
        setTimeout(() => {
          document.documentElement.classList.add("content-reveal");
        }, 50);
      } else {
        document.documentElement.classList.add("lights-off");
        document.body.classList.add("lights-off");
        document.documentElement.classList.remove("content-reveal");
      }
    });
  }, [isLightOn]);

  // Initial setup - streamlined audio initialization
  useEffect(() => {
    console.log("LightProvider mounted, initializing audio and light effects");
    
    // Set initial light state
    document.documentElement.classList.add("lights-off");
    document.body.classList.add("lights-off");
    
    // Initialize audio system
    initAudio();
    preloadAudioFormats();
    unlockAudioOnUserInteraction();
    
    // Initialize audio on first user interaction - simplified
    const userInteractionHandler = () => {
      if (!audioInitialized) {
        initAudio();
        setAudioInitialized(true);
      }
      
      document.removeEventListener('click', userInteractionHandler);
      document.removeEventListener('touchstart', userInteractionHandler);
      document.removeEventListener('keydown', userInteractionHandler);
    };
    
    document.addEventListener('click', userInteractionHandler);
    document.addEventListener('touchstart', userInteractionHandler);
    document.addEventListener('keydown', userInteractionHandler);
    
    return () => {
      document.removeEventListener('click', userInteractionHandler);
      document.removeEventListener('touchstart', userInteractionHandler);
      document.removeEventListener('keydown', userInteractionHandler);
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
