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
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const thunderGain = audioContext.createGain();
        thunderGain.gain.value = 0.7;
        thunderGain.connect(audioContext.destination);
        
        const oscillator1 = audioContext.createOscillator();
        oscillator1.type = 'sine';
        oscillator1.frequency.value = 40;
        const gain1 = audioContext.createGain();
        gain1.gain.value = 0.8;
        oscillator1.connect(gain1);
        gain1.connect(thunderGain);
        
        const oscillator2 = audioContext.createOscillator();
        oscillator2.type = 'sawtooth';
        oscillator2.frequency.value = 120;
        const gain2 = audioContext.createGain();
        gain2.gain.setValueAtTime(0.8, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        oscillator2.connect(gain2);
        gain2.connect(thunderGain);
        
        oscillator1.start();
        oscillator2.start();
        
        oscillator1.stop(audioContext.currentTime + 1.5);
        oscillator2.stop(audioContext.currentTime + 0.5);
      } catch (e) {
        console.error("Could not create thunder effect", e);
      }
      
      const utterance = new SpeechSynthesisUtterance("MORTAL! CEASE PLAYING WITH THE FORCES OF LIGHT AND DARKNESS!");
      
      utterance.rate = 0.9;
      utterance.pitch = 0.7;
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      
      const odinVoice = voices.find(voice => 
        voice.name.includes('Male') || 
        voice.name.includes('Daniel') ||
        voice.name.includes('George') ||
        voice.name.includes('James')
      );
      
      if (odinVoice) {
        utterance.voice = odinVoice;
      }
      
      utterance.onstart = () => {
        setTimeout(() => {
          const echoUtterance1 = new SpeechSynthesisUtterance("THE FORCES OF LIGHT AND DARKNESS");
          echoUtterance1.volume = 0.7;
          echoUtterance1.rate = 0.85;
          echoUtterance1.pitch = 0.6;
          if (odinVoice) echoUtterance1.voice = odinVoice;
          window.speechSynthesis.speak(echoUtterance1);
          
          setTimeout(() => {
            const echoUtterance2 = new SpeechSynthesisUtterance("LIGHT AND DARKNESS");
            echoUtterance2.volume = 0.5;
            echoUtterance2.rate = 0.8;
            echoUtterance2.pitch = 0.5;
            if (odinVoice) echoUtterance2.voice = odinVoice;
            window.speechSynthesis.speak(echoUtterance2);
          }, 800);
        }, 500);
      };
      
      window.speechSynthesis.speak(utterance);
      
      toast({
        title: "Divine Warning from Odin",
        description: "MORTAL! CEASE PLAYING WITH THE FORCES OF LIGHT AND DARKNESS!",
        variant: "destructive",
      });
      
      const flash = document.createElement('div');
      flash.style.position = 'fixed';
      flash.style.top = '0';
      flash.style.left = '0';
      flash.style.width = '100vw';
      flash.style.height = '100vh';
      flash.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      flash.style.zIndex = '9999';
      flash.style.transition = 'opacity 1.5s';
      document.body.appendChild(flash);
      
      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(flash);
        }, 1500);
      }, 100);
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
