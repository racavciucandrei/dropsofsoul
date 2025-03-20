
// Simple utility for playing audio files
export const playAudio = (audioPath: string) => {
  try {
    const audio = new Audio(audioPath);
    audio.play().catch(error => {
      console.error("Error playing sound:", error);
    });
  } catch (error) {
    console.error("Failed to create audio element:", error);
  }
};
