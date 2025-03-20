
import React from "react";
import { Lightbulb, LightbulbOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLight } from "@/context/LightProvider";
import { Switch } from "@/components/ui/switch";

const LightSwitch = () => {
  const { isLightOn, toggleLight } = useLight();

  return (
    <div className="fixed top-24 right-6 z-[60] flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-border">
      <div className="relative">
        {isLightOn ? (
          <Lightbulb className="h-5 w-5 text-amber-400" />
        ) : (
          <LightbulbOff className="h-5 w-5 text-muted-foreground" />
        )}
        {isLightOn && (
          <div className="absolute -inset-1 bg-amber-400/20 rounded-full blur-md -z-10"></div>
        )}
      </div>
      <Switch
        checked={isLightOn}
        onCheckedChange={toggleLight}
        className={cn(
          isLightOn ? "animate-pulse" : "",
          "transition-all duration-300"
        )}
      />
    </div>
  );
};

export default LightSwitch;
