
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
  
  // Function to play a more realistic vintage mechanical light switch sound
  const playClickSound = () => {
    if (!audioContext) return;
    
    try {
      // Create oscillators for different components of the sound
      const mainClickOsc = audioContext.createOscillator();
      const mechanicalOsc = audioContext.createOscillator();
      const springOsc = audioContext.createOscillator();
      
      // Create gain nodes for each component
      const mainClickGain = audioContext.createGain();
      const mechanicalGain = audioContext.createGain();
      const springGain = audioContext.createGain();
      
      // Create a noise source for the vintage mechanical sounds
      const noiseBuffer = createNoiseBuffer(audioContext);
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      const noiseGain = audioContext.createGain();
      
      // A second noise source for the "spring back" effect
      const springNoiseBuffer = createSpringNoiseBuffer(audioContext);
      const springNoiseSource = audioContext.createBufferSource();
      springNoiseSource.buffer = springNoiseBuffer;
      const springNoiseGain = audioContext.createGain();
      
      // Create a filter for the mechanical sound
      const mechanicalFilter = audioContext.createBiquadFilter();
      mechanicalFilter.type = 'lowpass';
      mechanicalFilter.frequency.value = 600;
      mechanicalFilter.Q.value = 2;
      
      // Configure main click (initial impact)
      mainClickOsc.type = 'triangle';
      mainClickOsc.frequency.setValueAtTime(250, audioContext.currentTime);
      mainClickOsc.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.08);
      
      // Configure mechanical thunk (deeper sound component)
      mechanicalOsc.type = 'sine';
      mechanicalOsc.frequency.setValueAtTime(80, audioContext.currentTime);
      mechanicalOsc.frequency.linearRampToValueAtTime(30, audioContext.currentTime + 0.25);
      
      // Configure spring oscillator (higher-pitched component for spring mechanism)
      springOsc.type = 'triangle';
      springOsc.frequency.setValueAtTime(600, audioContext.currentTime + 0.02);
      springOsc.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
      
      // Configure the gain envelopes for more realistic attack/decay
      
      // Main click envelope (sharp attack, medium decay)
      mainClickGain.gain.setValueAtTime(0, audioContext.currentTime);
      mainClickGain.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.005);
      mainClickGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.12);
      
      // Mechanical component envelope (slower attack, longer decay)
      mechanicalGain.gain.setValueAtTime(0, audioContext.currentTime);
      mechanicalGain.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
      mechanicalGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3);
      
      // Spring component envelope (delayed start, medium length)
      springGain.gain.setValueAtTime(0, audioContext.currentTime);
      springGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.02);
      springGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.15);
      
      // Noise gain for mechanical friction
      noiseGain.gain.setValueAtTime(0, audioContext.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.008);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
      
      // Spring noise gain (delayed start to match spring action)
      springNoiseGain.gain.setValueAtTime(0, audioContext.currentTime);
      springNoiseGain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.025);
      springNoiseGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.15);
      
      // Connect all nodes through the filter for the mechanical components
      mechanicalOsc.connect(mechanicalGain);
      mechanicalGain.connect(mechanicalFilter);
      mechanicalFilter.connect(audioContext.destination);
      
      // Connect other nodes directly
      mainClickOsc.connect(mainClickGain);
      mainClickGain.connect(audioContext.destination);
      
      springOsc.connect(springGain);
      springGain.connect(audioContext.destination);
      
      noiseSource.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      
      springNoiseSource.connect(springNoiseGain);
      springNoiseGain.connect(audioContext.destination);
      
      // Start and stop all sound sources with appropriate timing
      const now = audioContext.currentTime;
      
      mainClickOsc.start(now);
      mechanicalOsc.start(now);
      springOsc.start(now + 0.02); // Slightly delayed for realism
      noiseSource.start(now);
      springNoiseSource.start(now + 0.02); // Match spring timing
      
      mainClickOsc.stop(now + 0.15);
      mechanicalOsc.stop(now + 0.35);
      springOsc.stop(now + 0.2);
      noiseSource.stop(now + 0.25);
      springNoiseSource.stop(now + 0.2);
      
      // Add a slight delay then a secondary smaller click for the mechanical "settle" sound
      const settleOsc = audioContext.createOscillator();
      const settleGain = audioContext.createGain();
      
      settleOsc.type = 'triangle';
      settleOsc.frequency.value = 180;
      
      settleGain.gain.setValueAtTime(0, audioContext.currentTime + 0.15);
      settleGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.155);
      settleGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
      
      settleOsc.connect(settleGain);
      settleGain.connect(audioContext.destination);
      
      settleOsc.start(now + 0.15);
      settleOsc.stop(now + 0.25);
      
    } catch (err) {
      console.error("Error playing sound:", err);
    }
  };
  
  // Helper function to create a noise buffer for mechanical sound
  const createNoiseBuffer = (context: AudioContext) => {
    const bufferSize = context.sampleRate * 0.25; // 250ms of noise
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Fill the buffer with filtered random noise to simulate vintage mechanical friction
    for (let i = 0; i < bufferSize; i++) {
      // More concentrated noise at the beginning, more decay
      const decay = Math.max(0, 1 - (i / bufferSize) * 5);
      
      // Add some periodic "catches" to simulate mechanical imperfections
      const mechanicalCatches = (i % 80 < 10) ? 0.2 : 0;
      
      data[i] = ((Math.random() * 2 - 1) * decay * 0.7) + (mechanicalCatches * decay);
    }
    
    return buffer;
  };
  
  // Helper function to create a spring noise buffer
  const createSpringNoiseBuffer = (context: AudioContext) => {
    const bufferSize = context.sampleRate * 0.15; // 150ms of noise
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Create a "springy" noise with more oscillatory behavior
    for (let i = 0; i < bufferSize; i++) {
      const position = i / bufferSize;
      
      // Exponential decay for the spring sound
      const decay = Math.exp(-position * 15);
      
      // Add spring oscillations that gradually slow down
      const oscillationFreq = 0.1 - (position * 0.05);
      const springiness = Math.sin(i * oscillationFreq) * decay * 0.3;
      
      // Add some randomness for realism
      const noise = (Math.random() * 2 - 1) * 0.2 * decay;
      
      data[i] = springiness + noise;
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
    // Play the vintage mechanical switch sound
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
