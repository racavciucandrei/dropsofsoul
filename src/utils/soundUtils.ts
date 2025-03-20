// Enhanced audio utilities with multiple fallback mechanisms for cross-browser support

// Keep track of whether audio has been initialized
let audioInitialized = false;

// Create a single audio element that can be reused
const getAudioElement = (src: string): HTMLAudioElement => {
  const existingAudio = document.getElementById('global-audio-element') as HTMLAudioElement;
  if (existingAudio) {
    existingAudio.src = src;
    return existingAudio;
  }
  
  const audio = document.createElement('audio');
  audio.id = 'global-audio-element';
  audio.style.display = 'none';
  document.body.appendChild(audio);
  audio.src = src;
  return audio;
};

// Initialize audio on first user interaction
export const initAudio = (): void => {
  if (audioInitialized) return;
  
  try {
    // Create and play a silent sound to unlock audio
    const audio = getAudioElement('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==');
    audio.volume = 0;
    audio.muted = true;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Audio system initialized successfully");
          audioInitialized = true;
        })
        .catch(err => {
          console.warn("Silent audio initialization failed:", err);
        });
    }
  } catch (error) {
    console.warn("Error initializing audio:", error);
  }
};

// Play sound with multiple fallback mechanisms
export const playAudio = (audioPath: string): void => {
  console.log(`Attempting to play sound: ${audioPath}`);
  
  // Method 1: Use pre-existing audio element if available
  const existingAudio = document.getElementById('clickSound') as HTMLAudioElement;
  if (existingAudio) {
    try {
      existingAudio.currentTime = 0;
      existingAudio.volume = 1.0;
      existingAudio.muted = false;
      const promise = existingAudio.play();
      if (promise !== undefined) {
        promise.catch(error => {
          console.warn("Existing audio element failed:", error);
          tryAlternativeMethods(audioPath);
        });
      }
      return;
    } catch (error) {
      console.warn("Error with existing audio element:", error);
    }
  }
  
  tryAlternativeMethods(audioPath);
};

// Try alternative methods for playing sound
const tryAlternativeMethods = (audioPath: string): void => {
  // Method 2: Create a new Audio object
  try {
    const audio = new Audio(audioPath);
    audio.volume = 1.0;
    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => console.log("New Audio object played successfully"))
        .catch(error => {
          console.warn("New Audio object failed:", error);
          useWebAudioAPI(audioPath);
        });
    }
  } catch (error) {
    console.warn("Error creating new Audio object:", error);
    useWebAudioAPI(audioPath);
  }
};

// Use Web Audio API as a final fallback
const useWebAudioAPI = (audioPath: string): void => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      console.error("Web Audio API not supported in this browser");
      return;
    }
    
    const audioContext = new AudioContext();
    
    // Create a short clicking sound programmatically as a last resort
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
    
    console.log("Played synthesized click using Web Audio API");
  } catch (error) {
    console.error("Web Audio API failed:", error);
  }
};

// Function to preload audio file for better performance
export const preloadAudio = (audioPath: string): HTMLAudioElement => {
  const audio = new Audio();
  audio.src = audioPath;
  audio.preload = 'auto';
  
  // Try to load it
  audio.load();
  
  return audio;
};
