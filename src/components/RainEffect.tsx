
import React, { useEffect, useRef } from 'react';
import { useLight } from '@/context/LightProvider';

interface Raindrop {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const RainEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raindrops = useRef<Raindrop[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const { isLightOn } = useLight();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size once
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize fewer raindrops
    const initRaindrops = () => {
      const dropCount = Math.floor(window.innerWidth / 40);
      const drops: Raindrop[] = [];

      for (let i = 0; i < dropCount; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 3 + 5,
          opacity: Math.random() * 0.2 + 0.2,
        });
      }

      raindrops.current = drops;
    };

    initRaindrops();

    // Simplified drop drawing
    const drawRaindrop = (x: number, y: number, size: number, opacity: number) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = 'rgba(200, 240, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Animation with lower framerate
    let lastFrameTime = 0;
    const targetFPS = 24;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      if (!isLightOn) {
        // Don't render when lights are off
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      // Frame limiting
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw raindrops
      raindrops.current.forEach(drop => {
        drawRaindrop(drop.x, drop.y, drop.size, drop.opacity);
        drop.y += drop.speed;
        
        // Reset when offscreen
        if (drop.y > canvas.height) {
          drop.y = -drop.size * 2;
          drop.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isLightOn]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ opacity: 0.3 }}
    />
  );
};

export default RainEffect;
