
import React, { useState, useEffect } from 'react';
import { useLight } from '@/context/LightProvider';
import { useToast } from '@/hooks/use-toast';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const [showMessage, setShowMessage] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [togglePattern, setTogglePattern] = useState<boolean[]>([]);
  const { toast } = useToast();
  
  // Create audio context for generating click sound programmatically
  const [audioContext] = useState(() => {
    try {
      // Create audio context for browsers that support it
      return new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("Web Audio API not supported:", e);
      return null;
    }
  });
  
  // Function to play a more realistic old mechanical switch sound
  const playClickSound = () => {
    if (!audioContext) return;
    
    try {
      // Create the main click components
      const clickOscillator = audioContext.createOscillator();
      const clickGain = audioContext.createGain();
      
      // Create a mechanical "thunk" component
      const thunkOscillator = audioContext.createOscillator();
      const thunkGain = audioContext.createGain();
      
      // Create a noise component for the mechanical sound
      const noiseBuffer = createNoiseBuffer(audioContext);
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      const noiseGain = audioContext.createGain();
      
      // Configure the click oscillator (higher-pitched component)
      clickOscillator.type = 'triangle';
      clickOscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      clickOscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.05);
      
      // Configure the thunk oscillator (lower mechanical component)
      thunkOscillator.type = 'sine';
      thunkOscillator.frequency.setValueAtTime(120, audioContext.currentTime);
      thunkOscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.15);
      
      // Configure the gain nodes for the click
      clickGain.gain.setValueAtTime(0, audioContext.currentTime);
      clickGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.005);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.12);
      
      // Configure the gain for the thunk
      thunkGain.gain.setValueAtTime(0, audioContext.currentTime);
      thunkGain.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
      thunkGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
      
      // Configure the noise gain
      noiseGain.gain.setValueAtTime(0, audioContext.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.005);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);
      
      // Connect all nodes
      clickOscillator.connect(clickGain);
      thunkOscillator.connect(thunkGain);
      noiseSource.connect(noiseGain);
      
      clickGain.connect(audioContext.destination);
      thunkGain.connect(audioContext.destination);
      noiseGain.connect(audioContext.destination);
      
      // Start and stop the oscillators
      const now = audioContext.currentTime;
      clickOscillator.start(now);
      thunkOscillator.start(now);
      noiseSource.start(now);
      
      clickOscillator.stop(now + 0.15);
      thunkOscillator.stop(now + 0.25);
      noiseSource.stop(now + 0.15);
    } catch (err) {
      console.error("Error playing sound:", err);
    }
  };
  
  // Helper function to create a noise buffer for mechanical sound
  const createNoiseBuffer = (context: AudioContext) => {
    const bufferSize = context.sampleRate * 0.15; // 150ms of noise
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Fill the buffer with random noise to simulate mechanical friction
    for (let i = 0; i < bufferSize; i++) {
      // More concentrated noise at the beginning
      const decay = Math.max(0, 1 - (i / bufferSize) * 3);
      data[i] = (Math.random() * 2 - 1) * decay * 0.5;
    }
    
    return buffer;
  };
  
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
    // Play the more realistic switch sound
    playClickSound();
    
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
