
import React, { useState, useEffect, useRef } from 'react';
import { useLight } from '@/context/LightProvider';
import { initAudio, playAudio } from '@/utils/soundUtils';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const [showMessage, setShowMessage] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [togglePattern, setTogglePattern] = useState<boolean[]>([]);
  const audioInitializedRef = useRef(false);
  const lastToggleTimeRef = useRef(0);
  const switchButtonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log("LightSwitch component mounted");
    
    // Initialize audio immediately
    if (!audioInitializedRef.current) {
      console.log("Initializing audio from LightSwitch component");
      initAudio();
      audioInitializedRef.current = true;
      
      // Try to play a silent sound to unblock audio
      try {
        const temp = new Audio('/click.mp3');
        temp.volume = 0;
        temp.play().then(() => {
          console.log("Silent audio played successfully");
          temp.pause();
        }).catch(e => console.log("Silent audio play failed:", e));
      } catch (e) {
        console.error("Error creating silent audio:", e);
      }
    }
    
    // Load stored toggle state
    const storedCount = localStorage.getItem('toggleCount');
    const storedPattern = localStorage.getItem('togglePattern');
    
    if (storedCount) {
      setToggleCount(parseInt(storedCount, 10));
    }
    
    if (storedPattern) {
      setTogglePattern(JSON.parse(storedPattern));
    }
    
    // Create a forced click sound when the component loads
    setTimeout(() => {
      console.log("Playing initial sound to ensure audio is working");
      playAudio('/click.mp3');
    }, 1000);
    
    // Additional event listener for audio unblocking
    const unblockAudio = () => {
      console.log("Unblocking audio from user interaction in LightSwitch");
      playAudio('/click.mp3');
      document.removeEventListener('click', unblockAudio);
    };
    document.addEventListener('click', unblockAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', unblockAudio);
    };
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
    
    const lastFive = pattern.slice(-5);
    
    return (
      lastFive[0] === true && 
      lastFive[1] === false && 
      lastFive[2] === true && 
      lastFive[3] === false && 
      lastFive[4] === true
    );
  };

  const handleToggle = () => {
    // Animation effect on the switch
    if (switchButtonRef.current) {
      switchButtonRef.current.classList.add('animate-pulse');
      setTimeout(() => {
        if (switchButtonRef.current) {
          switchButtonRef.current.classList.remove('animate-pulse');
        }
      }, 300);
    }
    
    // Prevent rapid clicks to avoid audio glitches
    const now = Date.now();
    if (now - lastToggleTimeRef.current < 300) {
      console.log("Ignoring rapid click");
      return;
    }
    lastToggleTimeRef.current = now;
    
    // Use multiple audio playback strategies for maximum compatibility
    console.log("Toggle button clicked in LightSwitch component");
    
    // Strategy 1: Play sound via our utility
    playAudio('/click.mp3');
    
    // Strategy 2: Direct HTML5 Audio play
    try {
      const clickSound = new Audio('/click.mp3');
      clickSound.play().catch(e => console.error("Direct click sound failed:", e));
    } catch (e) {
      console.error("Error creating click sound:", e);
    }
    
    const newCount = toggleCount + 1;
    setToggleCount(newCount);
    
    // Call the context's toggle function
    toggleLight();
    
    const newPattern = [...togglePattern, !isLightOn];
    setTogglePattern(newPattern);
    
    if (newPattern.length >= 5 && isOnOffOnOffOnPattern(newPattern)) {
      showInfernalWarning();
    }
  };

  const showInfernalWarning = () => {
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance("Hey, don't play with that switch!");
      
      // Extremely slow and deep for infernal voice effect
      utterance.rate = 0.6;  // Very slow speech
      utterance.pitch = 0.1; // Extremely low pitch
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      
      const infernalVoice = voices.find(voice => 
        voice.name.includes('Male') || 
        voice.name.includes('Daniel') ||
        voice.name.includes('George') ||
        voice.name.includes('James')
      );
      
      if (infernalVoice) {
        utterance.voice = infernalVoice;
      }
      
      // Add subtle echo effect with voice variation
      utterance.onstart = () => {
        setTimeout(() => {
          const echoUtterance = new SpeechSynthesisUtterance("don't play with that switch");
          echoUtterance.volume = 0.6;
          echoUtterance.rate = 0.5;
          echoUtterance.pitch = 0.08;
          if (infernalVoice) echoUtterance.voice = infernalVoice;
          window.speechSynthesis.speak(echoUtterance);
        }, 300);
      };
      
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  return (
    <div className="fixed right-6 top-24 z-50 flex flex-col items-center">
      <div 
        className="cursor-pointer flex flex-col items-center"
        onClick={handleToggle}
        ref={switchButtonRef}
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
