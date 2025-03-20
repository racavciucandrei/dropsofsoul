
import React, { useState } from "react";
import { useLight } from "@/context/LightProvider";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleLight = () => {
    setIsAnimating(true);
    toggleLight();
    
    toast({
      title: isLightOn ? "Lights turned off" : "Lights turned on",
      description: isLightOn 
        ? "The room is now dark." 
        : "Now you can see inside the soul.",
      duration: 3000,
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="fixed top-20 right-6 z-[60] flex flex-col items-center">
      {/* Light bulb with glow effect */}
      <div className={cn(
        "w-8 h-8 rounded-full mb-1 transition-all duration-300",
        isLightOn 
          ? "bg-amber-400 shadow-[0_0_15px_5px_rgba(251,191,36,0.7)]" 
          : "bg-gray-400"
      )} />
      
      {/* Pull string */}
      <div 
        className="cursor-pointer flex flex-col items-center" 
        onClick={handleToggleLight}
        aria-label={isLightOn ? "Turn light off" : "Turn light on"}
      >
        <div className="w-1 h-24 bg-gray-300 rounded-full relative">
          {/* String texture lines */}
          <div className="absolute inset-0 flex flex-col justify-around items-center opacity-30">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-px bg-gray-600" />
            ))}
          </div>
        </div>
        
        {/* Pull handle */}
        <div className={cn(
          "w-4 h-8 bg-gray-300 border border-gray-400 rounded-md transition-all",
          isLightOn ? "bg-amber-200" : "",
          isAnimating ? "pull-string-animate" : ""
        )}>
          <div className="w-full h-1 bg-gray-400 mt-1" />
          <div className="w-full h-1 bg-gray-400 mt-1" />
        </div>
        
        {/* Accessibility hint */}
        <span className="sr-only">
          {isLightOn ? "Turn off the light" : "Pull to turn on the light"}
        </span>
      </div>
    </div>
  );
};

export default LightSwitch;
