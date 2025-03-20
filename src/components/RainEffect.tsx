
import React, { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  length: number;
  sway: number; // Add subtle horizontal movement
  swayDirection: number; // Control sway direction
  swaySpeed: number; // Control sway speed
}

const RainEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const droplets = useRef<Droplet[]>([]);
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

    // Create initial droplets
    const createDroplets = () => {
      // Further reduce droplet count for even more sparse rain
      const dropletCount = Math.floor(window.innerWidth / 25); 
      const newDroplets: Droplet[] = [];

      for (let i = 0; i < dropletCount; i++) {
        // Increase size range for even larger raindrops (2.0-4.0px)
        const size = Math.random() * 2.0 + 2.0; 
        newDroplets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above the viewport
          size: size,
          // Slower speed between 4-8
          speed: Math.random() * 4 + 4, 
          opacity: Math.random() * 0.4 + 0.3, // Keep same opacity
          // Longer teardrop shape for larger drops
          length: size * (Math.random() * 9 + 7), 
          sway: 0,
          swayDirection: Math.random() > 0.5 ? 1 : -1,
          // Reduce sway speed for gentler movement
          swaySpeed: Math.random() * 0.03 + 0.005, 
        });
      }

      droplets.current = newDroplets;
    };

    createDroplets();

    // Draw realistic teardrop shape
    const drawTeardrop = (x: number, y: number, size: number, length: number, opacity: number) => {
      ctx.beginPath();
      
      // Start at the bottom of the teardrop for better drawing
      ctx.moveTo(x, y + length);
      
      // Draw left side curved path
      ctx.quadraticCurveTo(
        x - size/2, y + length * 0.7, 
        x - size, y + length * 0.4
      );
      
      // Draw top rounded part
      ctx.quadraticCurveTo(
        x - size, y, 
        x, y - size/2
      );
      
      // Draw right side curved path
      ctx.quadraticCurveTo(
        x + size, y, 
        x + size, y + length * 0.4
      );
      
      // Close the path back to the starting point
      ctx.quadraticCurveTo(
        x + size/2, y + length * 0.7, 
        x, y + length
      );
      
      // Create gradient for more realistic water appearance
      const gradient = ctx.createLinearGradient(x, y - size/2, x, y + length);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`);
      gradient.addColorStop(0.5, `rgba(210, 235, 255, ${opacity})`);
      gradient.addColorStop(1, `rgba(200, 230, 255, ${opacity * 0.7})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight (small white dot at top left)
      ctx.beginPath();
      ctx.arc(x - size/3, y, size/4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.fill();
    };

    // Animation function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Optional: add slight blur for more realistic effect
      // ctx.filter = 'blur(0.3px)';
      
      // Draw and update droplets
      droplets.current.forEach((droplet) => {
        // Apply slight horizontal sway
        droplet.sway += droplet.swaySpeed * droplet.swayDirection;
        
        // Limit sway amount and change direction when limit reached
        if (Math.abs(droplet.sway) > 1.5) {
          droplet.swayDirection *= -1;
        }
        
        // Draw droplet as teardrop
        drawTeardrop(
          droplet.x + droplet.sway, 
          droplet.y, 
          droplet.size, 
          droplet.length, 
          droplet.opacity
        );

        // Update position
        droplet.y += droplet.speed;

        // Reset if off screen
        if (droplet.y > canvas.height) {
          droplet.y = Math.random() * -50 - 10; // Randomize starting position above screen
          droplet.x = Math.random() * canvas.width;
          // Randomize speed slightly on reset for more natural variation
          droplet.speed = Math.random() * 4 + 4;
        }
      });

      // Continue animation
      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Start animation
    draw();

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
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default RainEffect;
