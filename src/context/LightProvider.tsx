
import React, { createContext, useContext, useState, useEffect } from "react";

type LightContextType = {
  isLightOn: boolean;
  toggleLight: () => void;
};

const LightContext = createContext<LightContextType | undefined>(undefined);

export const LightProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with lights off by default
  const [isLightOn, setIsLightOn] = useState(false);

  const toggleLight = () => {
    setIsLightOn((prev) => !prev);
  };

  // Apply light effect to the entire page
  useEffect(() => {
    if (isLightOn) {
      document.documentElement.classList.remove("lights-off");
      document.body.classList.remove("lights-off");
      
      // Add animation classes for content reveal
      document.documentElement.classList.add("content-reveal");
    } else {
      document.documentElement.classList.add("lights-off");
      document.body.classList.add("lights-off");
      document.documentElement.classList.remove("content-reveal");
    }
  }, [isLightOn]);

  // Initial setup - make sure lights are off on first load
  useEffect(() => {
    document.documentElement.classList.add("lights-off");
    document.body.classList.add("lights-off");
  }, []);

  return (
    <LightContext.Provider value={{ isLightOn, toggleLight }}>
      {children}
    </LightContext.Provider>
  );
};

export const useLight = (): LightContextType => {
  const context = useContext(LightContext);
  if (context === undefined) {
    throw new Error("useLight must be used within a LightProvider");
  }
  return context;
};
