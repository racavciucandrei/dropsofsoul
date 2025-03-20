
import { useRef } from 'react';

export const useSeductiveVoice = () => {
  const voicePlayedRef = useRef(false);

  // This function is now a no-op placeholder that doesn't play any voice
  const playSeductiveWarning = () => {
    // We're just setting the ref to prevent future attempts
    voicePlayedRef.current = true;
    console.log("Voice feature is disabled");
  };

  return {
    playSeductiveWarning,
    voicePlayedRef
  };
};
