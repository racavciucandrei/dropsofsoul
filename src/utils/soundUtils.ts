
// Ultra low-latency audio utilities with zero-delay vintage mechanical switch sound

// Global variables for immediate access
let audioContext: AudioContext | null = null;
let isAudioInitialized = false;
let clickBuffer: AudioBuffer | null = null;

// Initialize audio system with preemptive loading
export const initAudio = (): void => {
  if (isAudioInitialized) return;
  
  try {
    console.log("Initializing audio system...");
    
    // Create audio context immediately
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("Web Audio API not supported");
      return;
    }
    
    audioContext = new AudioContextClass({ latencyHint: 'interactive' });
    audioContext.resume().catch((e) => console.error("Failed to resume audio context:", e));
    
    // Pre-generate the click buffer to avoid generation delay later
    createClickBuffer().then(buffer => {
      clickBuffer = buffer;
      console.log("Click buffer created and cached");
    }).catch(e => console.error("Failed to create click buffer:", e));
    
    // Pre-warm the audio system with a silent sound (iOS/Safari fix + latency reduction)
    if (audioContext) {
      const silentBuffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = silentBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    }
    
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
    // Duration of the click sound (extremely short)
    const duration = 0.05; // Reduced from 0.1 to 0.05 seconds for even faster sound
    const sampleRate = audioContext.sampleRate;
    const bufferSize = duration * sampleRate;
    const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate an optimized vintage mechanical switch sound
    for (let i = 0; i < bufferSize; i++) {
      const t = i / sampleRate; // Time in seconds
      
      // Initial click (metallic impact) - made more prominent and faster decay
      const initialClickAmplitude = Math.exp(-t * 200) * 0.8; // Increased decay rate and amplitude
      const initialClick = (Math.random() * 2 - 1) * initialClickAmplitude;
      
      // Mechanical thunk (low frequency component) - faster decay
      const thunkFreq = 80;
      const thunkAmplitude = Math.exp(-t * 100) * 0.4; // Increased decay rate
      const thunk = Math.sin(2 * Math.PI * thunkFreq * t) * thunkAmplitude;
      
      // Spring ting (high frequency damped oscillation) - faster decay
      const tingFreq = 1800 + Math.sin(t * 50) * 100;
      const tingAmplitude = Math.exp(-t * 160) * 0.15; // Increased decay rate
      const ting = Math.sin(2 * Math.PI * tingFreq * t) * tingAmplitude;
      
      // Mechanical resonance - faster decay
      const resonanceFreq = 320;
      const resonanceAmplitude = Math.exp(-t * 80) * 0.1; // Increased decay rate
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

// Simplified audio playback implementation focusing on Web Audio API
export const playAudio = (_audioPath: string): void => {
  console.log("Attempting to play audio...");
  
  try {
    // Force resume the audio context if suspended (mobile browsers often require this)
    if (!audioContext) {
      initAudio();
      if (!audioContext) return;
    }
    
    audioContext.resume().catch(() => {
      console.log("Failed to resume audio context, retrying with createVintageMechanicalClick");
      createVintageMechanicalClick();
    });
    
    // Use pre-generated buffer for instant playback if available
    if (clickBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = clickBuffer;
      
      // Add gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1.0;
      
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Use zero scheduling delay - most important for removing perceptible latency
      source.start(0);
      console.log("Playing audio from pre-generated buffer");
    } else {
      // Generate sound on-the-fly as backup
      createVintageMechanicalClick();
    }
  } catch (error) {
    // Fallback to synthetic sound generation if buffer playback fails
    console.warn("Buffer playback failed, using synthetic sound:", error);
    createVintageMechanicalClick();
  }
};

// Generate sound directly using Web Audio API oscillators and nodes
const createVintageMechanicalClick = (): void => {
  try {
    // Create context on demand if it doesn't exist
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      audioContext = new AudioContextClass({ latencyHint: 'interactive' });
    }
    
    // Force resume the audio context
    audioContext.resume().catch(() => {});
    
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.7, audioContext.currentTime);
    masterGain.connect(audioContext.destination);
    
    // Create components for the vintage mechanical switch sound
    // Use extremely short duration components for minimal delay
    
    // 1. Initial metal contact "thunk" sound (low frequency component)
    const thunkOsc = audioContext.createOscillator();
    const thunkGain = audioContext.createGain();
    thunkOsc.frequency.setValueAtTime(80, audioContext.currentTime);
    thunkOsc.type = 'triangle';
    thunkGain.gain.setValueAtTime(0.5, audioContext.currentTime);
    thunkGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03); // Shortened from 0.06
    thunkOsc.connect(thunkGain);
    thunkGain.connect(masterGain);
    
    // 2. Metal spring "ting" sound (higher frequency component)
    const tingOsc = audioContext.createOscillator();
    const tingGain = audioContext.createGain();
    tingOsc.frequency.setValueAtTime(1800, audioContext.currentTime);
    tingOsc.type = 'sine';
    tingGain.gain.setValueAtTime(0.2, audioContext.currentTime);
    tingGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.015); // Shortened from 0.03
    tingOsc.connect(tingGain);
    tingGain.connect(masterGain);
    
    // 3. Mechanical contact "click" sound (noise component)
    const bufferSize = audioContext.sampleRate * 0.015; // Very short 15ms buffer (shortened from 30ms)
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate noise burst with most energy at the very beginning
    for (let i = 0; i < bufferSize; i++) {
      // More energy at the beginning, very quick decay
      const factor = Math.pow(1 - (i / bufferSize), 8); // Sharper decay (changed from 4 to 8)
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
    thunkOsc.stop(startTime + 0.05); // Shortened from 0.1
    tingOsc.stop(startTime + 0.05); // Shortened from 0.1
    
    console.log("Created vintage mechanical click sound with Web Audio API");
  } catch (error) {
    console.error("Failed to create synthetic click:", error);
  }
};

// Preload audio function for backward compatibility
export const preloadAudio = (audioPath: string): HTMLAudioElement => {
  const audio = new Audio();
  audio.src = audioPath;
  audio.preload = 'auto';
  audio.load();
  return audio;
};
