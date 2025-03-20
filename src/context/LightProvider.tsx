
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
    
    // Play sound before visual update (with more aggressive sound triggering)
    // We use direct sound playing here to avoid any delays
    playAudio('/click.mp3');
    
    // Also try to play using standard HTML5 Audio as fallback
    try {
      const clickSound = new Audio('/click.mp3');
      clickSound.volume = 1.0;
      clickSound.play().catch(e => console.error("Direct Audio play failed:", e));
    } catch (e) {
      console.error("Error creating Audio element:", e);
    }
    
    // Update state immediately
    setIsLightOn(prevState => !prevState);
  };

  // Apply light effect to the entire page
  useEffect(() => {
    console.log("Light state changed:", isLightOn);
    
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

  // Initial setup - comprehensive audio initialization
  useEffect(() => {
    console.log("LightProvider mounted, initializing audio and light effects");
    
    // Set initial light state
    document.documentElement.classList.add("lights-off");
    document.body.classList.add("lights-off");
    
    // Initialize audio system immediately on load
    initAudio();
    preloadAudioFormats();
    
    // Setup universal audio unlock mechanism
    unlockAudioOnUserInteraction();
    
    // Additional aggressive audio initialization
    const initializeAudioAggressively = () => {
      console.log("Aggressively initializing audio...");
      
      // Re-initialize audio system
      initAudio();
      
      // Create and play a silent sound to unlock audio
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const tempContext = new AudioContextClass();
          tempContext.resume().then(() => {
            const oscillator = tempContext.createOscillator();
            oscillator.connect(tempContext.destination);
            oscillator.start(0);
            oscillator.stop(0.001);
            
            // Try playing the actual sound file
            setTimeout(() => {
              playAudio('/click.mp3');
              setAudioInitialized(true);
            }, 100);
          }).catch(e => console.error("Failed to resume temp audio context:", e));
        }
      } catch (e) {
        console.error("Error during aggressive audio initialization:", e);
      }
      
      // Also try HTML5 Audio directly
      try {
        const tempAudio = new Audio('/click.mp3');
        tempAudio.volume = 0.01; // Very low volume for silent initialization
        tempAudio.play().then(() => {
          console.log("Temp audio played successfully");
          tempAudio.pause();
          setAudioInitialized(true);
        }).catch(e => console.error("Failed to play temp audio:", e));
      } catch (e) {
        console.error("Error creating temp Audio element:", e);
      }
    };
    
    // Initialize audio on first user interaction
    const userInteractionHandler = () => {
      if (!audioInitialized) {
        initializeAudioAggressively();
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
