
import { useState, useEffect } from 'react';
import { useLight } from '@/context/LightProvider';

export const useLightSwitchState = () => {
  const { isLightOn } = useLight();
  const [showMessage, setShowMessage] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [togglePattern, setTogglePattern] = useState<boolean[]>([]);

  // Show message when light is turned on
  useEffect(() => {
    if (isLightOn) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1300);
      
      return () => clearTimeout(timer);
    }
  }, [isLightOn]);

  // Load stored toggle state
  useEffect(() => {
    const storedCount = localStorage.getItem('toggleCount');
    const storedPattern = localStorage.getItem('togglePattern');
    
    if (storedCount) {
      setToggleCount(parseInt(storedCount, 10));
    }
    
    if (storedPattern) {
      try {
        setTogglePattern(JSON.parse(storedPattern));
      } catch (e) {
        // Reset if invalid
        setTogglePattern([]);
      }
    }
  }, []);
  
  // Update toggle state
  const updateToggleState = (newCount: number, newPattern: boolean[]) => {
    setToggleCount(newCount);
    setTogglePattern(newPattern);
    
    // Save to localStorage
    localStorage.setItem('toggleCount', newCount.toString());
    localStorage.setItem('togglePattern', JSON.stringify(newPattern));
  };

  return {
    showMessage,
    toggleCount,
    togglePattern,
    updateToggleState
  };
};
