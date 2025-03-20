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
    switchSound.preload = 'auto';
    switchSound.load();
    audioCache['click'] = switchSound;
    
    // Create a silent sound to unlock audio on iOS/Safari
    const silentSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==');
    silentSound.play().catch(() => {
      // Ignore errors - this is just to unlock audio on iOS
    });
    
    // Also initialize Web Audio API for synthetic sound
    if (window.AudioContext || (window as any).webkitAudioContext) {
      // Create a dummy context to initialize the audio subsystem
      const dummyContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      dummyContext.resume().catch(() => {});
      
      // Create and immediately play a very short silent buffer
      const silentBuffer = dummyContext.createBuffer(1, 1, 22050);
      const source = dummyContext.createBufferSource();
      source.buffer = silentBuffer;
      source.connect(dummyContext.destination);
      source.start(0);
    }
    
    console.log("Audio system initialized successfully");
    audioInitialized = true;
  } catch (error) {
    console.warn("Error initializing audio:", error);
  }
};

// Play sound with high priority and immediate response
export const playAudio = (audioPath: string): void => {
  // First ensure Web Audio API is initialized for instant response
  createVintageMechanicalClick();
  
  // Try to use cached audio as well (belt and suspenders approach)
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
        });
    } catch (error) {
      console.warn("Error with cached audio:", error);
    }
  }
};

// Create a synthetic vintage mechanical click sound using Web Audio API (zero latency)
const createVintageMechanicalClick = (): void => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      console.error("Web Audio API not supported");
      return;
    }
    
    const audioContext = new AudioContext();
    // Use resume() to handle auto-play policy
    audioContext.resume().catch(() => {});
    
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.7, audioContext.currentTime);
    masterGain.connect(audioContext.destination);
    
    // Create components for the vintage mechanical switch sound with zero latency
    
    // 1. Initial metal contact "thunk" sound (low frequency component)
    const thunkOsc = audioContext.createOscillator();
    const thunkGain = audioContext.createGain();
    thunkOsc.frequency.setValueAtTime(80, audioContext.currentTime); // Slightly higher for better presence
    thunkOsc.type = 'triangle';
    thunkGain.gain.setValueAtTime(0.5, audioContext.currentTime); // Start with non-zero for immediate sound
    thunkGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
    thunkOsc.connect(thunkGain);
    thunkGain.connect(masterGain);
    
    // 2. Metal spring "ting" sound (higher frequency component)
    const tingOsc = audioContext.createOscillator();
    const tingGain = audioContext.createGain();
    tingOsc.frequency.setValueAtTime(1800, audioContext.currentTime);
    tingOsc.type = 'sine';
    tingGain.gain.setValueAtTime(0.2, audioContext.currentTime); // Start with non-zero for immediate sound
    tingGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    tingOsc.connect(tingGain);
    tingGain.connect(masterGain);
    
    // 3. Mechanical contact "click" sound (noise component) - instant start
    const bufferSize = audioContext.sampleRate * 0.05; // 50ms buffer (shorter for less latency)
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate noise burst for click with more energy at the start for immediate tactile feel
    for (let i = 0; i < bufferSize; i++) {
      // More energy at the beginning, quick decay
      const factor = Math.pow(1 - (i / bufferSize), 3);
      data[i] = (Math.random() * 2 - 1) * factor;
    }
    
    const clickNode = audioContext.createBufferSource();
    const clickGain = audioContext.createGain();
    clickNode.buffer = buffer;
    clickGain.gain.setValueAtTime(0.6, audioContext.currentTime); // Louder for better presence
    clickNode.connect(clickGain);
    clickGain.connect(masterGain);
    
    // 4. Mechanical resonance (filtered noise for vintage vibes)
    const resonanceNode = audioContext.createBufferSource();
    const resonanceGain = audioContext.createGain();
    const resonanceFilter = audioContext.createBiquadFilter();
    
    resonanceNode.buffer = buffer; // Reuse the noise buffer
    resonanceFilter.type = 'bandpass';
    resonanceFilter.frequency.setValueAtTime(320, audioContext.currentTime); // Slightly higher for better presence
    resonanceFilter.Q.setValueAtTime(8, audioContext.currentTime); // Lower Q for faster response
    
    resonanceGain.gain.setValueAtTime(0.15, audioContext.currentTime); // Start with non-zero for immediate sound
    resonanceGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    resonanceNode.connect(resonanceFilter);
    resonanceFilter.connect(resonanceGain);
    resonanceGain.connect(masterGain);
    
    // Start all components simultaneously for zero latency
    const startTime = audioContext.currentTime;
    thunkOsc.start(startTime);
    tingOsc.start(startTime);
    clickNode.start(startTime);
    resonanceNode.start(startTime);
    
    // Stop oscillators after short duration
    thunkOsc.stop(startTime + 0.15);
    tingOsc.stop(startTime + 0.15);
    
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
