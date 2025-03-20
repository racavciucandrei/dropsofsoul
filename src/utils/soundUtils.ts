
// Ultra low-latency audio utilities with zero-delay vintage mechanical switch sound

// Global variables for immediate access
let audioContext: AudioContext | null = null;
let isAudioInitialized = false;
let clickBuffer: AudioBuffer | null = null;

// Initialize audio system with preemptive loading
export const initAudio = (): void => {
  if (isAudioInitialized) return;
  
  try {
    // Create audio context immediately
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("Web Audio API not supported");
      return;
    }
    
    audioContext = new AudioContextClass();
    audioContext.resume().catch(() => {});
    
    // Pre-generate the click buffer to avoid generation delay later
    createClickBuffer().then(buffer => {
      clickBuffer = buffer;
      console.log("Click buffer created and cached");
    });
    
    // Pre-warm the audio system with a silent sound (iOS/Safari fix + latency reduction)
    const silentBuffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = silentBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    
    // Try to load the MP3 as well for redundancy
    const audio = new Audio();
    audio.src = '/click.mp3';
    audio.load();
    
    isAudioInitialized = true;
    console.log("Audio system initialized with ultra-low latency");
  } catch (error) {
    console.warn("Error initializing audio:", error);
  }
};

// Pre-generate the click buffer for instantaneous playback later
const createClickBuffer = async (): Promise<AudioBuffer | null> => {
  if (!audioContext) return null;
  
  try {
    // Duration of the click sound (very short)
    const duration = 0.15; // seconds
    const sampleRate = audioContext.sampleRate;
    const bufferSize = duration * sampleRate;
    const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate an optimized vintage mechanical switch sound
    for (let i = 0; i < bufferSize; i++) {
      const t = i / sampleRate; // Time in seconds
      
      // Initial click (metallic impact)
      const initialClickAmplitude = Math.exp(-t * 80) * 0.5;
      const initialClick = (Math.random() * 2 - 1) * initialClickAmplitude;
      
      // Mechanical thunk (low frequency component)
      const thunkFreq = 80;
      const thunkAmplitude = Math.exp(-t * 40) * 0.4;
      const thunk = Math.sin(2 * Math.PI * thunkFreq * t) * thunkAmplitude;
      
      // Spring ting (high frequency damped oscillation)
      const tingFreq = 1800 + Math.sin(t * 50) * 100;
      const tingAmplitude = Math.exp(-t * 60) * 0.15;
      const ting = Math.sin(2 * Math.PI * tingFreq * t) * tingAmplitude;
      
      // Mechanical resonance
      const resonanceFreq = 320;
      const resonanceAmplitude = Math.exp(-t * 30) * 0.1;
      const resonance = Math.sin(2 * Math.PI * resonanceFreq * t) * resonanceAmplitude;
      
      // Combine all components with heavier weighting on the initial click for immediacy
      data[i] = initialClick + thunk + ting + resonance;
    }
    
    return buffer;
  } catch (error) {
    console.error("Failed to create click buffer:", error);
    return null;
  }
};

// Ultra-low-latency audio playback function - focus on instantaneous sound
export const playAudio = (_audioPath: string): void => {
  try {
    if (!audioContext) {
      // Emergency initialization if context doesn't exist
      initAudio();
      if (!audioContext) return;
    }
    
    // Force resume the audio context in case it's suspended
    audioContext.resume().catch(() => {});
    
    // Method 1: Use pre-generated buffer for instant playback (Web Audio API)
    if (clickBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = clickBuffer;
      source.connect(audioContext.destination);
      source.start(0); // Start immediately at time 0
      
      // Method 2: Generate sound on-the-fly as backup
    } else {
      createVintageMechanicalClick();
    }
  } catch (error) {
    // Fallback to synthetic sound generation if buffer playback fails
    createVintageMechanicalClick();
    console.warn("Buffer playback failed, using synthetic sound:", error);
  }
};

// Emergency backup method: generate sound directly for zero-latency
const createVintageMechanicalClick = (): void => {
  try {
    if (!audioContext) {
      // Create context on demand if it doesn't exist
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      audioContext = new AudioContextClass();
    }
    
    // Force resume the audio context
    audioContext.resume().catch(() => {});
    
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.7, audioContext.currentTime);
    masterGain.connect(audioContext.destination);
    
    // Create components for the vintage mechanical switch sound
    // Use very short duration components for minimal delay
    
    // 1. Initial metal contact "thunk" sound (low frequency component)
    const thunkOsc = audioContext.createOscillator();
    const thunkGain = audioContext.createGain();
    thunkOsc.frequency.setValueAtTime(80, audioContext.currentTime);
    thunkOsc.type = 'triangle';
    thunkGain.gain.setValueAtTime(0.5, audioContext.currentTime);
    thunkGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.06);
    thunkOsc.connect(thunkGain);
    thunkGain.connect(masterGain);
    
    // 2. Metal spring "ting" sound (higher frequency component)
    const tingOsc = audioContext.createOscillator();
    const tingGain = audioContext.createGain();
    tingOsc.frequency.setValueAtTime(1800, audioContext.currentTime);
    tingOsc.type = 'sine';
    tingGain.gain.setValueAtTime(0.2, audioContext.currentTime);
    tingGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);
    tingOsc.connect(tingGain);
    tingGain.connect(masterGain);
    
    // 3. Mechanical contact "click" sound (noise component)
    const bufferSize = audioContext.sampleRate * 0.03; // Very short 30ms buffer
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate noise burst with most energy at the very beginning
    for (let i = 0; i < bufferSize; i++) {
      // More energy at the beginning, very quick decay
      const factor = Math.pow(1 - (i / bufferSize), 4); // Sharper decay
      data[i] = (Math.random() * 2 - 1) * factor;
    }
    
    const clickNode = audioContext.createBufferSource();
    clickNode.buffer = buffer;
    clickNode.connect(masterGain);
    
    // Start all components simultaneously for zero latency
    // Use exact same start time for all components
    const startTime = audioContext.currentTime;
    thunkOsc.start(startTime);
    tingOsc.start(startTime);
    clickNode.start(startTime);
    
    // Stop oscillators after very short duration
    thunkOsc.stop(startTime + 0.1);
    tingOsc.stop(startTime + 0.1);
    
  } catch (error) {
    console.error("Failed to create synthetic click:", error);
  }
};

// Preload audio function is no longer used since we're using Web Audio API
// but kept for backward compatibility
export const preloadAudio = (audioPath: string): HTMLAudioElement => {
  const audio = new Audio();
  audio.src = audioPath;
  audio.preload = 'auto';
  audio.load();
  return audio;
};
