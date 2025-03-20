
import React from 'react';

interface SwitchMessageProps {
  showMessage: boolean;
}

const SwitchMessage = ({ showMessage }: SwitchMessageProps) => {
  if (!showMessage) return null;
  
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                    bg-black/70 text-white px-6 py-4 rounded-lg shadow-lg 
                    animate-fade-in text-center max-w-xs">
      <p className="text-lg font-medium">Now you can see inside the soul</p>
    </div>
  );
};

export default SwitchMessage;
