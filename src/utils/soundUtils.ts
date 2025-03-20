
// Improved utility for playing audio files with better browser support
let audioContext: AudioContext | null = null;

// Initialize audio context on first user interaction
const initAudioContext = () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log("AudioContext initialized successfully");
    } catch (error) {
      console.error("Failed to create AudioContext:", error);
    }
  }
  return audioContext;
};

// Play sound from file using both Audio API and AudioContext for better support
export const playAudio = (audioPath: string) => {
  // Try the standard Audio API first
  try {
    const audio = new Audio(audioPath);
    
    // Add event listeners for debugging
    audio.addEventListener('play', () => console.log('Audio started playing'));
    audio.addEventListener('error', (e) => console.error('Audio element error:', e));
    
    // Use promise to handle autoplay restrictions
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log("Audio playback started successfully"))
        .catch(error => {
          console.error("Standard Audio API failed:", error);
          
          // Fallback to AudioContext if standard Audio API fails
          const ctx = initAudioContext();
          if (!ctx) return;
          
          fetch(audioPath)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.start(0);
              console.log("Fallback AudioContext playback started");
            })
            .catch(error => console.error("AudioContext fallback failed:", error));
        });
    }
  } catch (error) {
    console.error("Failed to create audio element:", error);
  }
};

// Function to preload audio file for better performance
export const preloadAudio = (audioPath: string) => {
  const audio = new Audio();
  audio.src = audioPath;
  audio.preload = 'auto';
  return audio;
};
