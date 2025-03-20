// Enhanced audio utilities with improved vintage mechanical switch sound synthesis

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
        .catch(() => createVintageMechanicalClick());
    }
  } catch (error) {
    console.warn("Fallback audio failed:", error);
    createVintageMechanicalClick();
  }
};

// Create a synthetic vintage mechanical click sound as last resort
const createVintageMechanicalClick = (): void => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      console.error("Web Audio API not supported");
      return;
    }
    
    const audioContext = new AudioContext();
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.7, audioContext.currentTime);
    masterGain.connect(audioContext.destination);
    
    // Create components for the vintage mechanical switch sound
    
    // 1. Initial metal contact "thunk" sound (low frequency component)
    const thunkOsc = audioContext.createOscillator();
    const thunkGain = audioContext.createGain();
    thunkOsc.frequency.setValueAtTime(60, audioContext.currentTime); // Very low frequency for mechanical feel
    thunkOsc.type = 'triangle';
    thunkGain.gain.setValueAtTime(0, audioContext.currentTime);
    thunkGain.gain.linearRampToValueAtTime(0.9, audioContext.currentTime + 0.005);
    thunkGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
    thunkOsc.connect(thunkGain);
    thunkGain.connect(masterGain);
    
    // 2. Metal spring "ting" sound (higher frequency component)
    const tingOsc = audioContext.createOscillator();
    const tingGain = audioContext.createGain();
    tingOsc.frequency.setValueAtTime(1500, audioContext.currentTime);
    tingOsc.type = 'sine';
    tingGain.gain.setValueAtTime(0, audioContext.currentTime);
    tingGain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
    tingGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
    tingOsc.connect(tingGain);
    tingGain.connect(masterGain);
    
    // 3. Mechanical contact "click" sound (noise component)
    const clickNode = audioContext.createBufferSource();
    const clickGain = audioContext.createGain();
    const bufferSize = audioContext.sampleRate * 0.1; // 100ms buffer
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate noise burst for click with more energy in lower frequencies for vintage feel
    for (let i = 0; i < bufferSize; i++) {
      // Decrease noise amplitude over time and emphasize low frequencies
      const factor = 1 - (i / bufferSize);
      // More random for first part to simulate mechanical contact
      data[i] = (Math.random() * 2 - 1) * factor * factor;
    }
    
    clickNode.buffer = buffer;
    clickGain.gain.setValueAtTime(0.4, audioContext.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
    clickNode.connect(clickGain);
    clickGain.connect(masterGain);
    
    // 4. Mechanical resonance (filtered noise for vintage vibes)
    const resonanceNode = audioContext.createBufferSource();
    const resonanceGain = audioContext.createGain();
    const resonanceFilter = audioContext.createBiquadFilter();
    
    resonanceNode.buffer = buffer; // Reuse the noise buffer
    resonanceFilter.type = 'bandpass';
    resonanceFilter.frequency.setValueAtTime(280, audioContext.currentTime); // Resonant frequency for vintage metal
    resonanceFilter.Q.setValueAtTime(12, audioContext.currentTime); // High Q for resonance
    
    resonanceGain.gain.setValueAtTime(0, audioContext.currentTime);
    resonanceGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    resonanceGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
    
    resonanceNode.connect(resonanceFilter);
    resonanceFilter.connect(resonanceGain);
    resonanceGain.connect(masterGain);
    
    // Start all sound components with slight timing variations for realism
    thunkOsc.start();
    tingOsc.start(audioContext.currentTime + 0.005);
    clickNode.start();
    resonanceNode.start(audioContext.currentTime + 0.002);
    
    // Stop all components
    thunkOsc.stop(audioContext.currentTime + 0.2);
    tingOsc.stop(audioContext.currentTime + 0.2);
    // No need to stop one-shot buffer sources
    
    console.log("Played improved synthetic vintage mechanical switch sound");
  } catch (error) {
    console.error("Failed to create synthetic vintage mechanical click:", error);
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
