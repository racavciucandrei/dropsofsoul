// Enhanced audio utilities with immediate playback for vintage switch sounds

// Keep track of whether audio has been initialized
let audioInitialized = false;

// Create and cache audio elements for instant playback
const audioCache: Record<string, HTMLAudioElement> = {};

// Initialize audio on first user interaction
export const initAudio = (): void => {
  if (audioInitialized) return;
  
  try {
    // Pre-load the switch sound for immediate playback
    const switchSound = new Audio('/click.mp3');
    switchSound.load();
    audioCache['click'] = switchSound;
    
    // Create a silent sound to unlock audio on iOS/Safari
    const silentSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==');
    silentSound.play().catch(() => {
      // Ignore errors - this is just to unlock audio on iOS
    });
    
    console.log("Audio system initialized successfully");
    audioInitialized = true;
  } catch (error) {
    console.warn("Error initializing audio:", error);
  }
};

// Play sound with high priority and immediate response
export const playAudio = (audioPath: string): void => {
  // Try to use cached audio first for instant playback
  if (audioCache['click']) {
    try {
      // Reset audio to beginning and play it immediately
      const audio = audioCache['click'];
      audio.currentTime = 0;
      audio.volume = 1.0;
      audio.muted = false;
      audio.play()
        .then(() => console.log("Switch sound played from cache"))
        .catch(error => {
          console.warn("Cached audio failed, trying alternative:", error);
          playFallbackAudio(audioPath);
        });
      return;
    } catch (error) {
      console.warn("Error with cached audio:", error);
    }
  }
  
  // Fallback to creating a new audio instance
  playFallbackAudio(audioPath);
};

// Fallback audio playback methods
const playFallbackAudio = (audioPath: string): void => {
  // Try a new Audio object
  try {
    const audio = new Audio(audioPath);
    audio.volume = 1.0;
    const promise = audio.play();
    if (promise) {
      promise
        .then(() => console.log("Fallback audio played successfully"))
        .catch(() => createSyntheticClick());
    }
  } catch (error) {
    console.warn("Fallback audio failed:", error);
    createSyntheticClick();
  }
};

// Create a synthetic vintage mechanical click sound as last resort
const createSyntheticClick = (): void => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      console.error("Web Audio API not supported");
      return;
    }
    
    const audioContext = new AudioContext();
    
    // Create an oscillator for the mechanical click sound
    const clickOscillator = audioContext.createOscillator();
    const clickGain = audioContext.createGain();
    
    // Configure for vintage mechanical click sound (more bass-heavy)
    clickOscillator.type = 'square';
    clickOscillator.frequency.setValueAtTime(80, audioContext.currentTime); // Lower frequency for vintage feel
    
    // Fast attack, medium decay for mechanical feel
    clickGain.gain.setValueAtTime(0, audioContext.currentTime);
    clickGain.gain.linearRampToValueAtTime(0.8, audioContext.currentTime + 0.01);
    clickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    clickOscillator.connect(clickGain);
    clickGain.connect(audioContext.destination);
    
    clickOscillator.start();
    clickOscillator.stop(audioContext.currentTime + 0.15);
    
    console.log("Played synthetic vintage click as fallback");
  } catch (error) {
    console.error("Failed to create synthetic click:", error);
  }
};

// Function to preload audio file for better performance
export const preloadAudio = (audioPath: string): HTMLAudioElement => {
  // Check if already cached
  if (audioCache[audioPath]) {
    return audioCache[audioPath];
  }
  
  // Create and cache the audio element
  const audio = new Audio();
  audio.src = audioPath;
  audio.preload = 'auto';
  audio.load();
  
  // Store in cache
  audioCache[audioPath] = audio;
  
  return audio;
};
