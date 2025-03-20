
import React, { useState, useEffect, useRef } from 'react';
import { useLight } from '@/context/LightProvider';
import { useToast } from '@/hooks/use-toast';
import { playAudio, preloadAudio, initAudio } from '@/utils/soundUtils';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const [showMessage, setShowMessage] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [togglePattern, setTogglePattern] = useState<boolean[]>([]);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioInitializedRef = useRef(false);
  
  // Initialize audio system on component mount
  useEffect(() => {
    // Create a hidden audio element specifically for the switch sound
    const audio = document.createElement('audio');
    audio.id = 'clickSound';
    audio.src = '/click.mp3';
    audio.preload = 'auto';
    audio.style.display = 'none';
    document.body.appendChild(audio);
    
    // Preload the audio
    audioRef.current = preloadAudio('/click.mp3');
    
    // Initialize audio system on first user interaction
    const initAudioSystem = () => {
      if (audioInitializedRef.current) return;
      
      initAudio();
      audioInitializedRef.current = true;
      
      // Try to play a silent sound to unlock audio
      const silentPlay = () => {
        const audio = audioRef.current;
        if (audio) {
          audio.volume = 0;
          audio.muted = true;
          audio.play().catch(() => {
            // Ignore errors here, this is just to unlock audio
          });
        }
      };
      
      silentPlay();
      
      // Remove event listeners after initialization
      document.removeEventListener('click', initAudioSystem);
      document.removeEventListener('touchstart', initAudioSystem);
      document.removeEventListener('keydown', initAudioSystem);
    };
    
    // Add event listeners for user interaction to initialize audio
    document.addEventListener('click', initAudioSystem);
    document.addEventListener('touchstart', initAudioSystem);
    document.addEventListener('keydown', initAudioSystem);
    
    return () => {
      document.removeEventListener('click', initAudioSystem);
      document.removeEventListener('touchstart', initAudioSystem);
      document.removeEventListener('keydown', initAudioSystem);
      
      // Clean up the audio element
      const audioElement = document.getElementById('clickSound');
      if (audioElement) {
        document.body.removeChild(audioElement);
      }
    };
  }, []);
  
  // Store toggle count in localStorage to persist across renders
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
  
  // Update localStorage when toggleCount changes
  useEffect(() => {
    localStorage.setItem('toggleCount', toggleCount.toString());
    localStorage.setItem('togglePattern', JSON.stringify(togglePattern));
  }, [toggleCount, togglePattern]);
  
  // Show message when lights are turned on and hide after delay
  useEffect(() => {
    if (isLightOn) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1300); // Hide message after 1.3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isLightOn]);

  // Check if the pattern matches "on-off-on-off-on"
  const isOnOffOnOffOnPattern = (pattern: boolean[]) => {
    if (pattern.length < 5) return false;
    
    // Get the last 5 toggles
    const lastFive = pattern.slice(-5);
    
    // The pattern should be: true, false, true, false, true
    return (
      lastFive[0] === true && 
      lastFive[1] === false && 
      lastFive[2] === true && 
      lastFive[3] === false && 
      lastFive[4] === true
    );
  };

  // Handle switch toggle with count tracking
  const handleToggle = () => {
    // Ensure audio is initialized
    if (!audioInitializedRef.current) {
      initAudio();
      audioInitializedRef.current = true;
    }
    
    // Play the vintage mechanical switch sound
    playAudio('/click.mp3');
    console.log("Attempting to play switch sound");
    
    // First increment toggle count
    const newCount = toggleCount + 1;
    setToggleCount(newCount);
    
    // Then toggle the light and update pattern
    toggleLight();
    
    // Update toggle pattern with the new state (after toggle)
    const newPattern = [...togglePattern, !isLightOn];
    setTogglePattern(newPattern);
    
    // Check if the pattern matches "on-off-on-off-on"
    if (isOnOffOnOffOnPattern(newPattern)) {
      showWarning();
    }
  };

  // Separate function to show warning
  const showWarning = () => {
    // Play warning using Speech Synthesis
    const utterance = new SpeechSynthesisUtterance("Hey, don't play with that switch!");
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
    
    // Show toast notification
    toast({
      title: "Stop that!",
      description: "Hey, don't play with that switch!",
      variant: "destructive",
    });
  };

  return (
    <div className="fixed right-6 top-24 z-50 flex flex-col items-center">
      {/* Old American style toggle light switch */}
      <div 
        className="cursor-pointer flex flex-col items-center"
        onClick={handleToggle}
      >
        <div className="w-8 h-14 bg-amber-200 border-2 border-amber-800 rounded-md shadow-md flex flex-col items-center justify-center relative">
          {/* Switch plate */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-300 rounded-md opacity-50"></div>
          
          {/* Toggle switch */}
          <div className={`w-4 h-7 bg-amber-800 rounded-sm shadow-md absolute ${isLightOn ? 'top-1' : 'bottom-1'} transition-all duration-200`}></div>
          
          {/* Screws */}
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
      
      {/* Soul message that appears when light is turned on */}
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
