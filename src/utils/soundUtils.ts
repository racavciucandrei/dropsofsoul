
// Multi-layered audio utilities with redundant playback strategies for maximum compatibility

// Global variables for immediate access
let audioContext: AudioContext | null = null;
let isAudioInitialized = false;
let clickBuffer: AudioBuffer | null = null;
let audioElement: HTMLAudioElement | null = null;

// Initialize audio system with multiple strategies
export const initAudio = (): void => {
  if (isAudioInitialized) return;
  
  try {
    console.log("Initializing audio system with multiple playback strategies...");
    
    // Strategy 1: Web Audio API (primary)
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContext = new AudioContextClass({ latencyHint: 'interactive' });
        audioContext.resume().then(() => {
          console.log("Audio context created and resumed successfully");
          
          // Pre-generate the click buffer
          createClickBuffer().then(buffer => {
            clickBuffer = buffer;
            console.log("Click buffer created and cached");
          });
          
          // Pre-warm the audio system
          const silentBuffer = audioContext.createBuffer(1, 1, 22050);
          const source = audioContext.createBufferSource();
          source.buffer = silentBuffer;
          source.connect(audioContext.destination);
          source.start(0);
        }).catch(e => console.error("Failed to resume audio context:", e));
      }
    } catch (e) {
      console.error("Web Audio API initialization failed:", e);
    }
    
    // Strategy 2: HTML5 Audio (backup)
    try {
      audioElement = new Audio('/click.mp3');
      audioElement.preload = 'auto';
      
      // Force load the audio file
      audioElement.load();
      
      // Add event listeners for better debugging
      audioElement.addEventListener('canplaythrough', () => {
        console.log("Audio element ready to play through");
      });
      
      audioElement.addEventListener('error', (e) => {
        console.error("Audio element error:", e);
      });
      
      // Attempt to play a silent sound to unlock audio on iOS
      document.addEventListener('click', function unlockAudio() {
        if (audioElement) {
          // Set volume to 0 for silent initialization
          audioElement.volume = 0;
          audioElement.play().then(() => {
            audioElement!.pause();
            audioElement!.currentTime = 0;
            audioElement!.volume = 1;
            console.log("Audio unlocked through user interaction");
          }).catch(e => console.error("Failed to unlock audio:", e));
        }
        document.removeEventListener('click', unlockAudio);
      }, { once: true });
    } catch (e) {
      console.error("HTML5 Audio initialization failed:", e);
    }
    
    // Strategy 3: AudioBuffer for direct generation (ultimate fallback)
    try {
      if (!clickBuffer && audioContext) {
        createClickBuffer().then(buffer => {
          clickBuffer = buffer;
          console.log("Fallback click buffer created");
        });
      }
    } catch (e) {
      console.error("AudioBuffer initialization failed:", e);
    }
    
    isAudioInitialized = true;
    console.log("Multi-layered audio system initialized");
  } catch (error) {
    console.warn("Error in audio initialization:", error);
  }
};

// Generate click buffer for instantaneous playback
const createClickBuffer = async (): Promise<AudioBuffer | null> => {
  if (!audioContext) return null;
  
  try {
    const duration = 0.05;
    const sampleRate = audioContext.sampleRate;
    const bufferSize = duration * sampleRate;
    const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate an optimized vintage mechanical switch sound
    for (let i = 0; i < bufferSize; i++) {
      const t = i / sampleRate;
      
      // Initial click (metallic impact)
      const initialClickAmplitude = Math.exp(-t * 200) * 0.8;
      const initialClick = (Math.random() * 2 - 1) * initialClickAmplitude;
      
      // Mechanical thunk (low frequency component)
      const thunkFreq = 80;
      const thunkAmplitude = Math.exp(-t * 100) * 0.4;
      const thunk = Math.sin(2 * Math.PI * thunkFreq * t) * thunkAmplitude;
      
      // Spring ting (high frequency oscillation)
      const tingFreq = 1800 + Math.sin(t * 50) * 100;
      const tingAmplitude = Math.exp(-t * 160) * 0.15;
      const ting = Math.sin(2 * Math.PI * tingFreq * t) * tingAmplitude;
      
      // Mechanical resonance
      const resonanceFreq = 320;
      const resonanceAmplitude = Math.exp(-t * 80) * 0.1;
      const resonance = Math.sin(2 * Math.PI * resonanceFreq * t) * resonanceAmplitude;
      
      // Combine all components
      data[i] = initialClick + thunk + ting + resonance;
    }
    
    return buffer;
  } catch (error) {
    console.error("Failed to create click buffer:", error);
    return null;
  }
};

// Multi-strategy audio playback with full logging
export const playAudio = (audioPath: string): void => {
  console.log(`Attempting to play audio (${audioPath}) with multiple strategies...`);
  let playbackSuccess = false;
  
  // Strategy 1: Web Audio API buffer playback (lowest latency)
  if (audioContext && clickBuffer) {
    try {
      audioContext.resume().then(() => {
        const source = audioContext.createBufferSource();
        source.buffer = clickBuffer;
        
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 1.0;
        
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        source.start(0);
        console.log("Playing audio via Web Audio API buffer (Strategy 1)");
        playbackSuccess = true;
      }).catch(e => {
        console.error("Strategy 1 failed:", e);
      });
    } catch (e) {
      console.error("Strategy 1 exception:", e);
    }
  }
  
  // Strategy 2: HTML5 Audio direct playback (backup)
  if (!playbackSuccess && audioElement) {
    try {
      // Reset the audio element
      audioElement.currentTime = 0;
      audioElement.volume = 1.0;
      
      // Play with user interaction flag for iOS
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Playing audio via HTML5 Audio (Strategy 2)");
          playbackSuccess = true;
        }).catch(e => {
          console.error("Strategy 2 failed:", e);
          
          // Strategy 3: Create new Audio instance on failure (circumvents some browser restrictions)
          try {
            const newAudio = new Audio(audioPath);
            newAudio.volume = 1.0;
            newAudio.play().then(() => {
              console.log("Playing audio via new Audio instance (Strategy 3)");
              playbackSuccess = true;
            }).catch(e2 => {
              console.error("Strategy 3 failed:", e2);
              createVintageMechanicalClick();
            });
          } catch (e3) {
            console.error("Strategy 3 exception:", e3);
            createVintageMechanicalClick();
          }
        });
      }
    } catch (e) {
      console.error("Strategy 2 exception:", e);
      createVintageMechanicalClick();
    }
  } else if (!playbackSuccess) {
    // Strategy 4: Generate sound directly as ultimate fallback
    createVintageMechanicalClick();
  }
};

// Generate sound directly using Web Audio API oscillators and nodes
const createVintageMechanicalClick = (): void => {
  console.log("Attempting to create vintage mechanical click sound directly...");
  
  try {
    // Create context on demand if it doesn't exist
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.error("Web Audio API not supported for fallback sound generation");
        return;
      }
      audioContext = new AudioContextClass({ latencyHint: 'interactive' });
    }
    
    // Force resume the audio context
    audioContext.resume().then(() => {
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0.7, audioContext.currentTime);
      masterGain.connect(audioContext.destination);
      
      // 1. Initial metal contact "thunk" sound
      const thunkOsc = audioContext.createOscillator();
      const thunkGain = audioContext.createGain();
      thunkOsc.frequency.setValueAtTime(80, audioContext.currentTime);
      thunkOsc.type = 'triangle';
      thunkGain.gain.setValueAtTime(0.5, audioContext.currentTime);
      thunkGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);
      thunkOsc.connect(thunkGain);
      thunkGain.connect(masterGain);
      
      // 2. Metal spring "ting" sound
      const tingOsc = audioContext.createOscillator();
      const tingGain = audioContext.createGain();
      tingOsc.frequency.setValueAtTime(1800, audioContext.currentTime);
      tingOsc.type = 'sine';
      tingGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      tingGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.015);
      tingOsc.connect(tingGain);
      tingGain.connect(masterGain);
      
      // 3. Mechanical contact "click" sound
      const bufferSize = audioContext.sampleRate * 0.015;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        const factor = Math.pow(1 - (i / bufferSize), 8);
        data[i] = (Math.random() * 2 - 1) * factor;
      }
      
      const clickNode = audioContext.createBufferSource();
      clickNode.buffer = buffer;
      clickNode.connect(masterGain);
      
      // Start all components simultaneously
      const startTime = audioContext.currentTime;
      thunkOsc.start(startTime);
      tingOsc.start(startTime);
      clickNode.start(startTime);
      
      // Stop oscillators after short duration
      thunkOsc.stop(startTime + 0.05);
      tingOsc.stop(startTime + 0.05);
      
      console.log("Created vintage mechanical click sound successfully (Strategy 4)");
    }).catch(e => {
      console.error("Failed to resume audio context for direct sound generation:", e);
    });
  } catch (error) {
    console.error("Failed to create synthetic click:", error);
  }
};

// Additional helper to force unlock audio on all devices
export const unlockAudioOnUserInteraction = (): void => {
  console.log("Setting up audio unlock on user interaction");
  
  const unlockAllAudio = () => {
    console.log("User interaction detected, attempting to unlock audio...");
    
    // Unlock Web Audio API
    if (audioContext) {
      audioContext.resume().then(() => {
        console.log("Audio context resumed by user interaction");
        
        // Play silent sound to ensure audio system is active
        const silentBuffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = silentBuffer;
        source.connect(audioContext.destination);
        source.start(0);
      }).catch(e => console.error("Failed to resume audio context:", e));
    }
    
    // Unlock HTML5 Audio
    if (audioElement) {
      audioElement.volume = 0;
      audioElement.play().then(() => {
        console.log("HTML5 Audio unlocked");
        audioElement!.pause();
        audioElement!.currentTime = 0;
        audioElement!.volume = 1;
      }).catch(e => console.error("Failed to unlock HTML5 Audio:", e));
    }
    
    // Create a new Audio instance as another unlock attempt
    try {
      const tempAudio = new Audio('/click.mp3');
      tempAudio.volume = 0;
      tempAudio.play().then(() => {
        console.log("Temporary audio unlocked");
        tempAudio.pause();
      }).catch(e => console.error("Failed to play temporary audio:", e));
    } catch (e) {
      console.error("Failed to create temporary audio:", e);
    }
    
    // Remove event listeners after unlocking
    document.removeEventListener('click', unlockAllAudio);
    document.removeEventListener('touchstart', unlockAllAudio);
    document.removeEventListener('touchend', unlockAllAudio);
  };
  
  // Add multiple event listeners for maximum compatibility
  document.addEventListener('click', unlockAllAudio, { once: true });
  document.addEventListener('touchstart', unlockAllAudio, { once: true });
  document.addEventListener('touchend', unlockAllAudio, { once: true });
};

// Preload additional audio formats for wider compatibility
export const preloadAudioFormats = (): void => {
  // We don't have multiple formats, but this function is here for future compatibility
  console.log("Preloading audio in different formats...");
  
  // HTML5 Audio preloading (already done in initAudio, but repeated for emphasis)
  if (!audioElement) {
    audioElement = new Audio('/click.mp3');
    audioElement.preload = 'auto';
    audioElement.load();
  }
};
