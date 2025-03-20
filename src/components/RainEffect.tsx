
import React, { useEffect, useRef } from 'react';

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

    // Initialize raindrops
    const initRaindrops = () => {
      // Sparse, larger raindrops
      const dropCount = Math.floor(window.innerWidth / 40);
      const drops: Raindrop[] = [];

      for (let i = 0; i < dropCount; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above viewport
          size: Math.random() * 5 + 5, // Larger drops (5-10px)
          speed: Math.random() * 2 + 2, // Slower fall (2-4px per frame)
          opacity: Math.random() * 0.3 + 0.6, // Higher opacity (0.6-0.9)
        });
      }

      raindrops.current = drops;
    };

    initRaindrops();

    // Draw a raindrop
    const drawRaindrop = (x: number, y: number, size: number, opacity: number) => {
      // Save current state
      ctx.save();
      
      // Set global alpha for entire raindrop
      ctx.globalAlpha = opacity;
      
      // Draw teardrop shape
      ctx.beginPath();
      
      // Draw the main teardrop shape
      const width = size;
      const height = size * 1.5;
      
      // Start at the top point (pointed end)
      ctx.moveTo(x, y);
      
      // Draw the right curve
      ctx.bezierCurveTo(
        x + width / 2, y + height / 3,
        x + width, y + height / 2,
        x, y + height
      );
      
      // Draw the left curve back to top
      ctx.bezierCurveTo(
        x - width, y + height / 2,
        x - width / 2, y + height / 3,
        x, y
      );
      
      // Create a water-like gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + height);
      gradient.addColorStop(0, 'rgba(200, 240, 255, 0.9)');  // Light blue at top
      gradient.addColorStop(0.6, 'rgba(170, 220, 255, 0.9)'); // Mid blue
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');   // White at bottom
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight to make it look wet and reflective
      ctx.beginPath();
      const hlSize = size * 0.25;
      ctx.ellipse(
        x - hlSize, 
        y + height * 0.25, 
        hlSize, 
        hlSize * 1.5, 
        -Math.PI / 4, 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
      
      // Restore context state
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw raindrops
      raindrops.current.forEach(drop => {
        // Draw raindrop
        drawRaindrop(drop.x, drop.y, drop.size, drop.opacity);
        
        // Update position
        drop.y += drop.speed;
        
        // Reset when offscreen
        if (drop.y > canvas.height) {
          drop.y = -drop.size * 2;
          drop.x = Math.random() * canvas.width;
          // Slightly randomize speed on reset
          drop.speed = Math.random() * 2 + 2;
        }
      });
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default RainEffect;
