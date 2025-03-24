
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

    // Set canvas to full viewport size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize raindrops - reduced count for better performance
    const initRaindrops = () => {
      const dropCount = Math.floor(window.innerWidth / 30); // Reduced by half
      const drops: Raindrop[] = [];

      for (let i = 0; i < dropCount; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1,
          size: Math.random() * 2 + 2, // Smaller drops
          speed: Math.random() * 5 + 8, // Slightly slower
          opacity: Math.random() * 0.2 + 0.3, // Lower opacity
        });
      }

      raindrops.current = drops;
    };

    initRaindrops();

    // Simplified raindrop drawing
    const drawRaindrop = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      
      // Simpler teardrop shape
      ctx.beginPath();
      const width = size;
      const height = size * 1.5;
      
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(
        x + width / 2, y + height / 3,
        x + width, y + height / 2,
        x, y + height
      );
      ctx.bezierCurveTo(
        x - width, y + height / 2,
        x - width / 2, y + height / 3,
        x, y
      );
      
      ctx.fillStyle = 'rgba(200, 240, 255, 0.6)';
      ctx.fill();
      ctx.restore();
    };

    // Animation loop with throttling
    let lastFrameTime = 0;
    const targetFPS = 30; // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      if (!isLightOn) {
        // Don't render rain when lights are off to save resources
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      // Throttle rendering
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = currentTime;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw raindrops
      raindrops.current.forEach(drop => {
        // Draw raindrop
        drawRaindrop(drop.x, drop.y, drop.size, drop.opacity);
        
        // Update position
        drop.y += drop.speed;
        
        // Simpler wind effect
        drop.x += Math.sin(Date.now() / 3000) * 0.2;
        
        // Reset when offscreen
        if (drop.y > canvas.height) {
          drop.y = -drop.size * 2;
          drop.x = Math.random() * canvas.width;
        }
      });
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup
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
      style={{ opacity: 0.4 }} // Reduced opacity
    />
  );
};

export default RainEffect;
