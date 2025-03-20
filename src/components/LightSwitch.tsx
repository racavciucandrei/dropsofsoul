import React, { useState, useEffect, useRef } from 'react';
import { useLight } from '@/context/LightProvider';
import { useToast } from '@/hooks/use-toast';
import { initAudio } from '@/utils/soundUtils';

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const [showMessage, setShowMessage] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [togglePattern, setTogglePattern] = useState<boolean[]>([]);
  const { toast } = useToast();
  const audioInitializedRef = useRef(false);
  const lastToggleTimeRef = useRef(0);
  
  useEffect(() => {
    initAudio();
    audioInitializedRef.current = true;
    
    const forceInit = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContext.resume().catch(() => {});
      document.removeEventListener('click', forceInit);
      document.removeEventListener('touchstart', forceInit);
    };
    
    document.addEventListener('click', forceInit, { once: true });
    document.addEventListener('touchstart', forceInit, { once: true });
    
    return () => {
      document.removeEventListener('click', forceInit);
      document.removeEventListener('touchstart', forceInit);
    };
  }, []);
  
  useEffect(() => {
    const storedCount = localStorage.getItem('toggleCount');
    const storedPattern = localStorage.getItem('togglePattern');
    
    if (storedCount) {
      setToggleCount(parseInt(storedCount, 10));
    }
    
    if (storedPattern) {
      setTogglePattern(JSON.parse(storedPattern));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('toggleCount', toggleCount.toString());
    localStorage.setItem('togglePattern', JSON.stringify(togglePattern));
  }, [toggleCount, togglePattern]);
  
  useEffect(() => {
    if (isLightOn) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1300);
      
      return () => clearTimeout(timer);
    }
  }, [isLightOn]);

  const isOnOffOnOffOnPattern = (pattern: boolean[]) => {
    if (pattern.length < 5) return false;
    
    const lastFive = pattern.slice(-5);
    
    return (
      lastFive[0] === true && 
      lastFive[1] === false && 
      lastFive[2] === true && 
      lastFive[3] === false && 
      lastFive[4] === true
    );
  };

  const handleToggle = () => {
    const now = Date.now();
    if (now - lastToggleTimeRef.current < 300) {
      return;
    }
    lastToggleTimeRef.current = now;
    
    const newCount = toggleCount + 1;
    setToggleCount(newCount);
    
    toggleLight();
    
    const newPattern = [...togglePattern, !isLightOn];
    setTogglePattern(newPattern);
    
    if (newPattern.length >= 5 && isOnOffOnOffOnPattern(newPattern)) {
      showDivineWarning();
    }
  };

  const showDivineWarning = () => {
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance("Hey, don't play with that switch!");
      
      utterance.rate = 0.4;
      utterance.pitch = 0.05;
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      
      const demonicVoice = voices.find(voice => 
        voice.name.includes('Bass') || 
        voice.name.toLowerCase().includes('deep') || 
        voice.name.includes('Daniel') ||
        voice.name.includes('James') ||
        voice.name.toLowerCase().includes('male')
      );
      
      if (demonicVoice) {
        utterance.voice = demonicVoice;
      }
      
      utterance.onstart = () => {
        setTimeout(() => {
          const echoUtterance1 = new SpeechSynthesisUtterance("don't play with that switch");
          echoUtterance1.volume = 0.5;
          echoUtterance1.rate = 0.3;
          echoUtterance1.pitch = 0.03;
          if (demonicVoice) echoUtterance1.voice = demonicVoice;
          window.speechSynthesis.speak(echoUtterance1);
          
          setTimeout(() => {
            const echoUtterance2 = new SpeechSynthesisUtterance("with that switch");
            echoUtterance2.volume = 0.3;
            echoUtterance2.rate = 0.25;
            echoUtterance2.pitch = 0.01;
            if (demonicVoice) echoUtterance2.voice = demonicVoice;
            window.speechSynthesis.speak(echoUtterance2);
          }, 300);
        }, 200);
      };
      
      window.speechSynthesis.speak(utterance);
      
      toast({
        title: "Divine Warning",
        description: "Hey, don't play with that switch!",
        variant: "destructive",
      });
    }, 100);
  };

  return (
    <div className="fixed right-6 top-24 z-50 flex flex-col items-center">
      <div 
        className="cursor-pointer flex flex-col items-center"
        onClick={handleToggle}
      >
        <div className="w-8 h-14 bg-amber-200 border-2 border-amber-800 rounded-md shadow-md flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-300 rounded-md opacity-50"></div>
          
          <div className={`w-4 h-7 bg-amber-800 rounded-sm shadow-md absolute ${isLightOn ? 'top-1' : 'bottom-1'} transition-all duration-5`}></div>
          
          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-950"></div>
        </div>
      </div>
      
      <div className="mt-2 text-xs font-medium">
        <span className={isLightOn ? "opacity-100" : "opacity-50"}>
          {isLightOn ? "ON" : "OFF"}
        </span>
      </div>
      
      {showMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                        bg-black/70 text-white px-6 py-4 rounded-lg shadow-lg 
                        animate-fade-in text-center max-w-xs">
          <p className="text-lg font-medium">Now you can see inside the soul</p>
        </div>
      )}
    </div>
  );
};

export default LightSwitch;
